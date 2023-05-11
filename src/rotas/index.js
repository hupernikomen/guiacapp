import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import MapaControle from '../controle/Mapa';
import VendedoresControle from '../controle/Vendedores';


import { LojaContext } from '../contexts/lojaContext';

import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

export default function RotasStack() {

  const { colors } = useTheme()
  const { autenticado } = useContext(LojaContext);


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
            name='HomeControle'
            component={HomeControle}
            options={{
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name='CadastrarDados'
            component={CadastrarDados}
            options={{
              title: "Meus Dados",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name='CadastrarProduto'
            component={CadastrarProduto}
            options={{
              title: "Postar Produto",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name='EditaProduto'
            component={EditaProduto}
            options={{
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name='MapaControle'
            component={MapaControle}
            options={{
              title: "Localização",
              headerShadowVisible: false,
            }}
          />

          <Stack.Screen
            name='VendedoresControle'
            component={VendedoresControle}
            options={{
              title: "Cadastro de Vendedores",
              headerShadowVisible: false,
            }}
          />
        </>
      }

      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: "Guia Comercial",
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
        name='Menu'
        component={Menu}
        options={{
          title: "Guia Comercial",
          headerShadowVisible: false
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