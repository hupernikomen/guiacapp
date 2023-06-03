import React, { useContext } from 'react';
import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import Signin from '../pages/Signin'

import StackControle from '../rotas/stacksControle'

import DrawerCustom from '../componentes/DrawerCustom';

import { useTheme } from '@react-navigation/native';

import { LojaContext } from '../contexts/lojaContext';

const Drawer = createDrawerNavigator()

export default function Rotas() {
  const  WIDTH = Dimensions.get('window').width

  const { colors } = useTheme()

  const { autenticado } = useContext(LojaContext);

  return (
    <Drawer.Navigator

      drawerContent={DrawerCustom}
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        headerStyle: {
          backgroundColor: colors.tema
        },
        headerTintColor: '#fff',

        drawerStyle: {
          width: WIDTH - 55,
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
          <Drawer.Screen name='HomeControle' component={StackControle} options={{ title: 'Área Lojista' }} />
          <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
        </>

        :
        <>
          <Drawer.Screen name='Signin' component={Signin} options={{ title: 'Login' }} />
          <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
        </>
      }

    </Drawer.Navigator>

  )

}