import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeControle from '../controle/Home';
import CadastrarDados from '../controle/CadastrarDados';
import MapaControle from '../controle/Mapa';
import Contato from '../controle/Contato';

const Tab = createMaterialTopTabNavigator();

import { useTheme } from '@react-navigation/native';

export default function Tabs() {

  const { admin } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff'
        },
        tabBarActiveTintColor:'#000',
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 125 },
        tabBarIndicatorStyle: {
          backgroundColor: admin.texto,
          height:1
        },
        tabBarInactiveTintColor: '#00000090'
      }}>

      <Tab.Screen name="Home" component={HomeControle} options={{ title: 'Produtos' }} />
      <Tab.Screen name="CadastrarDados" component={CadastrarDados} options={{ title: 'Dados' }} />
      <Tab.Screen name="Contato" component={Contato} options={{ title: 'Contatos' }} />
      <Tab.Screen name="MapaControle" component={MapaControle} options={{ title: 'Mapa' }} />

    </Tab.Navigator>
  );
}