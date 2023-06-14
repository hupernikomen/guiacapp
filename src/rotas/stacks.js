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

import CadastrarProduto from '../controle/CadastrarProduto';
import EditaProduto from '../controle/EditaProduto';
import CadastrarVendedor from '../controle/CadastrarVendedor';
import CadastrarDados from '../controle/CadastrarDados';
import MapaControle from '../controle/Mapa';
import VendedoresControle from '../controle/Vendedores';

import HomeControle from '../controle/Home';


import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator()


export default function RotasStack() {

  const { colors } = useTheme()


  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: colors.tema,
        // },
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
        name='HomeControle'
        component={HomeControle}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{
          title:'',
          headerShadowVisible:false,
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
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
        name='Lojas'
        component={Lojas}
        options={{
          title: 'Lojas Cadastradas',
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='DetalheProduto'
        component={DetalheProduto}
        options={{
          title: "",
          headerTransparent:true,
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
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Vendedores'
        component={Vendedores}
        options={{
          title: "Nossos Vendedores",
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='CadastrarVendedor'
        component={CadastrarVendedor}
        options={{
          title: "Nossos Vendedores",
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />




      <Stack.Screen
        name='Mapa'
        component={Mapa}
        options={{
          title: "Localização da Loja",
          headerStyle: {
            backgroundColor: colors.tema,
          }
        }}
      />

      <Stack.Screen
        name='Categorias'
        component={Categorias}
        options={{
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='Anuncie'
        component={Anuncie}
        options={{
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='ErroConexao'
        component={ErroConexao}
        options={{
          headerShown: false,
          title: ""
        }}
      />

      <Stack.Screen
        name="CadastrarDados"
        component={CadastrarDados}
        options={{ 
          title: "Dados" ,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor:'#000'
        }}
      />


      <Stack.Screen
        name='CadastrarProduto'
        component={CadastrarProduto}
        options={{
          title: 'Cadastrar Produto',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor:'#000'
        }}
      />

      <Stack.Screen
        name="VendedoresControle"
        component={VendedoresControle}
        options={{ 
          title: "Vendedores",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor:'#000'
       }}
      />


      <Stack.Screen
        name='EditaProduto'
        component={EditaProduto}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor:'#000'
        }}
      />

      <Stack.Screen
        name="MapaControle"
        component={MapaControle}
        options={{
          title:'Mapa',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor:'#000'
        }}
      />


    </Stack.Navigator>

  )

}