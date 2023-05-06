import styled from 'styled-components/native'

export const BtnCabecalho = styled.TouchableOpacity`
    width: 120px;
    aspect-ratio:1;
    border-radius: 2px;
    align-items: center;
    justify-content: space-around;
    padding: 10px; 
    background-color: ${props => props.cor}; 
    margin: 5px;
    elevation: 2
`
export const TxtBtnCabecalho = styled.Text`
    text-align: center;
    color: #000;
    font-family: Roboto-Light;
    font-size: 14px;
    margin-top: 10px
`
export const BtnMenu = styled.TouchableOpacity`
    padding-horizontal: 15px;
    padding-vertical: 10px;
    height: 55px;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TxtBtnMenu = styled.Text`
    color: #000;
    font-size: 16px;
    font-family: Roboto-Regular
`