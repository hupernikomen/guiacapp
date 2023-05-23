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
    // tema: '#bd2828',
    tema: '#a82424',
    tema_2: '#a82424',
    vartema: '#EDAA25',
    destaque: '#b38f00',
    background: '#f1f1f1',
    card: '#fff',
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