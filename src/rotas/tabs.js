import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import HomeControle from '../controle/Home';
import CadastrarDados from '../controle/CadastrarDados';
import MapaControle from '../controle/Mapa';
import VendedoresControle from '../controle/Vendedores';

const Tab = createMaterialTopTabNavigator();

import { useTheme } from '@react-navigation/native';

export default function Tabs() {

  const { colors } = useTheme()

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tema
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 105 },
        tabBarIndicatorStyle: {
          backgroundColor: '#fff'
        },
        tabBarInactiveTintColor: '#ffffff90'
      }}>

      <Tab.Screen name="Home" component={HomeControle} options={{ title: 'Loja' }} />
      <Tab.Screen name="CadastrarDados" component={CadastrarDados} options={{ title: 'Dados' }} />
      <Tab.Screen name="VendedoresControle" component={VendedoresControle} options={{ title: 'Vendedor' }} />
      <Tab.Screen name="MapaControle" component={MapaControle} options={{ title: 'Mapa' }} />
      
    </Tab.Navigator>
  );
}