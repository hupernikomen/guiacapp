import React, { useContext } from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import Servicos from '../pages/Servicos';
import Lojas from '../pages/Lojas';
import Anuncie from '../pages/Anuncie';
import Signin from '../pages/Signin'

import StackControle from '../rotas/stacksControle'


import DrawerCustom from '../componentes/DrawerCustom';

import { useTheme } from '@react-navigation/native';

import { LojaContext } from '../contexts/lojaContext';

import { BtnIcone, TextBtn } from '../styles';

const Drawer = createDrawerNavigator()

export default function Rotas() {

  const { colors } = useTheme()

  const { autenticado, signOut } = useContext(LojaContext);

  return (
    <Drawer.Navigator

      drawerContent={DrawerCustom}


      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,

        headerStyle: {
          backgroundColor: colors.tema
        },
        headerTintColor: '#fff',

        drawerStyle: {
          backgroundColor: colors.tema
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Regular'
        },

        drawerType: 'back',

      }}
    >

      {autenticado ?
        <>
          <Drawer.Screen name='HomeControle' component={StackControle} options={{ title: 'Área Lojista' }}/>
          <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
        </>

        :
        <>
          <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
          <Drawer.Screen name='Lojas' component={Lojas} options={{ title: "Lojas Parceiras" }} />
          <Drawer.Screen name='Servicos' component={Servicos} options={{ title: 'Serviços Profissionais' }} />

          <Drawer.Screen name='Signin' component={Signin} options={{ title: 'Login' }} />
        </>
      }

    </Drawer.Navigator>

  )

}