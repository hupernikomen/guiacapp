import styled from 'styled-components/native'

const Texto = styled.Text`
    color: #fff
`
export const ContainerInput = styled.View`
    margin-vertical: 4px;
    justify-content:center
    
`

export const Input = styled.TextInput`
    font-size: 16px;
    background-color: #fff;
    text-align:center;
    font-family: Roboto-Regular;
    min-width: 90%;
    min-height: 55px;
    padding-horizontal: 25px;
    color: #000;
    border-radius: 28px;
`
export const BotaoPrincipal = styled.Pressable`
    height: 55px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    margin-vertical: 15px;
    flex-direction: row;
    background-color: ${props => props.background}
`
export const TextBtn = styled.Text`
    color: ${props => props.cor};
    font-size: 16px;
    font-family: "Roboto-Medium"
`