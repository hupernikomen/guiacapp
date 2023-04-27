import styled from 'styled-components/native'
import { TextoPadrao } from '../../styles'

export const ProdutoContainer = styled.TouchableOpacity`
    flex: 1;
    background-color: #fff;
    padding: 1px;
    border-radius: 2px;
    margin-horizontal: 4px;
    max-width: ${props => props.largura}px
`
export const ContainerInfo = styled.View`
    padding-horizontal: 8px;
    padding-top: 5px;
    padding-bottom: 10px;
`

export const Produto = styled(TextoPadrao)`
    font-family: Roboto-Light;
    font-size: 13px
`
export const LojaNome = styled(TextoPadrao)`
    flex:1;
    font-family: Roboto-Light;
    font-size: 13px
`
export const TxtPreco= styled(TextoPadrao)`
    font-size: 16px;
    font-family: Roboto-Bold;
`
export const ContainerLoja = styled.View`
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between;
`