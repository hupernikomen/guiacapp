import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native'

import Home from '../pages/Home';
import Menu from '../pages/Menu';
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
import CadastrarProduto from '../controle/CadastrarProduto';
import CadastrarDados from '../controle/CadastrarDados';
import EditaProduto from '../controle/EditaProduto';
import HomeControle from '../controle/Home'


import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../contexts/lojaContext';

import { useTheme, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

export default function RotasStack() {

  const navigation = useNavigation()
  const { colors, font } = useTheme()
  const { autenticado, loading, loja } = useContext(LojaContext);


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
      }}>








      {autenticado &&
        <>
          <Stack.Screen
            options={{
              headerTitle: loja.nome || "",
              headerShadowVisible: false,
              headerRight: () => (
                <>
                  <TouchableOpacity style={{ marginLeft: 10, width: 35, aspectRatio: 1, alignItems: 'flex-end', justifyContent: 'center' }}
                    onPress={() => navigation.navigate("CadastrarProduto")}>
                    <Material name='plus-thick' size={26} color='#fff' />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 10, width: 35, aspectRatio: 1, alignItems: 'flex-end', justifyContent: 'center' }}
                    onPress={() => navigation.navigate("Menu")}>
                    <Material name='dots-vertical' size={26} color='#fff' />
                  </TouchableOpacity>
                </>
              ),
              headerLeft: () => (

                loja?.logo?.length > 0 && <Image
                  source={{ uri: loja.logo[0].location }}
                  style={{
                    width: 38,
                    aspectRatio: 1,
                    borderRadius: 20,
                    marginRight: 10,
                    borderWidth: .5,
                    borderColor: '#fff',
                    backgroundColor: '#fff',
                  }}
                />

              )
            }}
            name='HomeControle'
            component={HomeControle} />



          <Stack.Screen
            name='CadastrarDados'
            component={CadastrarDados}
            options={{
              title: "Meus Dados",
              headerShadowVisible: false,
            }} />
          <Stack.Screen
            name='CadastrarProduto'
            component={CadastrarProduto}
            options={{
              title: "Postar Produto",
              headerShadowVisible: false,
            }} />

          <Stack.Screen
            name='EditaProduto'
            component={EditaProduto}
            options={{
              headerShadowVisible: false,
            }} />


        </>



      }













      <Stack.Screen
        options={{
          title: "Guia Comercial",
        }}
        name='Home'
        component={Home}
      />

      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          }
        }}
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
          title: 'Serviços Profissionais'
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
        options={{
          headerShown: false
        }}
        name='Loja'
        component={Loja}
      />

      <Stack.Screen
        options={{
          title: "Nossos Vendedores"
        }}
        name='Vendedores'
        component={Vendedores}
      />

      <Stack.Screen
        options={{
          title: 'Lojas Cadastradas'
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