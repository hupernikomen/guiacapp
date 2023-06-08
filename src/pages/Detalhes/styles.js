import styled from 'styled-components/native'

const Texto = styled.Text`
color: #000
`


export const ContainerLoja = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom-color: #f1f1f1;
    border-bottom-width:1px
    padding: 20px;

`
export const NomeLoja = styled(Texto)`
    font-family: Roboto-Medium;
    font-size: 16px
`
export const ProdutoNome = styled(Texto)`
    font-size: 22px;
    font-family: Roboto-Bold;
    text-transform: uppercase;
    margin-vertical: 10px


`
export const ContainerPreco = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-vertical: 25px
`
export const TxtPreco = styled(Texto)`
    font-family: Roboto-Bold;
    font-size: 26px;
    margin-top:-5px
`
export const TxtPrecoAntigo = styled(Texto)`
    font-family: Roboto-Light;
    text-decoration-line: line-through
`

export const TextoAvista = styled(Texto)`
    font-family: Roboto-Regular;
    font-size:16px;
`