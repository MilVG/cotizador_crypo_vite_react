import styled from '@emotion/styled'
import React from 'react'

const ResultadoCotizar = styled.div`
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
`
const Imagen = styled.img`
    display: block;
    width: 100px;

`
const Texto = styled.p`
     font-size: 18px;
    span{
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 27px;
    span{
        font-weight: 700;
    }
`
const Resultado = ({ resultado }) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = resultado

    return (
        <ResultadoCotizar>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen crypto" />
            <div>
                <Precio>El Precio es de: <span>{PRICE}</span></Precio>
                <Texto>El Precio más alto del día: <span>{HIGHDAY}</span></Texto>
                <Texto>El Precio más bajo del día: <span>{LOWDAY}</span></Texto>
                <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
                    <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
            </div>
    </ResultadoCotizar>
  )
}

export default Resultado