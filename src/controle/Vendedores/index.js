import React, { useState, useContext, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList, Modal, Alert, RefreshControl } from 'react-native';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme, useNavigation, useRoute } from '@react-navigation/native';

import api from '../../servicos/api';

import ImageResizer from '@bam.tech/react-native-image-resizer';

import { Input, ContainerInput, TituloInput, BtnMais } from './styles'
import { Tela, TextBtn } from '../../styles'

export default function Vendedores() {

  const { credenciais } = useContext(LojaContext)
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [foto, setFoto] = useState([])

  const [vendedores, setVendedores] = useState([])

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    BuscarVendedores()

  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (vendedores.length < 5) {
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
  }, [vendedores])


  async function BuscarVendedores() {
    await api.get(`/vendedores?lojaID=${credenciais.id}`)
      .then((response) => {
        setVendedores(response.data);
      })
  }


  const options = {
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

  async function CriarVendedores() {

    if (!nome || !whatsapp || foto.length == 0) {
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
        'WEBP',
        90,  // verificar a qualidade da foto e mudar se necessario
      );

    } catch (error) { Alert.alert('Não foi possivel redimensionar') } // Caso nao tenha sido possivel redimensionar imagem

    formData.append('foto', {
      uri: result.uri,
      type: 'image/jpeg',
      name: result.name
    });

    await api.post(`/vendedor?lojaID=${credenciais.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(() => {
        BuscarVendedores()
        setNome('')
        setWhatsapp('')
        setFoto([])
      })

      .catch((error) => console.log("error from image :", error.response))
  }


  async function Excluir(id) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }


    Alert.alert("Excluir", "Excluir este vendedor", [
      {
        text: "Sim",
        onPress: async () => {
          await api.delete(`/vendedor?vendedorID=${id}`, { headers })
            .then(() => {
              BuscarVendedores()
            }
            )
            .catch((error) => console.log(error.response))
        },
      },
      { text: "Não" },
    ])
  }




  function RenderItem({ data }) {
    return (
      <View
        style={{ flexDirection: "row", alignItems: 'center', backgroundColor: '#fff', borderRadius: 6, padding: 10, height: 80 }}>
        <Image
          style={{ width: 40, aspectRatio: 1, borderRadius: 40 / 2 }}
          source={{ uri: data.foto[0].location }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, borderRadius: 6 }}>

          <View style={{ marginLeft: 20 }}>
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
    <Tela>

      <BtnMais
        background={colors.tema}
        lado={'flex-end'}
        onPress={CriarVendedores}>
        <Material name='plus-thick' size={24} color='#fff' />
      </BtnMais>

      <FlatList
        ListEmptyComponent={
          <Text style={{ marginTop: 40, textAlign: 'center', color: '#000', fontFamily: 'Roboto-Light' }}>
            Você ainda não cadastrou nenhum vendedor para seu atendimento.
            Cadastre até 5 vendedores
          </Text>
        }
        ItemSeparatorComponent={<View style={{ borderWidth: .5, borderColor: '#ddd' }} />}
        data={vendedores}
        renderItem={({ item }) => <RenderItem data={item} />}
        ListFooterComponent={

          <>

            {foto.length == 0 ?
              <>
                <TouchableOpacity
                  onPress={() => CapturarImagem(launchImageLibrary)}>
                  <Material name='image-outline' size={30} color='#000' />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => CapturarImagem(launchCamera)}>
                  <Material name='camera-outline' size={30} color='#000' />
                </TouchableOpacity>
              </>
              :

              <Image
                style={{ alignSelf: "flex-start", width: 60, aspectRatio: 1, borderRadius: 25 }}
                source={{ uri: foto?.uri }}
              />
            }

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

              <Input
                maxLength={25}
                value={whatsapp}
                onChangeText={setWhatsapp} />

            </ContainerInput>

          </>
        }
      />

    </Tela>
  )
}
