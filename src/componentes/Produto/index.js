import React, { useEffect, useState } from "react";
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

import api from "../../servicos/api";
import { useNavigation,useRoute } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get('window')

export default function ProdutoFeed({ item }) {

  const navigation = useNavigation();
  const {name} = useRoute()

  const [loja, setLoja] = useState([])

  useEffect(() => {

    BuscaLoja()

  }, [])

  async function BuscaLoja() {
    try {
      const { data } = await api.get(`/loja?lojaID=${item.lojaID}`)
      setLoja(data);

    } catch (error) {

    }
  }


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
        loja
      })}
      activeOpacity={1}>
      <View>
        {!!loja.entrega && <Delivery left={!!item.oferta ? 35 : 4} />}
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
        {name === "Home" &&<Text style={styles.nomeloja}>{loja.nome}</Text>}
      </View>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  containerproduct: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 6,
    marginHorizontal: 4,
    maxWidth: (WIDTH / 2) - 12,
    paddingBottom:5
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
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
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
    fontSize: 18,
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
    fontSize: 13,
    fontFamily: 'Roboto-Light',
    color: '#000'
  }

});