import styled from 'styled-components/native'

export const ProdutoContainer = styled.TouchableOpacity`
    flex: 1;
    background-color: #fff;
    padding: 1px;
    border-radius: 2px;
    margin-horizontal: 4px;
    max-width: (${props => props.largura} / 2) - 12px
`