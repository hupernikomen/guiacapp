import React, { useContext } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import Servicos from '../pages/Servicos';
import Lojas from '../pages/Lojas';
import Anuncie from '../pages/Anuncie';
import Signin from '../pages/Signin'


import HomeControle from '../controle/Home'

import { LojaContext } from '../contexts/lojaContext';
const Drawer = createDrawerNavigator()

export default function Rotas() {

  const {autenticado} = useContext(LojaContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!autenticado && <Drawer.Screen name='Signin' component={Signin} options={{ title: 'Login' }} />}

      <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />
      <Drawer.Screen name='HomeControle' component={HomeControle} options={{ title: 'Area Lojista' }} />
      <Drawer.Screen name='Lojas' component={Lojas} options={{}} />
      <Drawer.Screen name='Servicos' component={Servicos} options={{}} />
    </Drawer.Navigator>

  )

}