import { useContext } from 'react';
import { Image, Linking, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'


import { LojaContext } from '../../contexts/lojaContext';
import estilo from './estilo';

export default function DrawerCustom(props) {

  const { autenticado, credenciais, signIn } = useContext(LojaContext)

  const navigation = useNavigation()

  return (
    <DrawerContentScrollView {...props}>

      <View
        style={{ height: 100, padding: 15 }}>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>

          <Image
            source={require('../../../assets/imagem/ic_launcher_round.png')} />
          <View>
            <Text style={{
              color: '#fff',
              marginLeft: 15,
              fontSize: 18,
              fontFamily: 'Roboto-Bold'
            }}>Guia Comercial</Text>
            <Text style={{
              color: '#fff',
              marginLeft: 15,
              fontSize: 14,
              fontFamily: 'Roboto-Light'
            }}>Grande Dirceu</Text>
          </View>
        </View>

      </View>

      <DrawerItem
        labelStyle={estilo.fonte}
        label="Login"
        inactiveTintColor='#fff'
        onPress={() => navigation.navigate(autenticado ? "Redireciona" : "Signin")}
      />

      <DrawerItem
        labelStyle={estilo.fonte}
        label="Seja um anunciante"
        inactiveTintColor='#fff'
        onPress={() => navigation.navigate("Anuncie")}
      />

      <View style={estilo.paginas}>
        <DrawerItem
          labelStyle={estilo.fonte}
          label="Feed"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("HomeFeed")}
        />

        <DrawerItem
          labelStyle={estilo.fonte}
          label="Lojas"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Lojas")}
        />

      </View>





      <DrawerItem
        labelStyle={estilo.fonte}
        label="Fale com o Guia"
        inactiveTintColor='#fff'
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
      />
    </DrawerContentScrollView>
  );
}