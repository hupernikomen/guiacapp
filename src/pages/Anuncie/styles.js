import styled from 'styled-components/native'

const Texto = styled.Text`
color: #000
`

export const Titulo = styled(Texto)`
    font-size: 22px;
    font-family: Roboto-Bold
`
export const Subtitulo = styled(Texto)`
    font-size: 18px;
    font-family: Roboto-Medium
`
export const ContainerSessao = styled.View`
    margin-bottom: 30px;
    margin-left: ${props => props.left+'px'}
`