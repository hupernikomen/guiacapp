import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../../servicos/api';

import { useNavigation } from '@react-navigation/native';


export default function CarrosselServicos({ data }) {



  const navigation = useNavigation()
  const [servicos, setServicos] = useState([])

  useEffect(() => {
    BuscaServicos()

  }, [])

  async function BuscaServicos() {
    await api.get('/servicos')
      .then((response) => {
        setServicos(shuffle(response.data))
      })
  }


  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  return (

    <View

      style={{ paddingVertical: 15 }}>
      <Text style={{
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        color: '#000',
        paddingLeft: 15,
        marginBottom: 5
      }}>Serviços</Text>
      <FlatList
        contentContainerStyle={{ gap: 5, paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={servicos}
        renderItem={({ item }) =>
          <Pressable
            onPress={() => navigation.navigate("Profissionais", item)}
            style={{ alignItems: 'center', backgroundColor: '#fff', padding: 24, borderRadius: 6 }}>

            <Material name={item.icone} size={32} color='#000' />

            <View style={{ marginTop: 5 }}>

              <Text style={{ fontFamily: 'Roboto-Regular', color: '#000', fontSize: 14 }}>{item.nome}</Text>
            </View>
          </Pressable>

        }
      />
    </View>
  )
}
