import styled from 'styled-components/native'

export const BtnMais = styled.TouchableOpacity`

    position:absolute;
    z-index: 9999;
    right: 20px;
    bottom:20px;
    background-color:${props => props.background};
    width:55px;
    aspect-ratio: 1;
    border-radius: 30px;
    align-items: center;
    justify-content:center;
    elevation: 5
`