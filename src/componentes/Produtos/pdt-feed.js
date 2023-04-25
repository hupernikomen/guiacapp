import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import Delivery from "../Delivery";
import Off from "../Off";
import { formatCurrency } from "react-native-format-currency";

import { useNavigation, useRoute } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get('window')

export default function ProdutoFeed({ item }) {

  const navigation = useNavigation();
  const { name } = useRoute()

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }

  return (

    <TouchableOpacity
      style={styles.containerproduct}
      onPress={() => navigation.navigate("DetalheProduto", {
        item,
      })}
      activeOpacity={1}>
      <View>

        {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
        <Image
          style={styles.imageproduct}
          source={{ uri: item.imagens[0]?.location }} />

      </View>
      <View
        style={styles.containerInfo}>

        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.nome}>
          {item.nome}
        </Text>

        <Text style={styles.real}>{Preco(!!item.oferta ? parseFloat(item.oferta).toFixed(2) : parseFloat(item.preco).toFixed(2))}</Text>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          {name !== "Loja" && <Text numberOfLines={1} lineBreakMode="tail" style={styles.nomeloja}>{item.loja?.nome}</Text>}
          {!!item.loja?.entrega && <Delivery />}

        </View>
      </View>


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerproduct: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 1,
    borderRadius: 2,
    marginHorizontal: 4,
    maxWidth: (WIDTH / 2) - 12,
  },
  containerInfo: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  containerImagem: {
    aspectRatio: 1,
  },
  entrega: {
    borderTopLeftRadius: 4,
  },
  imageproduct: {
    aspectRatio: 1,
  },
  container_preco: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between"
  },
  real: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Roboto-Bold",
  },
  priceoff: {
    padding: 3,
    color: '#fff',
    fontSize: 12
  },
  nome: {
    color: '#000',
    fontFamily: 'Roboto-Light',
    fontSize: 13
  },
  nomeloja: {
    flex:1,
    fontSize: 13,
    fontFamily: 'Roboto-Light',
    color: '#000'
  }


});