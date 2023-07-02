import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Dimensions, Image } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../servicos/api';
import estilo from './estilo';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

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

  function Capitalize(nome) {
    let novonome = nome.trim().toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0]?.toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
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
        style={[estilo.container, { maxWidth: (WIDTH / 2) - 4 }]}
        onPress={() => navigation.navigate("DetalheProduto", { id })}>

        <View>

          <Image
            style={estilo.imagem}
            source={{ uri: data.avatar.location }} />

          <Text
            style={estilo.nome}
            numberOfLines={1}
            ellipsizeMode={"tail"}>
            {Capitalize(data.nome)}
          </Text>


        </View>

      </Pressable>
    )
  }


  return (
    <FlatList
      data={profissionais}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginVertical: 2 }}
      contentContainerStyle={{ padding: 2 }}
      numColumns={2}
      renderItem={({ item }) => <RenderItem data={item} />}
    />
  );
}