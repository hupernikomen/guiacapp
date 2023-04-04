import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './src/rotas';
import { StatusBar } from 'react-native';


import { AuthProvider } from './src/context';
const MyTheme = {
  dark: true,

  // BLACKFRIDAY
  colors: {
    tema: '#111', 
    tema_2: '#222',
    vartema: '#EDAA25',
    destaque: '#e6b800',
    background:'#f1f1f1'
  },

  //NORMAL
  colors: {
    tema: '#bd2828',
    tema_2: '#A32222',
    vartema: '#FF6D1C',
    destaque: '#e6b800',
    background:'#f1f1f1'
  },
  font: {
    gfp: "Roboto-Regular"
  }
};



export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthProvider>
        <StatusBar backgroundColor={MyTheme.colors.tema} translucent={false} />


        <Rotas />
      </AuthProvider>
    </NavigationContainer>
  )
}