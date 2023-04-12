import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native'

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import DetalheProduto from '../pages/Detalhes/produto';
import DetalheServico from '../pages/Detalhes/servico';
import Servicos from '../pages/Servicos';
import Loja from '../pages/Loja';
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/Categorias';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

export default function RotasStack() {

  const navigation = useNavigation()
  const { colors, font } = useTheme()


  return (
    <Stack.Navigator
      initialRouteName={'Home'}

      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tema,
          
        },
        headerTintColor: "#fff",
        headerTitleStyle:{
          fontFamily:'Roboto-Medium',
          fontSize:20
        }
      }}>


      <Stack.Screen
        options={{
          title: "Guia Comercial",
        }}
        name='Home'
        component={Home}
      />


      <Stack.Screen
        name='Menu'
        component={Menu}
        options={{
          title: "Guia Comercial",
          headerShadowVisible: false
        }} />



      <Stack.Screen
        name='Servicos'
        component={Servicos}
        options={{
          title:'Serviços Profissionais'
        }}
        />

      <Stack.Screen
        name='DetalheProduto'
        component={DetalheProduto}
        options={{
          title: "",
        }} />

      <Stack.Screen
        name='DetalheServico'
        component={DetalheServico}
        options={{
          title: "",
        }} />

      <Stack.Screen
        name='Loja'
        component={Loja}
      />

      <Stack.Screen
        options={{
          title:'Lojas Cadastradas'
        }}
        name='Lojas'
        component={Lojas}
      />

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
          title: "",
        }}
        name='Search'
        component={Search} />

      <Stack.Screen
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