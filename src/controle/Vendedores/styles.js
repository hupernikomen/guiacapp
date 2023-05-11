import styled from 'styled-components/native'

const Texto = styled.Text`
    color: #000
`
export const Input = styled.TextInput`
    font-size: 16px;
    font-family: Roboto-Regular;
    min-height: 55px;
    padding-horizontal: 25px;
    border-width: 1px;
    color: #000;
    border-radius: 28px;
    border-color: #aaa;
    background-color: #fff;

`
export const TituloInput = styled(Texto)`
    font-family: Roboto-Light;
    font-size: 13px;
    position: absolute;
    background-color:#fff;
    border-radius: 10px;
    z-index: 99;
    top: -10px;
    margin-left: 15px;
    padding-horizontal: 10px;
`
export const ContainerInput = styled.View`
    position: relative;
    width:100%;
    margin-horizontal: 15px;
    margin-vertical: 6px;
`
export const BotaoPrincipal = styled.TouchableOpacity`
    height: 55px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    margin: 5px;
    flex-direction: row;
    background-color: ${props => props.cor}
`