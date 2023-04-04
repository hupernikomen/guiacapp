import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

import { useNavigation, useRoute, useIsFocused, useTheme } from '@react-navigation/native';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Detalhes() {

  const navigation = useNavigation()
  const route = useRoute()
  const focus = useIsFocused()

  const [estadoDescricao, setestadoDescricao] = useState(false)

  const { colors } = useTheme()

  const { width } = Dimensions.get('window')

  const [produto, setProduto] = useState([])
  const [loja, setLoja] = useState([])

  useEffect(() => {

    setProduto(route.params?.item)
    setLoja(route.params?.loja)



  }, [focus])


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
              height: width + 100,
            }}
          >

            <Image
              style={{
                flex: 1,
              }}
              source={{ uri: `http://192.168.0.103:3333/files/produtos/${item.filename}` }}
            />

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
                <Text style={styles.preco}>{Preco(parseFloat(produto.oferta).toFixed(2))}
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
                  <Text style={styles.precoantigo}>{Preco(parseFloat(produto.preco).toFixed(2))}</Text>
                </View>
              }

            </View>

            <View style={styles.descricao}>

              <Text style={{color:'#000'}}>Tamanhos:</Text>
              <View style={{ flexDirection: 'row', marginVertical: 10 }}>


                {produto.tamanho?.split(",").map((item, index) => {
                  return (

                    <Text
                      key={index}
                      style={{
                        color: '#000',
                        padding: 5,
                        color: '#fff',
                        borderRadius: 6,
                        marginRight: 5,
                        backgroundColor: colors.vartema
                      }}>
                      {item ? item : "Unico"}
                    </Text>
                  )
                })}
              </View>

              <Text
                activeOpacity={.9}
                onPress={() => setestadoDescricao(!estadoDescricao)}>
                <Text
                  style={{ color: '#000' }}>
                  {produto.descricao}
                </Text>

              </Text>

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
    backgroundColor: '#fff'
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
    marginTop: 15
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
    color: '#000'
  },
  descricao: {
    marginVertical: 15,
    color: "#000",
    fontFamily: 'Roboto-Light'
  },


})