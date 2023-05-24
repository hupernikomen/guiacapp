import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import Servicos from '../pages/Servicos';
import Lojas from '../pages/Lojas';
import Anuncie from '../pages/Anuncie';
import Signin from '../pages/Signin'


import TabsControle from './tabsControle';

import DrawerCustom from '../componentes/DrawerCustom';

import { useTheme } from '@react-navigation/native';

import { LojaContext } from '../contexts/lojaContext';
const Drawer = createDrawerNavigator()

export default function Rotas() {

  const { colors } = useTheme()

  const { autenticado } = useContext(LojaContext);

  return (
    <Drawer.Navigator
      drawerContent={DrawerCustom}
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,

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
          <Drawer.Screen name='HomeControle' component={TabsControle} options={{ title: 'Area Lojista' }} />
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