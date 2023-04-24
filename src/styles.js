import styled from 'styled-components/native'
// import { TextInputMask } from 'react-native-masked-text'


export const Tela =styled.View`
    flex: 1,
    background-color: #fff,
    padding: 15px
`

export const ContainerInput = styled.View`
    position: relative;
    margin-horizontal: 15px;
    margin-vertical: 8px
`
export const Input = styled.TextInput`
    font-size: 16px;
    font-family: Roboto-Regular;
    min-height: 60px;
    padding-horizontal: 25px;
    border-width: 1px;
    color: #000;
    border-radius: 30px;
    border-color: #aaa;
`
// export const MaskInput = styled(TextInputMask)`
//     font-size: 16px;
//     font-family: Roboto-Regular;
//     min-height: 60px;
//     padding-horizontal: 25px;
//     border-width: 1px;
//     color: #000;
//     border-radius: 30px;
//     border-color: #aaa;
// `
export const TituloInput = styled.Text`
    font-family: Roboto-Light;
    font-size: 13px;
    position: absolute;
    background-color:#fff;
    z-index: 99;
    top: -10px;
    margin-left: 15px;
    color: #000;
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
    border-radius: 24.5px;
    border-color: #aaa;
`
export const BotaoPrincipal=styled.TouchableOpacity`
    height: 55px;
    border-radius: 28px;
    align-items: center;
    justify-content: center;
    margin: 15px;
    flex-direction: row;
    background-color: ${props => props.cor}
`
export const TextBtn=styled.Text`
    color: #fff;
    font-size: 16px;
    font-family: "Roboto-Medium"
`
