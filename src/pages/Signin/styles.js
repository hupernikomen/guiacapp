import styled from 'styled-components/native'

const Texto = styled.Text`
    color: #fff
`


export const TituloInput = styled(Texto)`
    font-family: Roboto-Light;
    font-size: 13px;
    position: absolute;
    background-color:#bd2828;
    z-index: 99;
    top: -10px;
    margin-left: 15px;
    border-radius: 6px;
    padding-horizontal: 10px;
`
export const Input = styled.TextInput`
    font-size: 16px;
    background-color: #fff;
    font-family: Roboto-Regular;
    min-width: 90%;
    min-height: 55px;
    padding-horizontal: 25px;
    color: #000;
    border-radius: 28px;
`