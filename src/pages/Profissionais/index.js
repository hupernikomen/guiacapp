import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Dimensions, Image } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../servicos/api';
import estilo from './estilo';


export default function Profissionais() {

  const { width: WIDTH } = Dimensions.get('window')
  const route = useRoute()
  const navigation = useNavigation()

  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {

    BuscaPorProfissao()
    navigation.setOptions({
      title: route.params?.nome
    })
  }, [])


  async function BuscaPorProfissao() {
    await api.get(`/profissao/profissionais?profissaoID=${route.params?.id}`)
      .then((response) => {
        setProfissionais(shuffle(response.data));
      })
  }

  
  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  function RenderItem({ data }) {
    return (
      <Pressable
      style={[estilo.container_produto]}
        onPress={() => navigation.navigate("DetalheProduto", { id })}>
        <Image
          style={estilo.foto}
          source={{ uri: data?.avatar?.location }} />


        <View style={estilo.info}>
          <Text numberOfLines={2} style={estilo.nome}>{data.nome}</Text>

        </View>

      </Pressable>
    )
  }


  return (
    <FlatList
      data={profissionais}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
  );
}