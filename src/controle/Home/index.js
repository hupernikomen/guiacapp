import React, { useEffect, useContext, useCallback, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { LojaContext } from '../../contexts/lojaContext';

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import Produto from '../../componentes/Produtos/pdt-feed-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

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
      headerRight: () => (
        <>
          <TouchableOpacity style={{ marginLeft: 10, width: 35, aspectRatio: 1, alignItems: 'flex-end', justifyContent: 'center' }}
            onPress={() => navigation.navigate("CadastrarProduto")}>
            <Material name='plus-thick' size={26} color='#fff' />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 10, width: 35, aspectRatio: 1, alignItems: 'flex-end', justifyContent: 'center' }}
            onPress={() => setModalVisible(true)}>
            <Material name='dots-vertical' size={26} color='#fff' />
          </TouchableOpacity>
        </>
      ),
      headerLeft: () => (

        loja?.logo?.length > 0 && <Image
          source={{ uri: loja.logo[0].location }}
          style={{
            width: 38,
            aspectRatio: 1,
            borderRadius: 20,
            marginRight: 10,
            borderWidth: .5,
            borderColor: '#fff',
            backgroundColor: '#fff',
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

      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}

      >
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
              paddingTop:15,
            }}
          >
            <TouchableOpacity
              activeOpacity={.9}
              style={styles.btnmenu}
              onPress={Logo}
            >
              <Text style={styles.txtmenu}>Alterar Logo</Text>

              <View
                style={styles.preview}>

                {loja?.logo?.length > 0 &&<Image
                style={styles.logomenu}
                source={{ uri: previewLogo || loja.logo[0].location}} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
            activeOpacity={.9}
            style={styles.btnmenu}
            onPress={() => navigation.navigate("CadastrarDados")}>
              <Text style={styles.txtmenu}>Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.9}
                style={styles.btnmenu}
                onPress={() => navigation.navigate("VendedoresControle")}>
              <Text style={styles.txtmenu}>Vendedores</Text>
              {/* <Text style={{fontFamily:'Roboto-Light'}}>{loja.vendedores.length}</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={.9}
                style={styles.btnmenu}
                onPress={() => navigation.navigate("MapaControle")}>
              <Text style={styles.txtmenu}>Localização</Text>
              {!!loja.latlng &&
                <Text style={{ fontFamily: 'Roboto-Light' }}>Registrado</Text>
              }
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={.9}
              style={styles.btnmenu}
              onPress={signOut}>
              <Text style={styles.txtmenu}>Sair da Loja</Text>

            </TouchableOpacity>
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
  btnmenu: {
    width: '100%',
    height: 55,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: .5
  },
  txtmenu: {
    color: '#000',
    fontSize: 16,
    fontFamily: "Roboto-Regular"
  }
});

