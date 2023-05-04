import React from "react";
import {
  Image,
  Dimensions,
} from "react-native";

import Delivery from "../Delivery";
import Off from "../Off";
import { formatCurrency } from "react-native-format-currency";

import { useNavigation, useRoute } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get('window')

import { ProdutoContainer, ContainerInfo, Produto, LojaNome, TxtPreco, ContainerLoja } from "./styles";

export default function ProdutoFeed({ item }) {

  const navigation = useNavigation();
  const { name } = useRoute()

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }

  return (

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("DetalheProduto", { item })}
      activeOpacity={1}>

      {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
      <Image
        style={{ aspectRatio: 1 }}
        source={{ uri: item.imagens[0]?.location }} />

      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {item.nome}
        </Produto>

        <TxtPreco>
          {Preco(!!item.oferta ? parseFloat(item.oferta).toFixed(2) : parseFloat(item.preco).toFixed(2))}
        </TxtPreco>

        <ContainerLoja>
          {name !== "Loja" && <LojaNome numberOfLines={1} lineBreakMode="tail">{item.loja?.nome}</LojaNome>}
          {!!item.loja?.entrega && <Delivery />}
        </ContainerLoja>

      </ContainerInfo>

    </ProdutoContainer>
  );
}
