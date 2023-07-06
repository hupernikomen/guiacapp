import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import AsyncStorage from "@react-native-async-storage/async-storage";

import Feed from '../pages/Feed';
import Produtos from '../pages/Produtos';
import Servicos from '../pages/Servicos'

import TabBarFeed from '../componentes/TabBarFeed';

import { useTheme, useNavigation } from '@react-navigation/native';

export default function Tabs() {

  // const navigation = useNavigation()

  // const [tela, setTela] = useState("Produtos")
  // async function PegaTela () {
  //   await AsyncStorage.getItem('@telaInicial')
  //   .then((response) => {
  //     setTela(response)
  //     navigation.navigate(response)
  //   })
  // }
  // PegaTela()

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

      <Tab.Screen name="Feed" component={Feed} options={{ tabBarIcon: 'umbrella' }} />

      <Tab.Screen name="Produtos" component={Produtos} options={{ tabBarIcon: 'tag' }} />

      <Tab.Screen name="Servicos" component={Servicos} options={{ tabBarIcon: 'user' }} />

    </Tab.Navigator>
  );
}