// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import CadastrarProduto from '../controle/CadastrarProduto';
// import EditaProduto from '../controle/EditaProduto';
// import Home from '../controle/Home'
// import CadastrarDados from '../controle/CadastrarDados';
// import MapaControle from '../controle/Mapa';
// import VendedoresControle from '../controle/Vendedores';

// import Lojas from '../pages/Lojas';
// import Servicos from '../pages/Servicos';

// import { useTheme } from '@react-navigation/native';
// const Stack = createNativeStackNavigator()


// export default function RotasStack() {

//   const { colors } = useTheme()

//   return (
//     <Stack.Navigator
//       initialRouteName='Home'
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: colors.tema,
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//           fontFamily: 'Roboto-Medium',
//           fontSize: 20
//         }
//       }}
//     >

//       <Stack.Screen
//         name='Home'
//         component={Home}
//         options={{
//           headerShown: false
//         }}
//       />

//       <Stack.Screen
//         name="CadastrarDados"
//         component={CadastrarDados}
//         options={{ title: "Dados" }}
//       />


//       <Stack.Screen
//         name='CadastrarProduto'
//         component={CadastrarProduto}
//         options={{
//           title: 'Cadastrar Produto'
//           // headerShown:false
//         }}
//       />

//       <Stack.Screen
//         name="VendedoresControle"
//         component={VendedoresControle}
//         options={{ title: "Vendedores" }}
//       />


//       <Stack.Screen
//         name='EditaProduto'
//         component={EditaProduto}
//         options={{
//           title: ''
//           // headerShown:false
//         }}
//       />

//       <Stack.Screen
//         name="Mapa"
//         component={MapaControle}
//       />

//       <Stack.Screen
//         name='Servicos'
//         component={Servicos}
//         options={{
//           title: 'Serviços Profissionais'
//         }}
//       />

//       <Stack.Screen
//         name='Lojas'
//         component={Lojas}
//         options={{
//           title: 'Lojas Cadastradas'
//         }}
//       />

//     </Stack.Navigator>

//   )

// }