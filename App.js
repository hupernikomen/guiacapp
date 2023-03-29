import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Rotas from './src/rotas';
import { StatusBar } from 'react-native';


import { AuthProvider } from './src/context/relacao';
const MyTheme = {
  dark: false,
  colors: {
    tema: '#cd362c',
    vartema: '#c83c32',
    secundario: '#3c3c3d',
    destaque: '#e6b800',
    background: '#f5f2ee',
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