import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { useNavigation, useRoute, useIsFocused, useTheme } from '@react-navigation/native';
import GestureHandler, { PinchGestureHandler, State, GestureDetector } from 'react-native-gesture-handler';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Detalhes() {

  const navigation = useNavigation()
  const route = useRoute()
  const focus = useIsFocused()

  const [estadoDescricao, setestadoDescricao] = useState(false)

  const { colors, font } = useTheme()

  const { width } = Dimensions.get('window')

  const [produto, setProduto] = useState([])
  const [loja, setLoja] = useState([])

  useEffect(() => {

    setProduto(route.params?.item)
    setLoja(route.params?.loja)


  }, [focus])


  function converteData(data) {

    const datan = new Date(data)
    return datan.toLocaleDateString('pt-BR')

  }

  const [escala, setEscala] = useState(new Animated.Value(1))

  // var escala = new Animated.Value(1)

  const PinchEscala = Animated.event([
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
              height: width,
            }}
          >
            <PinchGestureHandler
              onGestureEvent={PinchEscala}
              onHandlerStateChange={PinchChange}
            >
              <Animated.Image
                style={{
                  flex: 1,
                  transform: [
                    { scale: 1 }
                  ]
                }}
                resizeMode={'contain'}
                source={{ uri: `http://192.168.0.103:3333/files/produtos/${item.filename}` }}
              />
            </PinchGestureHandler>

          </View>
        }
      />

      <View style={styles.containerInfo}>


        <View style={{
          flex: 1,
        }}>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View>

              <Text style={styles.categoria}>Categoria: {produto.categoria?.nome}</Text>
              <Text style={styles.loja}>{loja.nome}</Text>
            </View>

            <View style={{
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                activeOpacity={.8}
                onPress={() => navigation.navigate("Loja", loja)}
                style={{
                  marginRight: 25,
                }}>
                <Material name='storefront-outline' size={28} color='#000' />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={.8}
                onPress={() => { }}
              >
                <Material name='share-variant-outline' size={28} color='#000' />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.nomeproduto}>{produto.nome}</Text>

            <View>
              {!!produto.oferta ?
                <Text style={styles.preco}>{Preco(produto.oferta)}
                  <Text style={{ fontSize: 16 }}>  à vista</Text>
                </Text>
                :
                <Text style={styles.preco}>{Preco(produto.preco)}
                  <Text style={{ fontSize: 16 }}>  à vista</Text>
                </Text>
              }

              {!!produto.oferta &&
                <View style={[styles.secao, { flexDirection: 'row', alignItems: 'center' }]}>
                  <Text>De: </Text>
                  <Text style={styles.precoantigo}>{Preco(produto.preco)}</Text>
                </View>
              }

            </View>

            <View style={styles.descricao}>
              <Text
                style={{ color: '#000' }}

              >Tamanhos: {produto.tamanho}</Text>

              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => setestadoDescricao(!estadoDescricao)}>
                <Text
                  style={{ color: '#000' }}
                  numberOfLines={estadoDescricao ? 0 : 1}>{produto.descricao}
                </Text>

              </TouchableOpacity>

            </View>
          </View>
        </View>

        <View style={{
          flex: 1,
          marginTop: 15
        }}>


          <Text
            style={{ color: '#000' }}

          >Entrega da Loja: <Text>{loja.entrega ? "Sim" : "Não"}</Text></Text>

        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  nomeproduto: {
    fontSize: 24,
    fontFamily: 'Roboto-Bold',
    color: '#000',
    marginTop: 15
  },
  preco: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Roboto-Bold',

  },
  categoria: {
    color: '#000',
    fontFamily: 'Roboto-Regular'

  },
  loja: {
    color: '#000',
    fontFamily: 'Roboto-Regular'
  },
  precoantigo: {
    textDecorationLine: 'line-through',
    color:'#000'
  },
  descricao: {
    marginTop: 15,
    color: "#000",
    fontFamily: 'Roboto-Light'
  },


})