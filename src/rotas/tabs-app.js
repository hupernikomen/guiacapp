import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Feed from '../pages/Feed';
import Produtos from '../pages/Produtos';
import Servicos from '../pages/Servicos'

import TabBarFeed from '../componentes/TabBarFeed';


const Tab = createMaterialTopTabNavigator();

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useTheme } from '@react-navigation/native';

export default function Tabs() {

  const { app } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Feed'
      // tabBar={props => <TabBarFeed {...props} />}
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: app.tema
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
        },
        tabBarInactiveTintColor: '#ffffff80',
      }}>

      {/* <Tab.Screen name="Feed" component={Feed} options={{}} /> */}
      <Tab.Screen name="Produtos" component={Produtos} options={{ title: 'Produtos' }} />
      <Tab.Screen name="Servicos" component={Servicos} options={{ title: 'Serviços' }} />

    </Tab.Navigator>
  );
}