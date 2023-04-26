import styled from 'styled-components/native'

const Texto = styled.Text`
color: #000
`


export const ContainerLoja = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    height: 50px;
`
export const NomeLoja = styled(Texto)`
    font-family: Roboto-Regular;
`
export const ProdutoNome = styled(Texto)`
    font-size: 24px;
    font-family: Roboto-Bold;
    margin-bottom: 10px
`
export const ContainerPreco = styled.View`
    flex-direction: row;
    align-items: flex-end;
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