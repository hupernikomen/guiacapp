import React, { useEffect, useContext, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { LojaContext } from '../../contexts/lojaContext';

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import ProdutoControle from '../../componentes/Produtos/pdt-feed-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { BtnIcone } from '../../styles'
import {BtnMenu} from './styles'

export default function HomeControle() {

  const { BuscaLoja, loja, signOut, previewLogo, Logo } = useContext(LojaContext)
  const navigation = useNavigation()

  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {

      BuscaLoja()

      return () => {
        setModalVisible(false)
      }
    }, [])
  )

  useEffect(() => {

    navigation.setOptions({
      title: loja.nome || "",
      headerRight: () => (
        <>
          <BtnIcone
            lado={'flex-end'}
            onPress={() => navigation.navigate("CadastrarProduto")}>
            <Material name='plus-thick' size={24} color='#fff' />
          </BtnIcone>

          <BtnIcone
            lado={'flex-end'}
            onPress={() => setModalVisible(true)}>
            <Material name='dots-vertical' size={24} color='#fff' />
          </BtnIcone>
        </>
      ),
      headerLeft: () => (

        loja.logo?.length > 0 &&
        <Image
          source={{ uri: loja.logo[0].location }}
          style={{
            width: 40,
            aspectRatio: 1,
            borderRadius: 20,
            marginRight: 20,
          }}
        />

      )
    })
  }, [loja])

  return (
    <View
      style={styles.tela}>

      <FlatList
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Você não tem nenhum produto postado.</Text>

            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

              <Text style={{ fontFamily: 'Roboto-Light',  marginRight: 5, color: '#000' }}>Para postar clique no botão</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

        <View style={{ flex: 1 }}>

          <TouchableOpacity

            onPress={() => {
              setModalVisible(false)
              BuscaLoja()
            }}
            style={{ flex: 1, backgroundColor: '#00000070' }}>

          </TouchableOpacity>

          <View
            style={{
              backgroundColor: '#fff',
              paddingHorizontal: 15,
              paddingTop: 15,
            }}
          >
            <BtnMenu
              activeOpacity={.9}
              onPress={Logo}
            >
              <Text style={styles.txtmenu}>Alterar Logo</Text>

              <View
                style={styles.preview}>

                {loja.logo?.length > 0 && <Image
                  style={styles.logomenu}
                  source={{ uri: previewLogo || loja.logo[0].location }} />}
              </View>
            </BtnMenu>

            <BtnMenu
              activeOpacity={.9}
              onPress={() => navigation.navigate("CadastrarDados")}>
              <Text style={styles.txtmenu}>Dados</Text>
            </BtnMenu>

            <BtnMenu
              activeOpacity={.9}
              onPress={() => navigation.navigate("VendedoresControle")}>
              <Text style={styles.txtmenu}>Vendedores</Text>
              <Text style={{fontFamily:'Roboto-Light'}}>{loja.vendedores?.length}</Text>
            </BtnMenu>

            <BtnMenu
              activeOpacity={.9}
              onPress={() => navigation.navigate("MapaControle")}>
              <Text style={styles.txtmenu}>Localização</Text>
              {!!loja.latlng &&
                <Text style={{ fontFamily: 'Roboto-Light' }}>Registrado</Text>
              }
            </BtnMenu>

            <BtnMenu
              activeOpacity={.9}
              onPress={signOut}>
              <Text style={styles.txtmenu}>Sair da Loja</Text>

            </BtnMenu>
          </View>

        </View>
      </Modal>
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
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  }
});

