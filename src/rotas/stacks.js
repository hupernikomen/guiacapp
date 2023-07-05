import { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Pressable } from 'react-native';

import Feather from 'react-native-vector-icons/Feather'

import DetalheProduto from '../pages/Detalhes/produto';
import DetalheServico from '../pages/Detalhes/servico';
import Profissionais from '../pages/Profissionais';
import Loja from '../pages/Loja';
import Contato from '../pages/Contato';
import Posto from '../pages/Posto'
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/PorCategoria';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';
import ErroNaoEncontrado from '../pages/ErroNaoEncontrado'
import CategoriasFavoritas from '../pages/CategoriasFavoritas';

import Signin from '../pages/Signin'
import Redireciona from '../pages/Redireciona';

import HomeControle from '../controle/Loja/Home';
import Profissional from '../controle/Profissional';
import CadastrarProduto from '../controle/Loja/Produto';
import EditaProduto from '../controle/Loja/EditaProduto';
import CadastrarContato from '../controle/CadastrarContato';
import CadastrarDados from '../controle/Loja/Dados';
import VendedoresControle from '../controle/Loja/Contato';

import { LojaContext } from '../contexts/lojaContext';

import Tabs_App from './tabs-app'


import { useTheme, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator()


export default function RotasStack() {

  const { loja, signOut } = useContext(LojaContext)

  const { app, admin } = useTheme()
  const navigation = useNavigation()

  return (
    <Stack.Navigator
      initialRouteName={'Feed'}
      screenOptions={{
        
        headerTintColor: "#fff",
        orientation: 'portrait'

      }}
    >

      <Stack.Screen
        name='HomeFeed'
        component={Tabs_App}
        options={{
          title: 'Guia Comercial',
          headerShown: false,
          headerTintColor: app.texto,
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />


      <Stack.Screen
        name='Profissional'
        component={Profissional}
        options={{
          headerLeft: () => {
            return (
              <Pressable
                style={{ padding: 10, marginLeft: -10, marginRight: 10 }}
                onPress={() => navigation.openDrawer()}>
                <Feather name='menu' size={app.icone} color={app.texto} />
              </Pressable>

            )
          },
          headerRight: () => {
            return (
              <Pressable
                lado={'center'}
                onPress={signOut}>
                <Feather name='log-out' size={app.icone} color={app.texto} />
              </Pressable>
            )
          },
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Signin'
        component={Signin}
        options={{
          title: '',
          headerTransparent: true,
          headerTintColor: admin.texto,
        }}
      />


      <Stack.Screen
        name='Profissionais'
        component={Profissionais}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Lojas'
        component={Lojas}
        options={{
          title: 'Lojas Cadastradas',
          headerStyle: {
            backgroundColor: app.tema,
          },

        }}
      />

      <Stack.Screen
        name='Posto'
        component={Posto}
        options={{
          title: 'Posto de Combustíveis',
          headerStyle: {
            backgroundColor: app.tema,
          },
          headerLeft: () => {
            return (
              <Pressable
                lado={'center'}
                style={{ marginRight: 25 }}
                onPress={() => navigation.openDrawer()}>
                <Feather name='menu' size={app.icone} color={'#fff'} />
              </Pressable>
            )
          },
          headerRight: () => {
            return (
              <Pressable
                lado={'center'}
                onPress={signOut}>
                <Feather name='log-out' size={app.icone} color={'#fff'} />
              </Pressable>
            )
          },
        }}
      />

      <Stack.Screen
        name='CategoriasFavoritas'
        component={CategoriasFavoritas}
        options={{
          title: 'Categorias Favoritas',
          headerStyle: {
            backgroundColor: app.tema,
          },

        }}
      />

      <Stack.Screen
        name='DetalheProduto'
        component={DetalheProduto}
        options={{
          headerTransparent: true,
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
          title: '',
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Contato'
        component={Contato}
        options={{
          title: "Nossos Contatos",
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Mapa'
        component={Mapa}
        options={{
          title: "Localização",
          headerStyle: {
            backgroundColor: app.tema,
          }
        }}
      />

      <Stack.Screen
        name='Categorias'
        component={Categorias}
        options={{
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />

      <Stack.Screen
        name='Anuncie'
        component={Anuncie}
        options={{
          headerStyle: {
            backgroundColor: app.tema,
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
            backgroundColor: app.tema,
          },
        }}
      />

      {/* ----------------------------------------------- */}


      <Stack.Screen
        name='Redireciona'
        component={Redireciona}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: app.tema,
          },
        }}
      />


      {/* ----------------------------------------------- */}






      <Stack.Screen
        name={'HomeControle'}
        component={HomeControle}
        options={{
          title: loja?.nome || "",
          headerStyle: {
            backgroundColor: app.tema,
          },
          headerLeft: () => {
            return (
              <Pressable style={{ marginRight: 25 }} onPress={() => navigation.openDrawer()}>
                <Feather name='menu' size={app.icone} color={'#fff'} />
              </Pressable>
            )
          },
          headerRight: () => {
            return (
              <View style={{
                flexDirection:'row',
                gap: 25
              }}>
                <Pressable onPress={() => navigation.navigate("CadastrarDados")}>
                  <Feather name='edit' size={app.icone} color={'#fff'} />
                </Pressable>
                <Pressable onPress={() => navigation.navigate("VendedoresControle")}>
                  <Feather name='message-circle' size={app.icone} color={'#fff'} />
                </Pressable>
                <Pressable onPress={signOut}>
                  <Feather name='log-out' size={app.icone} color={'#fff'} />
                </Pressable>
              </View>
            )
          },

        }}
      />

      <Stack.Screen
        name='CadastrarProduto'
        component={CadastrarProduto}
        options={{
          title: 'Cadastrar Produto',
          headerStyle: {
            backgroundColor: admin.tema,
          },
          headerShadowVisible: false,
          headerTintColor: admin.texto
        }}
      />

      <Stack.Screen
        name="VendedoresControle"
        component={VendedoresControle}
        options={{
          title: "Contato",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: admin.tema,
          },
          headerTintColor: admin.texto
        }}
      />

      <Stack.Screen
        name='CadastrarVendedor'
        component={CadastrarContato}
        options={{
          title: "Cadastrar Vendedor",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: admin.tema,
          },
          headerTintColor: admin.texto
        }}
      />

      <Stack.Screen
        name='EditaProduto'
        component={EditaProduto}
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: admin.tema,
          },
          headerTintColor: admin.texto
        }}
      />




      <Stack.Screen
        name="CadastrarDados"
        component={CadastrarDados}
        options={{
          title: "Dados",
          headerStyle: {
            backgroundColor: admin.tema,
          },
          headerShadowVisible: false,
          headerTintColor: admin.texto
        }}
      />


    </Stack.Navigator>



  )

}