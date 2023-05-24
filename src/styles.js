import styled from 'styled-components/native'

const Texto = styled.Text`
    color: #000
`


export const Tela = styled.View`
    flex: 1;
    justify-content: center;
    background-color: #fff;
    padding: 15px;
`
export const ContainerInput = styled.View`
    position: relative;
    margin-vertical: 8px;
    padding-horizontal: 15px;
`
export const Input = styled.TextInput`
    font-size: 16px;
    font-family: Roboto-Regular;
    min-height: 55px;
   
    padding-horizontal: 25px;
    border-width: 1px;
    color: #000;
    border-radius: 28px;
    border-color: #000;
`


export const TituloInput = styled(Texto)`
    font-family: Roboto-Light;
    font-size: 13px;
    position: absolute;
    background-color:#fff;
    z-index: 99;
    top: -10px;
    margin-left: 35px;
    padding-horizontal: 10px;
`
export const SimulaInput = styled.View`
    justify-content: space-between;
    margin-vertical: 8px;
    margin-horizontal: 15px;
    flex-direction: row;
    align-items:center;
    min-height: 55px;
    padding-horizontal: 25px;
    border-width: 1px;
    border-radius: 28px;
    border-color: #000;
`
export const BotaoPrincipal = styled.TouchableOpacity`
    height: 55px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    margin-vertical: 8px;
    margin-horizontal: 15px;
    flex-direction: row;
    background-color: ${props => props.background}
`
export const TextBtn = styled.Text`
    color: ${props => props.cor};
    font-size: 16px;
    font-family: "Roboto-Medium"
`
export const BtnIcone = styled.TouchableOpacity`
    width: 50px;
    align-items: ${props => props.lado};
    height: 50px;
    justify-content: center
`
export const TextoPadrao = styled(Texto)`
    font-family: Roboto-Regular
`
