import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Feed from '../pages/Postos';
import Produtos from '../pages/Produtos';
import Servicos from '../pages/Servicos'

import TabBarFeed from '../componentes/TabBarFeed';

import { useTheme } from '@react-navigation/native';

export default function Tabs() {

  const { app } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName={'Produtos'}
      tabBar={props => <TabBarFeed {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: app.tema
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
        },
        tabBarInactiveTintColor: '#ffffff80',
      }}>

      <Tab.Screen name="Feed" component={Feed} options={{ tabBarIcon: 'bookmark-outline' }} />
      <Tab.Screen name="Produtos" component={Produtos} options={{ tabBarIcon: 'tag-outline' }} />
      <Tab.Screen name="Servicos" component={Servicos} options={{ tabBarIcon: 'account-supervisor-outline' }} />

    </Tab.Navigator>
  );
}