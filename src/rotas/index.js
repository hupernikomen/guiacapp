import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native'

import Home from '../pages/Home';
import Detalhes from '../pages/Detalhes';
import Loja from '../pages/Loja';
import Lojas from '../pages/Lojas';
import Mapa from '../pages/Mapa';
import Categorias from '../pages/Categorias';
import Search from '../pages/Search';
import Anuncie from '../pages/Anuncie';
import ErroConexao from '../pages/ErroConexao';

import { AuthContext } from '../context';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme, useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator()

export default function RotasStack() {

  const { conectado } = useContext(AuthContext)
  const navigation = useNavigation()
  const { colors, font } = useTheme()

  useEffect(() => {

    !conectado ? navigation.navigate("ErroConexao") : navigation.navigate("Home")

  }, [])


  return (
    <Stack.Navigator
      initialRouteName={'Home'}

      screenOptions={{
        headerStyle: {
          backgroundColor: colors.tema,
        },
        headerTintColor: "#fff"

      }}>


      <Stack.Screen
        options={{
          title: "Guia Comercial",
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  padding: 4
                }}
                onPress={() => navigation.navigate("Search")}>
                <Material name='magnify' size={24} color='#fff' />
              </TouchableOpacity>
            )
          }
        }}
        name='Home'
        component={Home}
      />


      <Stack.Screen
        name='Detalhes'
        component={Detalhes}
        options={{
          headerShown: false,
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
          title: "O que você procura?",
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