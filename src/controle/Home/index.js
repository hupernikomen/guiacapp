import React, { useEffect, useContext, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { LojaContext } from '../../contexts/lojaContext';

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import Produto from '../../componentes/Produtos/pdt-feed-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Home() {

  const { BuscaLoja, loja } = useContext(LojaContext)


  useFocusEffect(
    useCallback(() => {


      let ativo = true
      BuscaLoja()

      return () => {
        ativo = false
      }
    }, [])
  )

  return (
    <View
      style={styles.tela}>

      <FlatList
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontFamily: 'Roboto-Light', fontSize: 16, color: '#000' }}>Você ainda não cadastrou nenhum produto.</Text>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

              <Text style={{ fontFamily: 'Roboto-Light', fontSize: 16, marginRight: 5, color: '#000' }}>Para cadastrar clique no botão</Text>
              <Material name='plus-thick' size={20} color='#000' />

            </View>
          </View>
        }
        data={loja?.produtos}
        contentContainerStyle={{ marginTop: 4 }}
        columnWrapperStyle={{ margin: 4 }}
        renderItem={({ item }) => <Produto item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Text style={{ marginVertical: 20, alignSelf: 'center', fontFamily: 'Roboto-Light', color: '#000' }}>Guia Comercial App</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  btnmenu: {
    paddingLeft: 20,
    marginLeft: 15,
    paddingVertical: 5
  },
  logo: {
    width: 40,
    borderRadius: 40 / 2,
    aspectRatio: 1,

  },
});

