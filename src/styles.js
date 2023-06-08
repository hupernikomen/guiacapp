import styled from 'styled-components/native'
import CurrencyInput from 'react-native-currency-input';

const Texto = styled.Text`
    color: #000
`


export const Tela = styled.View`
    flex: 1;
    justify-content: center;
    padding-horizontal: 15px;
`
export const ContainerInput = styled.View`
    position: relative;
    margin-vertical: 10px;
`
export const Input = styled.TextInput`
    font-size: 16px;
    font-family: Roboto-Regular;
    min-height: 55px;
    border-width: .5px;
    border-color: #777;
    padding-horizontal: 25px;
    color: #000;
    border-radius: 28px;
`
export const CurrencyInputs =styled(CurrencyInput)`
font-size: 16px;
font-family: Roboto-Regular;
min-height: 55px;
border-width: .5px;
border-color: #777;
padding-horizontal: 25px;
color: #000;
border-radius: 28px;

`
export const BtnCanto = styled.Pressable`

    position:absolute;
    z-index: 9999;
    right: 15px;
    bottom:25px;
    background-color:${props => props.background};
    width:55px;
    aspect-ratio: 1;
    border-radius: 30px;
    align-items: center;
    justify-content:center;
    elevation: 5
`

export const TituloInput = styled(Texto)`
    font-family: Roboto-Regular;
    font-size: 13px;
    position: absolute;
    background-color:#fff;
    border-radius: 10px;
    z-index: 99;
    top: -12px;
    margin-left: 15px;
    padding-vertical:2px;
    padding-horizontal: 10px;
`
export const SimulaInput = styled.View`
    justify-content: space-between;
    margin-vertical: 10px;
    flex-direction: row;
    align-items:center;
    min-height: 55px;
    padding-horizontal: 25px;
    border-width: .5px;
    border-color: #777;
    border-radius: 30px;
`
export const BotaoPrincipal = styled.Pressable`
    height: 55px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    margin-vertical: 8px;
    flex-direction: row;
    background-color: ${props => props.background}
`
export const TextBtn = styled.Text`
    color: ${props => props.cor};
    font-size: 16px;
    font-family: "Roboto-Medium"
`
export const BtnIcone = styled.Pressable`
    width: 50px;
    align-items: ${props => props.lado};
    height: 50px;
    justify-content: center
`
export const TextoPadrao = styled(Texto)`
    font-family: Roboto-Regular
`
