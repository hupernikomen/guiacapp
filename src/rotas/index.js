import React, { useContext } from 'react';
import { View,Text } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import Servicos from '../pages/Servicos';
import Lojas from '../pages/Lojas';
import Anuncie from '../pages/Anuncie';
import Signin from '../pages/Signin'


import HomeControle from '../controle/Home'

import DrawerCustom from '../componentes/DrawerCustom';

import { useTheme } from '@react-navigation/native';

import { LojaContext } from '../contexts/lojaContext';
const Drawer = createDrawerNavigator()

export default function Rotas() {

  const {colors} = useTheme()

  const { autenticado } = useContext(LojaContext);

  return (
    <Drawer.Navigator
    drawerContent={DrawerCustom}
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,

        drawerStyle:{
          backgroundColor:colors.tema
        },
        drawerActiveTintColor:'#fff',
        drawerInactiveTintColor:'#fff',
        drawerLabelStyle:{
          fontFamily:'Roboto-Regular'
        },
        
        drawerType:'back',

      }}
    >

      <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
      <Drawer.Screen name='Lojas' component={Lojas} options={{title: "Lojas Parceiras"}} />
      <Drawer.Screen name='Servicos' component={Servicos} options={{title:'Serviços Profissionais'}} />

      {!autenticado ? <Drawer.Screen name='Signin' component={Signin} options={{ title: 'Login' }} /> :
        <Drawer.Screen name='HomeControle' component={HomeControle} options={{ title: 'Area Lojista' }} />
      }
    </Drawer.Navigator>

  )

}