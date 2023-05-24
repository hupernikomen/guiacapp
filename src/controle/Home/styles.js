import styled from 'styled-components/native'

export const BtnMais = styled.TouchableOpacity`

    position:absolute;
    z-index: 9999;
    right: 20px;
    bottom:30px;
    background-color:${props => props.background};
    width:50px;
    height: 50px;
    border-radius: 25px;
    align-items: center;
    justify-content:center;
    elevation: 5
`