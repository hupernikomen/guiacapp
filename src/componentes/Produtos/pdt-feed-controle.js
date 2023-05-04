import React from "react";
import {
  Image,
  Dimensions,
} from "react-native";

import { formatCurrency } from "react-native-format-currency";
import { useNavigation } from "@react-navigation/native";

import Off from "../Off";

const WIDTH = Dimensions.get('window').width

import { ProdutoContainer, ContainerInfo, Produto, TxtPreco } from "./styles";

export default function ProdutoControle({ item }) {

  const navigation = useNavigation();

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }

  return (

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("EditaProduto", item)}
      activeOpacity={1}>

      {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
      <Image
        style={{ aspectRatio: 1 }}
        source={{ uri: item.imagens[0].location }} />

      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {item.nome}
        </Produto>

        <TxtPreco>
          {Preco(!!item.oferta ? parseFloat(item.oferta).toFixed(2) : parseFloat(item.preco).toFixed(2))}
        </TxtPreco>
      </ContainerInfo>

    </ProdutoContainer>
  );
}

