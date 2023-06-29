import { useContext } from 'react';
import { Image, Linking, View, Text, Pressable } from 'react-native';

import { useNavigation,useTheme } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'


import { LojaContext } from '../../contexts/lojaContext';
import estilo from './estilo';

export default function DrawerCustom(props) {

  const { autenticado } = useContext(LojaContext)

  const navigation = useNavigation()
  const {colors} = useTheme()

  return (
    <DrawerContentScrollView {...props}>

      <View
        style={{ height: 100, padding: 15 }}>

        <View style={{ alignItems: 'center', flexDirection: 'row' }}>

          <Image
            source={require('../../../assets/imagem/ic_launcher_round.png')} />

          <Text style={{
            color: '#fff',
            marginLeft: 15,
            fontSize: 16,
            fontFamily: 'Roboto-Medium'
          }}>Guia Comercial {`\n`}Dirceu</Text>
        </View>

      </View>

      {!autenticado ?
        <DrawerItem
          labelStyle={estilo.fonte}
          label="Login"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Signin")}
        /> :
        <DrawerItem
          labelStyle={estilo.fonte}
          label="Parceiros"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Redireciona")}
        />
      }
      
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