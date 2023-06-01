import styled from 'styled-components/native'

const Texto = styled.Text`
color: #000
`


export const ContainerLoja = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    margin-bottom:10px
`
export const NomeLoja = styled(Texto)`
    font-family: Roboto-Regular;
    margin-left:10px
`
export const ProdutoNome = styled(Texto)`
    font-size: 22px;
    font-family: Roboto-Bold;
    margin-bottom: 10px;
    text-transform: uppercase

`
export const ContainerPreco = styled.View`
    flex-direction: row;
    align-items: baseline;
    margin-bottom: 20px
`
export const TxtPreco = styled(Texto)`
    font-family: Roboto-Bold
    font-size: 24px;
    margin-right: 10px
`
export const TxtPrecoAntigo = styled(Texto)`
    font-family: Roboto-Light;
    text-decoration-line: line-through
`
export const BtnIconeLoja = styled.TouchableOpacity`
    align-items: ${props => props.lado};
    height: 50px;
    justify-content: center;
    margin-left: 30px
`