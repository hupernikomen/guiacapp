import React, { useEffect } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';

import NetInfo from "@react-native-community/netinfo";

import { useNavigation } from '@react-navigation/native';

export default function ErroConexao() {

    useEffect(() => {
        NetInfo.addEventListener(state => {
            if (!state.isConnected) navigation.navigate('ErroConexao')

        });
    })

    function VerificarConexao() {
        NetInfo.fetch().then(state => {
            if(state.isConnected) {

                navigation.navigate('Home')
            }
          });
    }

    const navigation = useNavigation()
 return (
   <View>
    <Text>Erro</Text>

    <TouchableOpacity
    onPress={VerificarConexao}>
<Text>Voltar</Text>        
    </TouchableOpacity>
   </View>
  );
}