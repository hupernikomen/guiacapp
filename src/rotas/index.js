import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Detalhes from '../pages/Detalhes';
import Loja from '../pages/Loja';
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/Categorias';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';

import Tabbar from '../componentes/Tabbar';

import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

export default function RotasStack() {

  const { colors, font } = useTheme()


  return (
    <Stack.Navigator
      initialRouteName={'Home'}

      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tema,
        },
        headerTitleStyle: {
          fontFamily: font.gfp,
        },
        headerTintColor: colors.background

      }}>
        

      <Stack.Screen
        options={{
          headerShown: false,
          title: ""
        }}
        name='Home'
        component={Home}
      />


      <Stack.Screen
        name='Detalhes'
        component={Detalhes}
        options={{

          title: "",
        }} />

      <Stack.Screen
        name='Loja'
        component={Loja}
        options={{
          // headerShadowVisible:false
        }} />
      <Stack.Screen
        name='Lojas'
        component={Lojas}
        options={{
          // headerShadowVisible:false
        }} />

      <Stack.Screen
        name='Mapa'
        component={Mapa}
        options={{
          title: "Localização da Loja"
        }} />

      <Stack.Screen
        name='Categorias'
        component={Categorias}
        options={{
        }} />
      <Stack.Screen
        options={{
          title: ""
        }}
        name='Search'
        component={Search} />

      <Stack.Screen
        options={{
          // headerShown:false,
        }}
        name='Anuncie'
        component={Anuncie} />

        
      <Stack.Screen
        options={{
          headerShown: false,
          title: ""
        }}
        name='ErroConexao'
        component={ErroConexao}
      />

    </Stack.Navigator>
  )

}