import React from 'react';
import { View, Text, Linking, Pressable, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window')

export default function Anuncie() {

  const arr = [
    {
      item: "Lojista",
      tipo: "Assinatura Mensal",
      valor: 7.90,
      imagem: "",
      att: [
        "Página Exclusiva",
        "Atendentes Ilimitados",
        "Produtos Ilimitados",
        "Localização no Maps"
      ],
    },
    {
      item: "Serviços",
      tipo: "Assinatura Mensal",
      valor: 4.90,
      imagem: "",
      att: [
        "1 Atendente",
        "15 Imagens",
        "Localização no Maps",
      ],
    },
    {
      item: "Restaurantes e Pizzarias",
      tipo: "Assinatura Mensal",
      valor: 6.90,
      imagem: "",
      att: [
        "Cardápio",
        "Atendentes Ilimitados",
        "Localização no Maps"
      ],
    },
    {
      item: "Postos de Combustíveis",
      tipo: "Assinatura Mensal",
      valor: null,
      imagem: "",
      att: [
        "Tabela de Preços",
        "Localização no Maps",
      ],
    },


  ]

  function RenderItem({ data }) {

    return (
      <View style={{
        alignItems: 'center',
        justifyContent: "space-between",
        width: width - 120,
        height: 400,
        paddingVertical: 25,
        paddingHorizontal: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 24,
          fontFamily: 'Roboto-Bold',
          color: '#000',
          marginBottom: 15
        }}>{data.item}</Text>

        <View>
          {/* <Image source={{}} style={{}} /> */}
        </View>

        <View style={{ alignSelf: 'center' }}>

          {data.att?.map((item, index) => {
            return <Text key={index} style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Roboto-Light',
              color: '#000'
            }}>{item}</Text>
          })}
        </View>

        {data.valor ?
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              fontFamily: 'Roboto-Black',
              fontSize: 32,
              color: '#000'
            }}>R$ {parseFloat(data.valor).toFixed(2).replace('.', ',')}
            </Text>

            <Text style={{
              fontFamily: 'Roboto-Light',
              color: '#000',
            }}>{data.tipo}
            </Text>
          </View>
          :
          <Text style={{
            fontFamily: 'Roboto-Black',
            fontSize: 28,
            color: '#000'
          }}>Grátis
          </Text>
        }


        <Pressable style={{ backgroundColor: '#f8984e', padding: 10, borderRadius: 8, elevation: 6 }}>
          <Text style={{ color: '#fff' }}>Quero Esse</Text>
        </Pressable>

      </View >
    )
  }

  return (
    <View>

      <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 105}
        contentContainerStyle={{ gap: 15, padding: 15 }}
        data={arr}
        renderItem={({ item }) => <RenderItem data={item} />}
      />
      <View style={{
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 16, textAlign: 'center', color:"#000" }}>
          Assinatura mensal direto na fatura do cartão de crédito
        </Text>
      </View>

    </View>
  );
}
