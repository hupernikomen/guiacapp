import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Feed from '../pages/Feed';
import Produtos from '../pages/Produtos';
import Servicos from '../pages/Servicos'

import TabBarFeed from '../componentes/TabBarFeed';

import { useTheme } from '@react-navigation/native';

export default function Tabs() {

  const { app } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Feed'
      tabBar={props => <TabBarFeed {...props} />}
      screenOptions={{
        headerShown:false,
        tabBarActiveTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: app.tema
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#fff',
        },
        tabBarInactiveTintColor: '#ffffff80',
      }}>

      {/* <Tab.Screen name="Feed" component={Feed} options={{
         tabBarIcon:'flag'
      }} /> */}
      <Tab.Screen name="Produtos" component={Produtos} options={{ 
        tabBarIcon:'tag'
        }} />

      <Tab.Screen name="Servicos" component={Servicos} options={{ 
        tabBarIcon:'user'
        }} />

    </Tab.Navigator>
  );
}