import { Dimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStack from './stacks';
import DrawerCustom from '../componentes/Drawer';

import { useTheme } from '@react-navigation/native';

const Drawer = createDrawerNavigator()

export default function Rotas() {
  const WIDTH = Dimensions.get('window').width

  const { app } = useTheme()

  return (
    <Drawer.Navigator

      drawerContent={DrawerCustom}
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        headerStyle: {
        },
        headerTintColor: '#fff',

        drawerStyle: {
          width: WIDTH - 80,
          backgroundColor: app.tema,
        },
        drawerType: 'back',

      }}
    >
      <Drawer.Screen name='HomeScreen' component={HomeStack} options={{ title: 'Feed' }} />

    </Drawer.Navigator>

  )

}