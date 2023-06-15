import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, Linking, StyleSheet } from 'react-native';

import {
  useRoute,
  useTheme,
  useNavigation
} from '@react-navigation/native'


const WIDTH = Dimensions.get('window').width

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import estilo from './estilo';

export default function DetalheServico() {
  const route = useRoute()

  const [{ nome, tipoServico, bio, telefone, foto }, setServico] = useState([])
  const [preview, setPreview] = useState(route.params.foto[0].location)


  useEffect(() => {
    setServico(route.params)

  }, [])

  return (
    <ScrollView style={estilo.pagina}>

      <View style={styles.detalheFoto}>
        <Image
          style={{ width: WIDTH, aspectRatio: 1, resizeMode: 'cover'}}
          source={{ uri: preview }}
        />
    
          <FlatList
          horizontal
          contentContainerStyle={{paddingHorizontal:6}}
            data={foto}
            renderItem={({item,index}) =>  
            <Pressable
            key={index}
            onPress={() => setPreview(item.location)}
          >

            <Image
              style={{ width: 70, height: 70, marginVertical: 4, marginHorizontal: 2, borderRadius: 4, resizeMode: 'contain' }}
              source={{ uri: item.location }}
            />
          </Pressable>
          }
          />

      </View>



      <View style={styles.detalhes}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>

            <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 22, color: '#000' }}>{nome}</Text>

            <View style={{ flexDirection: "row", alignItems: 'center' }}>


              {/* {aDomicilio && <Material name='moped' size={28} color='#000' />} */}

              <Pressable
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${telefone}`)}
                style={{ padding: 5, backgroundColor: 'green', borderRadius: 4, marginLeft: 20 }}>

                <Material name='whatsapp' size={28} color='#fff' />
              </Pressable>
            </View>
          </View>

          <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>{tipoServico}</Text>

        </View>

        <Text style={{ fontFamily: 'Roboto-Regular', color: '#000', fontSize:16, marginTop: 20 }}>Sobre</Text>
        <Text style={{fontFamily:'Roboto-Light', color:'#000'}}>{bio}</Text>
      </View>

      <Text style={{
        padding:20,
        height:100,
        marginVertical:30
      }}>Footer Guia Comercial</Text>



    </ScrollView>
  );
}

