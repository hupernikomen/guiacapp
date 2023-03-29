import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { useNavigation, useRoute, useIsFocused, useTheme } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Detalhes() {

  const navigation = useNavigation()
  const route = useRoute()
  const focus = useIsFocused()

  const { colors, font } = useTheme()

  const { width } = Dimensions.get('window')

  const [produto, setProduto] = useState([])
  const [loja, setLoja] = useState([])

  useEffect(() => {

    setProduto(route.params?.item)
    setLoja(route.params?.loja)

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={.9}>
          <Material name='share-variant' size={28} color='#fff' />
        </TouchableOpacity>
      )
    })
  }, [focus])


  function converteData(data) {

    const datan = new Date(data)
    return datan.toLocaleDateString('pt-BR')
  }

  const escala = new Animated.Value(1)

  const pinaEscala = Animated.event([
    { nativeEvent: { scale: escala } }
  ], { useNativeDriver: true })

  function PinchChange({ nativeEvent }) {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(escala, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 1
      }).start()
    }
  }

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] =
      formatCurrency({ amount: preco, code: 'BRL' });

    return valueFormattedWithSymbol
  }

  

  return (
    <ScrollView style={styles.tela}>


      <FlatList
        showsHorizontalScrollIndicator={false}
        data={produto.imagens}
        snapToInterval={width}
        horizontal
        renderItem={({ item, index }) =>
          <View
            style={{
              width: width,
              overflow: "hidden",
            }}
          >
            <PinchGestureHandler
              onGestureEvent={pinaEscala}
              onHandlerStateChange={PinchChange}
            >
              <Animated.Image
                style={{
                  width: width,
                  height: width,
                  transform: [
                    { scale: escala }
                  ]
                }}
                source={{ uri: `http://192.168.0.103:3333/files/produtos/${item.filename}` }}
              />
            </PinchGestureHandler>

          </View>
        } />


      <View style={styles.container}>

        <TouchableOpacity
          style={styles.btnloja}
          activeOpacity={.9}
          onPress={() =>
            navigation.navigate('Loja', loja)}>

          <Text style={[styles.secao, {
            color: colors.tema, position: 'absolute', backgroundColor: colors.tema, color: '#fff', paddingVertical: 5,
            paddingHorizontal: 20, borderRadius: 20
          }]}>{loja.nome}</Text>
        </TouchableOpacity>

        <Text style={[styles.nomeproduto, { fontFamily: font.gfp }]}>{produto.nome}</Text>

        {!!produto.oferta ?
          <Text style={[styles.preco, { fontFamily: font.gfp }]}>{Preco(produto.oferta)}
            <Text style={{ fontSize: 16, fontFamily: font.gfp }}>  à vista</Text>
          </Text>
          :
          <Text style={styles.preco}>{Preco(produto.preco)}
            <Text style={{ fontSize: 16, fontFamily: font.gfp }}>  à vista</Text>
          </Text>
        }
      </View>


      <View style={styles.container}>

        {!!produto.oferta &&
          <View style={[styles.secao, { flexDirection: 'row', alignItems: 'center' }]}>
            <Text style={{ fontSize: 16 }}>Preço anterior: </Text>
            <Text style={styles.precoantigo}>{Preco(produto.preco)}</Text>
          </View>
        }

        <Text style={[styles.descricao, styles.secao]}>
          {produto.descricao}
        </Text>

        <View style={styles.secao}>
          <Text style={{ color: "#aaa" }}>postagem: {converteData(produto.createdAt)}</Text>

          {converteData(produto.createdAt) != converteData(produto.updatedAt) &&
            <Text style={{ color: "#aaa" }}>última atualização: {converteData(produto.updatedAt)}</Text>
          }
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    marginVertical: 7
  },
  nomeproduto: {
    fontSize: 24,
    color: '#000',
  },
  preco: {
    color: '#000',
    fontSize: 26,
    fontFamily: 'Roboto-Bold'

  },
  precoantigo: {
    fontSize: 16,
    textDecorationLine: 'line-through'
  },
  descricao: {
    color: "#222",
    fontSize: 16
  },
  btnloja: {
    height: 50
  },

})