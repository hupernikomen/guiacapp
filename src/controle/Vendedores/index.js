import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Modal, Alert, RefreshControl } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme, useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import ImageResizer from '@bam.tech/react-native-image-resizer';

import { Input, TituloInput, ContainerInput, TextBtn, BotaoPrincipal, MaskInput } from "../../styles";

export default function Vendedores() {

  const { credenciais, loja, BuscaLoja } = useContext(LojaContext)
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [foto, setFoto] = useState([])

  const [modalVisible, setModalVisible] = useState(false);
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    onRefresh()
  }, [])

  useEffect(() => {

    navigation.setOptions({
      headerRight: () => {
        if (loja.vendedores.length < 5) {
          return (

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true)
              }}>
              <Material name='plus-thick' color='#fff' size={28} />
            </TouchableOpacity>
          )
        }
      }
    })

  }, [])


  async function Vendedores(nome, whatsapp, foto) {

    if (nome == '' || whatsapp == '' || whatsapp.length != 15 || foto.length == 0) {
      Alert.alert('Ops...', 'Campos não preenchidos ou invalidos. foto, nome e whatsapp', [
        {
          text: "Tentar Novamente",
          onPress: () => setModalVisible(true),
        }
      ])
      return
    }

    const formData = new FormData()

    formData.append('nome', nome)
    formData.append('whatsapp', whatsapp)

    try {
      var result = await ImageResizer.createResizedImage(
        foto.uri,
        600,
        600,
        'JPEG',
        90,  // verificar a qualidade da foto e mudar se necessario
      );

    } catch (error) { Alert.alert('Não foi possivel redimensionar') } // Caso nao tenha sido possivel redimensionar imagem

    formData.append('fotovendedor', {
      uri: result.uri,
      type: 'image/jpeg',
      name: result.name
    });

    formData.append('lojaID', credenciais.id)

    await api.post('/vendedor', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(() => {
        onRefresh()
        setNome('')
        setWhatsapp('')
        setFoto([])
      })

      .catch((error) => console.log("error from image :", error.response))
  }


  const onRefresh = () => {
    BuscaLoja()
  }

  async function Excluir(id) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.delete(`/vendedor?vendedorID=${id}`, { headers })
      .then(() => {
        BuscaLoja()
      }
      )
      .catch((error) => console.log(error.response))
  }


  const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      mediaType: 'photo',
    },
  }

  async function CapturarImagem(metodo) {

    await metodo(options, ({
      error,
      didCancel,
      assets
    }) => {
      if (error || didCancel) return

      setFoto(assets[0])

    })
  }


  function RenderItem({ data }) {
    return (
      <View
        style={{ flexDirection: "row", alignItems: 'center',backgroundColor:'#fff',borderRadius:6, padding:10 }}>
        <Image
          style={{ width: 55, aspectRatio: 1, borderRadius: 55/2, borderWidth: 3, borderColor: '#ffffff50' }}
          source={{ uri: data.foto[0].location }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',  flex: 1, borderRadius: 6 }}>

          <View style={{marginLeft:10}}>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Vendedor(a): </Text>
            <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{data.nome}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Excluir(data.id)}>
            <Material name='trash-can-outline' size={28} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.tela}>

      <FlatList
        ListEmptyComponent={
          <Text style={{marginTop:40, textAlign: 'center',  color: '#000', fontFamily: 'Roboto-Light' }}>
            Você ainda não cadastrou nenhum vendedor para seu atendimento.
            Cadastre até 5 vendedores
          </Text>
        }
        ItemSeparatorComponent={<View style={{ borderWidth: .5, borderColor: '#ddd' }} />}
        data={loja.vendedores}
        renderItem={({ item }) => <RenderItem data={item} />}
        refreshControl={
          <RefreshControl
            refreshing={carregando}
            onRefresh={onRefresh}
          />
        }
      />



      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>

            <View style={styles.containerbtns}>
              {foto.length == 0 ?
                <>
                  <TouchableOpacity
                    style={styles.btnmenuitem}
                    onPress={() => CapturarImagem(launchImageLibrary)}>
                    <Material name='image-outline' size={30} color='#000' />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btnmenuitem}
                    onPress={() => CapturarImagem(launchCamera)}>
                    <Material name='camera-outline' size={30} color='#000' />
                  </TouchableOpacity>
                </>

                :

                <Image
                  style={{ width: 50, aspectRatio: 1, borderRadius: 25 }}
                  source={{ uri: foto?.uri }}
                />
              }

              <TouchableOpacity
                style={styles.btnmenuitem}
                onPress={() => {
                  setModalVisible(false)
                  setNome('')
                  setWhatsapp('')
                  setFoto([])
                }}>

                <Material name='close-circle-outline' size={30} color='#000' />
              </TouchableOpacity>
            </View>


            <ContainerInput>

              <TituloInput>
                Nome do Vendedor
              </TituloInput>

              <Input
                maxLength={25}
                value={nome}
                onChangeText={setNome} />
            </ContainerInput>

            <ContainerInput>

              <TituloInput>
                Whatsapp
              </TituloInput>

              <View>

                <MaskInput
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}

                  type='cel-phone'
                  value={whatsapp}
                  onChangeText={setWhatsapp}
                />

              </View>
            </ContainerInput>


            <BotaoPrincipal
              cor={colors.tema}
              activeOpacity={1}
              onPress={() => {
                Vendedores(nome, whatsapp, foto)
                setModalVisible(false)
                onRefresh()

              }}>

              <>
                <Material
                  name='content-save'
                  size={24}
                  color={'#fff'} />
                <TextBtn>Cadastrar</TextBtn>
              </>

            </BotaoPrincipal>

          </View>
        </View>
      </Modal>

    </View>
  )
}


const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 10
  },
  containerbtns: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingHorizontal: 20
  },
  btnmenuitem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 40
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal:10,
    paddingVertical: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

})