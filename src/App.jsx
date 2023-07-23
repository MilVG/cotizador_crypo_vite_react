import { useState,useEffect } from 'react'
import styled from '@emotion/styled';
import Formulario from './components/Formulario';
import imagenCripto from './img/imagen-criptos.png'
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';


const Contenedor = styled.div`
    max-width: 900px;
    margin:  0 auto;
    width: 90%;
    @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2,1fr);
      column-gap: 2rem;

    }
    
  `
const Imagen = styled.img`
    max-width: 400px;
    width: 80%;
    margin:100px auto 0 auto;
    display: block;

  `
const Heading = styled.h1`
    font-family: 'Ultra', sans-serif;
    color: #072c72ea;
    text-align: center;
    font-size: 30px;
    margin-top: 100px;
    margin-bottom: 30px;

    &::after{
      content: '';
      width: 150px;
      height: 8px;
      border-radius: 5px;
      background-color: white;
      display: block;
      margin: 10px auto 0 auto;
    }
  `
function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setcargando] = useState(false)
  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      
      const cotizarCripto = async () => {
        setcargando(true)
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url)
        const resultados = await respuesta.json()
        setResultado(resultados.DISPLAY[criptomoneda][moneda]);
        setcargando(false)
      }
      cotizarCripto()
    }
  },[monedas])
  return (
    <Contenedor>
      <Imagen
        
        src={imagenCripto}
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>

        <Formulario
          setMonedas={setMonedas}
        />
        {cargando && <Spinner/>}
        {resultado.PRICE && <Resultado  resultado={resultado} />}
      </div>
    </Contenedor>
   
  )
}

export default App
