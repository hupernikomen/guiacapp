import React, { useEffect, useContext, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, Text, Image, ActivityIndicator, Modal, ToastAndroid } from 'react-native';

import { useNavigation, useIsFocused, useTheme,useFocusEffect } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';

import api from '../../servicos/api';

import ProdutoControle from '../../componentes/Produtos/pdt-feed-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { BtnMais } from './styles'

export default function HomeControle() {

  const { credenciais } = useContext(LojaContext)
  const navigation = useNavigation()
  const focus = useIsFocused()

  const [loja, setLoja] = useState([])

  const { colors } = useTheme()

  const [carregando, setCarregando] = useState(false)

  console.log("Render Home Controle");


  useFocusEffect(
    useCallback(() => {

      BuscaLoja()

    }, [])
  )


  const ToastErro = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function BuscaLoja() {
    setCarregando(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/me?lojaID=${credenciais.id}`, { headers })
      .then((response) => {
        setLoja(response.data)
        setCarregando(false)
      })
      .catch((error) => {
        ToastErro(error.status)
        setCarregando(false)
      })

  }



  if (carregando) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={30} color={colors.tema} />
      </View>
    )
  }




  return (
    <View

      style={styles.tela}>

      <BtnMais
        background={colors.tema}
        lado={'flex-end'}
        onPress={() => navigation.navigate("CadastrarProduto")}>
        <Material name='plus-thick' size={24} color='#fff' />
      </BtnMais>

      <FlatList
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Você não tem nenhum produto postado.</Text>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

              <Text style={{ fontFamily: 'Roboto-Light', marginRight: 5, color: '#000' }}>Para postar clique no botão</Text>
              <Material name='plus-thick' size={20} color='#000' />

            </View>
          </View>
        }
        data={loja?.produtos}
        contentContainerStyle={{ marginTop: 4 }}
        columnWrapperStyle={{ margin: 4 }}
        renderItem={({ item }) => <ProdutoControle item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={loja.produtos?.length > 6
          && <Text style={{ marginVertical: 20, alignSelf: 'center', fontFamily: 'Roboto-Light', color: '#000' }}>
            Guia Comercial App
          </Text>}

      />


      {/* 
            <BtnMenu
              activeOpacity={.9}
              onPress={Logo}
            >
              <Text style={styles.txtmenu}>Alterar Logo</Text>

              <View
                style={styles.preview}>

                {loja.logo?.length > 0 && <Image
                  style={styles.logomenu}
                  source={{ uri: previewLogo || loja.logo[0]?.location }} />}
              </View>
            </BtnMenu> */}


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
  preview: {
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: 'center',
    width: 40,
    borderRadius: 20,
    borderWidth: .5,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  logomenu: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
  },

  txtmenu: {
    color: '#000',
    fontFamily: "Roboto-Regular"
  }
});

