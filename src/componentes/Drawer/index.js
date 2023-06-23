import { useContext } from 'react';
import { Linking, View } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'


import { LojaContext } from '../../contexts/lojaContext';
import estilo from './estilo';

export default function DrawerCustom(props) {

  const { autenticado } = useContext(LojaContext)

  const navigation = useNavigation()

  return (
    <DrawerContentScrollView {...props}>

        {!autenticado ?
          <DrawerItem
            labelStyle={estilo.fonte}
            label="Login"
            inactiveTintColor='#fff'
            onPress={() => navigation.navigate("Signin")}
          /> :
          <DrawerItem
            labelStyle={estilo.fonte}
            label="Minha Loja"
            inactiveTintColor='#fff'
            onPress={() => navigation.navigate("HomeControle")}
          />

        }
      <View style={estilo.paginas}>


        <DrawerItem
          labelStyle={estilo.fonte}
          label="Produtos"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Produtos")}
        />

        <DrawerItem
          labelStyle={estilo.fonte}
          label="Lojas"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Lojas")}
        />
        <DrawerItem
          labelStyle={estilo.fonte}
          label="Serviços"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Servicos")}
        />
        <DrawerItem
          labelStyle={estilo.fonte}
          label="Restaurantes"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Servicos")}
        />


      </View>




      <DrawerItem
        labelStyle={estilo.fonte}
        label="Seja um anunciante"
        inactiveTintColor='#fff'
        onPress={() => navigation.navigate("Anuncie")}
      />
      <DrawerItem
        labelStyle={estilo.fonte}
        label="Fale com o Guia"
        inactiveTintColor='#fff'
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
      />
    </DrawerContentScrollView>
  );
}