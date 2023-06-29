import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Pressable } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import DetalheProduto from '../pages/Detalhes/produto';
import DetalheServico from '../pages/Detalhes/servico';
import Profissionais from '../pages/Profissionais';
import Loja from '../pages/Loja';
import Vendedores from '../pages/Contato';
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/PorCategoria';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';
import ErroNaoEncontrado from '../pages/ErroNaoEncontrado'
import CategoriasFavoritas from '../pages/CategoriasFavoritas';

import Redireciona from '../pages/Redireciona';

import Signin from '../pages/Signin'

import Profissional from '../controle/Profissional';
import CadastrarProduto from '../controle/CadastrarProduto';
import EditaProduto from '../controle/EditaProduto';
import CadastrarContato from '../controle/CadastrarContato';
import CadastrarDados from '../controle/CadastrarDados';
import MapaControle from '../controle/Mapa';
import VendedoresControle from '../controle/Contato';

import { LojaContext } from '../contexts/lojaContext';

import Tabs_Controle from './tabs-controle';
import Tabs_App from './tabs-app'


import { useTheme, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator()


export default function RotasStack() {

  const { loja, signOut } = useContext(LojaContext)

  const { colors } = useTheme()
  const navigation = useNavigation()


  return (
    <Stack.Navigator
      initialRouteName={'Feed'}
      screenOptions={{
        headerTintColor: "#fff",

      }}
    >

      <Stack.Screen
        name='HomeFeed'
        component={Tabs_App}
        options={{
          title: 'Guia Comercial',
          headerStyle: {
            backgroundColor: colors.tema,
          },
          headerLeft: () => {
            return (
              <Pressable
                style={{ marginRight: 25 }}
                onPress={() => navigation.openDrawer()}>
                <Material name='menu' size={24} color={'#fff'} />
              </Pressable>

            )
          },
          headerRight: () => {
            return (
              <View style={{
                flexDirection: 'row',
                gap: 20
              }}>
                <Pressable
                  style={estilo.icone}
                  onPress={() => navigation.navigate("CategoriasFavoritas")}>
                  <Material name='filter-outline' size={24} color='#fff' />
                </Pressable>
                <Pressable
                  style={estilo.icone}
                  onPress={() => navigation.navigate("Search")}>
                  <Material name='magnify' size={24} color='#fff' />
                </Pressable>

              </View>
            )
          },
        }}
      />

      <Stack.Screen
        name={'HomeControle'}
        component={Tabs_Controle}
        options={{
          title: loja?.nome || "",
          headerLeft: () => {
            return (
              <Pressable
                lado={'center'}
                style={{ marginRight: 25 }}
                onPress={() => navigation.openDrawer()}>
                <Material name='menu' size={22} color={'#fff'} />
              </Pressable>
            )
          },
          headerRight: () => {
            return (
              <Pressable
                lado={'center'}
                onPress={signOut}>
                <Material name='power-standby' size={22} color={'#fff'} />
              </Pressable>
            )
          },
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='Redireciona'
        component={Redireciona}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
        }}
      />

      <Stack.Screen
        name='Profissional'
        component={Profissional}
        options={{
          headerRight: () => {
            return (
              <Pressable
                lado={'center'}
                onPress={signOut}>
                <Material name='power-standby' size={22} color={'#fff'} />
              </Pressable>
            )
          },
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{
          title: '',
          headerShadowVisible: false,
          headerTintColor: "#000",
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
        }}
      />


      <Stack.Screen
        name='Profissionais'
        component={Profissionais}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.tema,
          },
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
        name='CategoriasFavoritas'
        component={CategoriasFavoritas}
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
          headerTransparent: true,
          title: "",
          // headerStyle: {
          //   backgroundColor: colors.tema,
          // }
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
          headerStyle: {
            backgroundColor: colors.tema,
          },
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
        name='ErroNaoEncontrado'
        component={ErroNaoEncontrado}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: colors.tema,
          },
        }}
      />

      <Stack.Screen
        name="CadastrarDados"
        component={CadastrarDados}
        options={{
          title: "Dados",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
          headerTintColor: '#000'
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
          headerShadowVisible: false,
          headerTintColor: '#000'
        }}
      />

      <Stack.Screen
        name="VendedoresControle"
        component={VendedoresControle}
        options={{
          title: "Vendedores",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000'
        }}
      />

      <Stack.Screen
        name='CadastrarVendedor'
        component={CadastrarContato}
        options={{
          title: "Cadastrar Vendedor",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000'
        }}
      />

      <Stack.Screen
        name='EditaProduto'
        component={EditaProduto}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000'
        }}
      />

      <Stack.Screen
        name="MapaControle"
        component={MapaControle}
        options={{
          title: 'Mapa',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000'
        }}
      />
    </Stack.Navigator>

  )

}