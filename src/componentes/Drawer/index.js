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

      <View style={estilo.paginas}>

        <DrawerItem
          labelStyle={estilo.fonte}
          label="Feed"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Feed")}
        />

        <DrawerItem
          labelStyle={estilo.fonte}
          label="Lojas Cadastradas"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("Lojas")}
        />
        {/* <DrawerItem
                         labelStyle={estilo.fonte}
                    label="Serviços Profissionais"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("Servicos")}
                /> */}


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
          label="Minha Loja"
          inactiveTintColor='#fff'
          onPress={() => navigation.navigate("HomeControle")}
        />

      }


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