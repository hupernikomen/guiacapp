import {memo} from 'react'
import {
  Image,
  Dimensions,
  View,
  Text
} from "react-native";

import Entrega from "./Entrega";
import Off from "./Off";

import { useNavigation, useRoute } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get('window')

import { ProdutoContainer, ContainerInfo, Produto, LojaNome, TxtPreco, ContainerLoja } from "./styles";

function ProdutoFeed({ item }) {

  const { preco, oferta, campanha, imagens, nome, loja } = item

  const navigation = useNavigation();
  const { name } = useRoute()


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

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("DetalheProduto", { id: item.id })}
      activeOpacity={.9}>

      {!!oferta && <Off valor={(((preco - oferta) / preco) * 100).toFixed(0)} />}
      <View>

        <Image
          style={{ aspectRatio: 1, borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
          source={{ uri: imagens[0]?.location }} />

        {campanha?.nome &&
          <Text style={{
            position: 'absolute',
            bottom: -1,
            left: -1,
            borderRadius: 2,
            backgroundColor: campanha?.tema,
            paddingVertical: 2,
            paddingHorizontal: 4,
            color: '#fff',
            fontSize: 11
          }}>{campanha?.nome}</Text>
        }
      </View>



      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {Capitalize(nome)}
        </Produto>

        <TxtPreco>
          {formateValor(!!oferta ? oferta : preco)}
        </TxtPreco>

        <ContainerLoja>
          {name !== "Loja" && <LojaNome numberOfLines={1} lineBreakMode="tail">{loja?.nome}</LojaNome>}
          {loja?.entrega && <Entrega />}
        </ContainerLoja>

      </ContainerInfo>

    </ProdutoContainer>
  );
}

export default memo(ProdutoFeed)