import { memo } from 'react'
import {
  Image,
  Dimensions,
  View,
  Text,
  Pressable
} from "react-native";

import Feather from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from "@react-navigation/native";
import Off from "../Off";

const { width: WIDTH } = Dimensions.get('window')

import estilo from './estilo';

function ProdutoFeed({ item }) {

  const { preco, oferta, campanha, imagens, nome, loja, id } = item

  const navigation = useNavigation();
  const { name } = useRoute()



  // Transforma texto em formato Capitalize ( Primeira Maiuscula e restante minuscula )
  function Capitalize(nome) {
    novonome = nome.trim().toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0]?.toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
  }


  // Recebe valor e converte no formato de moeda
  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (

    <Pressable style={[estilo.container_produto, { maxWidth: (WIDTH / 2) - 6 }]}
      onPress={() => navigation.navigate("DetalheProduto", { id })}>

      <View>

        <Image style={estilo.foto} source={{ uri: imagens[0]?.location }} />

        {campanha?.nome ?
          <View style={{ flexDirection: 'row', position: "absolute", bottom: 0 }}>

            <Text style={[estilo.tag_campanha, { backgroundColor: campanha?.tema }]}>{campanha?.nome}</Text>
            <Off valor={(((preco - oferta) / preco) * 100).toFixed(0)} />

          </View> :

          !!oferta && <Off valor={(((preco - oferta) / preco) * 100).toFixed(0)} />

        }
      </View>

      <View style={estilo.informacoes_do_produto}>
        <Text style={estilo.nome_produto} numberOfLines={1} ellipsizeMode={"tail"}>
          {Capitalize(nome)}
        </Text>

        <Text style={estilo.preco}>
          {formateValor(!!oferta ? oferta : preco)}
        </Text>

        <View style={estilo.container_loja}>

          {name !== "Loja" &&
            <Text style={estilo.nome_loja} numberOfLines={1} lineBreakMode="tail">
              {loja?.nome}
            </Text>
          }

          {loja?.delivery &&
            <Feather name='truck' size={16} color={'#333'} />
          }

        </View>
      </View>
    </Pressable>
  );
}

export default memo(ProdutoFeed)