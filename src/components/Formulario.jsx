
import styled from '@emotion/styled'
import {React,useState,useEffect} from 'react'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'


const ImputSubmit = styled.input`
    background-color: #8a65f0;
    border: none;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    &:hover{
        background-color: #6536e9;
        cursor: pointer;
    }  
`
function Formulario({setMonedas}) {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)
   useEffect(() => {
     const consultarAPI = async () => {
       const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=30&tsym=USD"
       const respuesta = await fetch(url)
       const resultado = await respuesta.json()

       const arrayCryptos = resultado.Data.map(criptos => {
         const objeto = {
           id: criptos.CoinInfo.Name,
           nombre: criptos.CoinInfo.FullName
         }
         return objeto
       })

       setCriptos(arrayCryptos);
     }
     consultarAPI();
   }, [])
   
  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
     setError(true)
    return 
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })
  }
  return (
  <>
    {error && <Error>Todos los campos son obligatorios</Error>}
    <form
      onSubmit={handleSubmit}
    >
      <SelectMonedas />
      {moneda}
      <SelectCriptomoneda />
      {criptomoneda}
        <ImputSubmit type="submit" value="Cotizar" />
        </form>
  </>
  )
}

export default Formulario