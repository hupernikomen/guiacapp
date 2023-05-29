import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import DetalheProduto from '../pages/Detalhes/produto';
import DetalheServico from '../pages/Detalhes/servico';
import Servicos from '../pages/Servicos';
import Loja from '../pages/Loja';
import Vendedores from '../pages/Vendedores';
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/Categorias';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';

import Signin from '../pages/Signin'


import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator()


export default function RotasStack() {

  const { colors } = useTheme()


  return (
    <Stack.Navigator
      initialRouteName={'Home'}
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
        name='Signin'
        component={Signin}
        options={{
          headerShown: false,
        }}
        />


      <Stack.Screen
        name='Servicos'
        component={Servicos}
        options={{
          title: 'Serviços Profissionais'
        }}
        />

      <Stack.Screen
        name='DetalheProduto'
        component={DetalheProduto}
        options={{
          headerShown: false,
          title: "",
        }}
      />

      <Stack.Screen
        name='DetalheServico'
        component={DetalheServico}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name='Loja'
        component={Loja}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name='Vendedores'
        component={Vendedores}
        options={{
          title: "Nossos Vendedores"
        }}
      />

      <Stack.Screen
        name='Lojas'
        component={Lojas}
        options={{
          title: 'Lojas Cadastradas'
        }}
      />

      <Stack.Screen
        name='Mapa'
        component={Mapa}
        options={{
          title: "Localização da Loja"
        }}
      />

      <Stack.Screen
        name='Categorias'
        component={Categorias}
      />

      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          title: "",
        }}
      />

      <Stack.Screen
        name='Anuncie'
        component={Anuncie}
      />

      <Stack.Screen
        name='ErroConexao'
        component={ErroConexao}
        options={{
          headerShown: false,
          title: ""
        }}
      />

    </Stack.Navigator>

  )

}