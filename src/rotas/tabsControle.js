import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

import CadastrarDados from '../controle/CadastrarDados';
import StackControle from './stacksControle'
import MapaControle from '../controle/Mapa';
import VendedoresControle from '../controle/Vendedores';

import { useTheme } from '@react-navigation/native';

export default function TabsControle() {

    const { colors } = useTheme()

    return (
        <Tab.Navigator
        initialRouteName='StackControle'
        
            screenOptions={{
                
                tabBarStyle: {
                    backgroundColor: colors.tema
                },
                tabBarInactiveTintColor: '#ffffff90',
                tabBarIndicatorStyle: {
                    backgroundColor: '#fff'
                }

            }}
        >
            <Tab.Screen name="StackControle" component={StackControle} options={{ title: "Home" }} />
            <Tab.Screen name="CadastrarDados" component={CadastrarDados} options={{ title: "Dados" }} />
            <Tab.Screen name="VendedoresControle" component={VendedoresControle} options={{ title: "Contatos" }} />
            <Tab.Screen name="Mapa" component={MapaControle} />
        </Tab.Navigator>
    );
}