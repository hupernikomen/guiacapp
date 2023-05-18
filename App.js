import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import Rotas from './src/rotas';
import { StatusBar } from 'react-native';


import { LojaProvider } from './src/contexts/lojaContext'
import { ProdutoProvider } from './src/contexts/produtoContext'



const MyTheme = {
  dark: true,
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   tema: '#bd2828',
  //   tema_2: '#a82424',
  //   vartema: '#EDAA25',
  //   destaque: '#b38f00',
  //   background: '#f1f1f1',

  // },
  colors: {
    tema: '#bd2828',
    tema_2: '#a82424',
    vartema: '#EDAA25',
    destaque: '#b38f00',
    background: '#f1f1f1',
    card: '#fff',
  }
  //TEMA BLACKFRIDAY

  // colors: {
  //   tema: '#111', 
  //   tema_2: '#222',
  //   vartema: '#EDAA25',
  //   destaque: '#b38f00',
  //   background:'#f1f1f1'
  // },

  //TEMA NORMAL
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