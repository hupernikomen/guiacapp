import styled from 'styled-components/native'

const Texto = styled.Text`
color: #000
`


export const ContainerLoja = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 50px;

`
export const NomeLoja = styled(Texto)`
    font-family: Roboto-Regular;
`
export const ProdutoNome = styled(Texto)`
    font-size: 22px;
    font-family: Roboto-Bold;
    text-transform: uppercase

`
export const ContainerPreco = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-vertical: 15px
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