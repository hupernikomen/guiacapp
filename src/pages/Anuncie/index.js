import React from 'react';
import { View, Text, Linking, Pressable } from 'react-native';

import { Tela } from '../../styles'


export default function Anuncie() {

  const d1 = '2023-06-30';
  const d2 = Date.now();
  const diffInMs = new Date(d1) - new Date(d2)
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  console.log(diffInDays)


  return (

    <View style={{ padding: 15 }}>
      <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 15, color: '#000' }}>

        {
`O App Guia Comercial é uma plataforma de assinatura mensal. E tem o compromisso de aproximar o seu cliente do seu produto.
        
Publique toda a sua loja em nossa plataforma por apenas R$ 8,90 (mensal), e nós levaremos seu produto a toda a região do Grande Dirceu.

Clientes mais próximos, mais chances de conversão.`
}


      </Text>


      <Pressable
        style={{ paddingVertical: 15 }}
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
      >
        <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 15, color: '#000' }}>Fale conosco via whatsapp</Text>
      </Pressable>


    </View>


  );
}
