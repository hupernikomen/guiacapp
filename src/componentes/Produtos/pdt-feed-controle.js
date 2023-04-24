import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { formatCurrency } from "react-native-format-currency";
import { useNavigation } from "@react-navigation/native";

import Off from "../Off";

const WIDTH = Dimensions.get('window').width

export default function Produto({ item }) {

  const navigation = useNavigation();

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }

  return (

    <TouchableOpacity
      onPress={() => navigation.navigate("EditaProduto", item)}
      activeOpacity={1}
      style={styles.containerproduct}>

      <View style={styles.containerImagem}>
        <View style={styles.etiquetas}>
          {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
          <Image
            style={styles.imageproduct}
            source={{ uri: item.imagens[0].location }} />

        </View>
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
        }}>

          {/* {
            item.oferta &&
            <Text style={{
              textDecorationLine: 'line-through',
              fontSize: 11,
              fontFamily: 'Roboto-Light',
              color: '#222'
            }}>
              {Preco(parseFloat(item.preco).toFixed(2))}
            </Text>
          } */}
          <Text style={styles.real}>
            {Preco(!!item.oferta ? parseFloat(item.oferta).toFixed(2) : parseFloat(item.preco).toFixed(2))}
          </Text>


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
    paddingBottom: 15,
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
    fontSize: 10
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