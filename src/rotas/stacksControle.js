import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CadastrarProduto from '../controle/CadastrarProduto';
import EditaProduto from '../controle/EditaProduto';
import Home from '../controle/Home'

import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator()


export default function RotasStack() {

  const { colors } = useTheme()

  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tema,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 20
        }
      }}
    >

      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
      />


      <Stack.Screen
        name='CadastrarProduto'
        component={CadastrarProduto}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name='EditaProduto'
        component={EditaProduto}
        options={{
          headerShown:false
        }}
      />

    </Stack.Navigator>

  )

}