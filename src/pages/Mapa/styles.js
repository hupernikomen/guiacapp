import styled from 'styled-components/native'

export const Card = styled.View`
    position: absolute;
    z-index: 99;
    align-self: center;
    top: 10px;
    width: ${props=> props.width}px;
    border-radius: 10px
    padding-horizontal: 20px;
    padding-vertical:10px;
    elevation: 3;
    background-color: #ffffff;
    opacity: .9
`