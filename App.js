import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Rotas from './src/rotas';

import { LojaProvider } from './src/contexts/lojaContext'
import { ProdutoProvider } from './src/contexts/produtoContext'

const MyTheme = {
  dark: true,
  ...DefaultTheme,
  colors: {
    tema: '#a82424',
    temalojas: "#333",
    link: '#0288D1',
    vartema: '#EDAA25',
    destaque: '#00838F',
    background: '#f9f9f9',
  }
};



export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>

      <LojaProvider>
        <ProdutoProvider>

          <StatusBar
            backgroundColor={MyTheme.colors.tema}
            translucent={false} />
          <Rotas />

        </ProdutoProvider>
      </LojaProvider>

    </NavigationContainer>
  )
}