import { memo } from 'react'
import {
  Image,
  View,
  Text,
  Dimensions,
  Pressable
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Off from "../Off";
import estilo from './estilo';

const WIDTH = Dimensions.get('window').width

function ProdutoControle({ item }) {

  const { preco, oferta, campanha, imagens, nome } = item
  const navigation = useNavigation();


  function Capitalize(nome) {
    novonome = nome.trim().toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0]?.toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
  }

  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (

    <Pressable
      style={[estilo.container_produto, { maxWidth: (WIDTH / 2) - 6 }]}
      onPress={() => navigation.navigate("EditaProduto", item)}>
      {!!oferta && <Off valor={(((preco - oferta) / preco) * 100).toFixed(0)} />}
      <View>
        <Image
          style={estilo.foto}
          source={{ uri: imagens[0]?.location }} />

        {campanha?.nome &&
          <Text style={[estilo.tag_campanha, { backgroundColor: campanha?.tema }]}>{campanha?.nome}</Text>
        }
      </View>

      <View style={estilo.informacoes_do_produto}>
        <Text
          style={estilo.nome_produto}
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {Capitalize(nome)}
        </Text>

        <Text
          style={estilo.preco}>
          {formateValor(!!oferta ? oferta : preco)}
        </Text>
      </View>

    </Pressable>
  );
}

export default memo(ProdutoControle)