import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import Off from "../../etiquetas/Off";
import Delivery from "../../etiquetas/Delivery";

import api from "../../servicos/api";
import { useNavigation,  useTheme } from "@react-navigation/native";
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

export default function ProdutoLoja({ item }) {

  const navigation = useNavigation();
  const { colors } = useTheme()

  const [loja, setLoja] = useState([])

  useEffect(() => {

    BuscaLoja()

  }, [])


  async function BuscaLoja() {
    await api.get(`/usuario?usuarioID=${item.usuarioID}`)
      .then((response) => {
        setLoja(response.data);
      })
  }

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
      formatCurrency({ amount: preco, code: 'BRL' });

    return valueFormattedWithSymbol

  }

  return (
    <TouchableOpacity
      style={styles.containerproduct}
      onPress={() => navigation.navigate("Detalhes", {
        item: item,
        loja: loja
      })}
      activeOpacity={1}>
      <View>
        {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
        <Image
          style={styles.imageproduct}
          source={{ uri: `http://192.168.0.103:3333/files/produtos/${item.imagens[0]?.filename}` }} />
          {/* source={{ uri: `http://192.168.1.3:3333/files/produtos/${item.imagens[0]?.filename}` }} /> */}

      </View>
      <View
        style={styles.containerInfo}>

        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.nome}>
          {item.nome}
        </Text>

        <View style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: 'row'
        }}>

          <Text style={styles.real}>{Preco(!!item.oferta ? item.oferta : item.preco)}</Text>

        </View>

        <View style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5
        }}>

        </View>
      </View>

    </TouchableOpacity>
  );
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  containerproduct: {
    flex: 1,
    padding:2,
    backgroundColor: "#fff",
    elevation: 1,
    borderRadius: 6,
    marginHorizontal: 4,
    maxWidth: (width / 2) - 12,
  },
  containerInfo: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 15,
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
    marginTop: -2,
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
  },
  nomeloja: {
    marginTop:5,
    fontSize: 13,
    fontFamily: 'Roboto-Light',
    color:'#000'
  }

});