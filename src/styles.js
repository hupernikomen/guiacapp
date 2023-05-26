import styled from 'styled-components/native'

const Texto = styled.Text`
    color: #000
`


export const Tela = styled.View`
    flex: 1;
    justify-content: center;
    padding: 15px;
`
export const ContainerInput = styled.View`
    position: relative;
    margin-vertical: 12px;
`
export const Input = styled.TextInput`
    font-size: 16px;
    font-family: Roboto-Regular;
    min-height: 60px;
    border-width: .5px;
    border-color: #777;
    padding-horizontal: 25px;
    color: #000;
    border-radius: 28px;
`

export const TituloInput = styled(Texto)`
    font-family: Roboto-Light;
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
    margin-vertical: 8px;
    flex-direction: row;
    align-items:center;
    min-height: 60px;
    padding-horizontal: 25px;
    border-width: .5px;
    border-color: #777;
    border-radius: 30px;
`
export const BotaoPrincipal = styled.TouchableOpacity`
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
export const BtnIcone = styled.TouchableOpacity`
    width: 50px;
    align-items: ${props => props.lado};
    height: 50px;
    justify-content: center
`
export const TextoPadrao = styled(Texto)`
    font-family: Roboto-Regular
`
