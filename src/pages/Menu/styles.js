import styled from 'styled-components/native'

export const BtnCabecalho = styled.TouchableOpacity`
    width: 90px;
    aspect-ratio:1;
    border-radius: 6px;
    align-items: center;
    padding: 10px; 
    background-color: ${props => props.cor}; 
    margin: 5px
`
export const TxtBtnCabecalho = styled.Text`
    text-align: center;
    color: #fbeaea;
    font-family: Roboto-Light;
    font-size: 12px;
    margin-top: 10px
`
export const BtnMenu = styled.TouchableOpacity`
    padding-horizontal: 15px;
    padding-vertical: 10px;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-vertical: 2px
`

export const TxtBtnMenu = styled.Text`
    color: #000;
    font-size: 16px;
    font-family: Roboto-Regular
`