import { useContext } from 'react';
import { Image, Linking, View, Text } from 'react-native';
import estilo from './estilo';

import { useNavigation } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

export default function DrawerCustom(props) {

  const { autenticado } = useContext(LojaContext)
  const navigation = useNavigation()

  return (
    <DrawerContentScrollView {...props}>
      <View style={estilo.container_topo_guia}>

        <Image
          source={require('../../../assets/imagem/ic_launcher_round.png')} />

        <View>
          <Text style={estilo.nome_guia}>Guia Comercial</Text>
          <Text style={estilo.sub_nome}>Grande Dirceu</Text>
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
          onPress={() => navigation.navigate("Produtos")}
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
        onPress={() => Linking.openURL(`https://wa.me/${558694773403}`)}
      />

    </DrawerContentScrollView>
  );
}