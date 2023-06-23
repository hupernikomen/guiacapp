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

    BuscaProProfissao()
    navigation.setOptions({
      title: route.params?.nome
    })
  }, [])


  async function BuscaProProfissao() {
    await api.get(`porprofissao?servicoID=${route.params?.id}`)
      .then((response) => {
        setProfissionais(response.data);
      })
  }

  function RenderItem({ data }) {
    return (
      <Pressable
        style={[estilo.container_produto, { maxWidth: (WIDTH / 2) - 12 }]}
        largura={(WIDTH / 2) - 12}
        onPress={() => navigation.navigate("DetalheProduto", { id })}>
        <View>
          <Image
            style={estilo.foto}
            source={{ uri: data?.avatar?.location }} />

        </View>

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