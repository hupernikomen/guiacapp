import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  FlatList,
} from 'react-native'

import { Input, TituloInput, ContainerInput, BtnIcone, SimulaInput, CurrencyInputs, BotaoPrincipal, TextBtn, Tela } from "../../styles";

import api from '../../servicos/api'
import ImageResizer from '@bam.tech/react-native-image-resizer';

import ImagePicker from 'react-native-image-crop-picker';

import { LojaContext } from "../../contexts/lojaContext"
import { ProdutoContext } from "../../contexts/produtoContext";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function CadastrarProduto() {

  const navigation = useNavigation()

  const { colors } = useTheme()
  const { credenciais } = useContext(LojaContext)
  const { arrTamanhos } = useContext(ProdutoContext)

  const [load, setLoad] = useState(false)
  const [listaCategorias, setListaCategorias] = useState([])

  const [modalVisible, setModalVisible] = useState(false);

  const [preview, setPreview] = useState([])
  const [cod, setCod] = useState("")
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState(null)
  const [descricao, setDescricao] = useState("")
  const [categoria, setCategoria] = useState("")
  const [tamanho, setTamanho] = useState([])


  useEffect(() => {
    CarregaCategorias()
  }, [])

  function SizesFormatted(tams) {
    const sizesDefault = arrTamanhos;
    const array = tams;

    array.sort((firstElement, secondElement) => {
      const positionInDefaultA = sizesDefault.indexOf(firstElement);
      const positionInDefaultB = sizesDefault.indexOf(secondElement);
      return positionInDefaultA - positionInDefaultB;
    });

    return array;
  };

  const Fotografar = () => {
    ImagePicker.openCamera({
      width: 700, height: 900, cropping: true,
      mediaType: 'photo',
      showCropGuidelines: true,
      hideBottomControls: true
    }).then(image => {
      setPreview(img => [...img, image])

    }).catch(() => {
      return
    });
  }

  const BuscarImagem = () => {
    ImagePicker.openPicker({
      width: 700, height: 900, cropping: true,
      mediaType: 'photo',
      showCropGuidelines: true,
      hideBottomControls: true,
    }).then(image => {
      
      setPreview(img => [...img, image])

    }).catch((error) => {
      console.log(error);
      return
    });
  }




  async function CarregaCategorias() {

    await api.get('/categorias')
      .then(({ data }) => {
        setListaCategorias(data)
      })
  }


  async function Postar() {

    if (nome == "" || descricao == "" || preco == null || categoria == "" || preview.length == 0) {
      Toast(`Campo obrigatório: ${nome && "Produto" || !preco && "Preço" || !descricao && "Descrição" || !categoria && "Categoria" || preview.length == 0 && "Imagens"}`)
      return
    }

    setLoad(true)


    const formData = new FormData()

    formData.append('cod', cod)
    formData.append('nome', nome)
    formData.append('descricao', descricao)
    formData.append('preco', preco)
    formData.append('categoriaID', categoria)

    if (tamanho.length > 0) {
      for (let i = 0; i < tamanho.length; i++) {
        formData.append('tamanho', tamanho[i])
      }
    }


    for (let i = 0; i < preview.length; i++) {
      try {
        var result = await ImageResizer.createResizedImage(
          preview[i].path,
          700,
          900,
          'JPEG',
          100,  //verificar a qualidade da foto e mudar se necessario
        );
        formData.append('files', {
          uri: result.uri,
          type: 'image/jpeg',
          name: result.name
        });
      }
      catch (error) {
        console.log(error);
       } // Caso nao tenha sido possivel redimensionar imagem

    }



    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.post(`/produto`, formData, { headers })
      .then(() => {
        navigation.goBack()
        Toast('Produto postado com sucesso!')
        setLoad(false)
      })

      .catch((error) => {
        Toast('Ops.. Algo, deu errado!')
        setLoad(false)
      })
  }


  function RenderItem({ data }) {

    const response = tamanho.indexOf(data)
    return (

      <BtnIcone
        lado={'center'}
        style={{ backgroundColor: response == -1 ? "#fff" : colors.tema, borderRadius: 20 }}
        onPress={() => {
          setTamanho(response == -1 ? itensTam => [...itensTam, data] :
            tamanho.filter((item) => item != data))

        }}>
        <Text style={{ color: response == -1 ? "#000" : '#fff' }}>{data}</Text>
      </BtnIcone>
    )
  }

  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };



  return (

    <Tela>
      <ScrollView
        showsVerticalScrollIndicator={false}>

        {preview.length < 5 &&

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>


            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, gap: 30 }}>
              <Pressable
                style={{ padding: 10, alignItems: 'center' }}
                onPress={Fotografar}>
                <Material name='camera' size={30} />
                <Text>Fotografar</Text>
              </Pressable>
              <Pressable
                style={{ padding: 10, alignItems: 'center' }}
                onPress={BuscarImagem}>
                <Material name='image' size={31} />
                <Text>Galeria</Text>
              </Pressable>
            </View>

          </View>

        }

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: 'center',
          gap: 5,
          marginVertical: 25,
        }}>
          {preview.map((camera, index) => {
            if (index < 5) {

              return (

                <Image
                  key={index}
                  style={{ width: 50, aspectRatio: 1, borderRadius: 6 }}
                  source={{ uri: camera.path }} />
              )
            }
          })}

        </View>


        <ContainerInput>
          <TituloInput>
            Cod. Produto
          </TituloInput>
          <Input
            maxLength={10}
            onChangeText={setCod}
            value={cod} />
        </ContainerInput>

        <ContainerInput>
          <TituloInput>
            Produto
          </TituloInput>
          <Input
            maxLength={100}
            onChangeText={setNome}
            value={nome} />
        </ContainerInput>

        <ContainerInput>

          <TituloInput>
            Preço
          </TituloInput>
          <CurrencyInputs
            value={preco}
            onChangeValue={setPreco} />

        </ContainerInput>

        <ContainerInput>
          <TituloInput>
            Descrição
          </TituloInput>
          <Input
            onChangeText={setDescricao}
            multiline
            value={descricao} />

        </ContainerInput>

        <View style={{
          borderWidth: .5,
          borderColor: "#333",
          borderRadius: 55 / 2,
          borderColor: "#777",
          marginVertical: 8,
          minHeight: 55,
          paddingLeft: 10
        }}>
          <TituloInput>
            Categoria
          </TituloInput>
          <Picker
            mode="dialog"
            selectedValue={categoria}
            onValueChange={(itemValue) => {
              setCategoria(itemValue);
            }}>
            <Picker.Item
              label="Selecione uma categoria"
              style={{
                color: '#aaa',
                fontSize: 15
              }}
            />

            {listaCategorias.map((item) => {
              return (
                <Picker.Item
                  key={item.id}
                  value={item.id}
                  label={item.nome}
                />
              );
            })}
          </Picker>
        </View>


        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          statusBarTranslucent
          onRequestClose={() => setModalVisible(false)}
        >

          <View style={{ flex: 1 }}>

            <Pressable
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
              style={{ flex: 1, backgroundColor: '#00000070' }}>

            </Pressable>

            <View style={{ backgroundColor: "#fff" }}>

              <FlatList
                contentContainerStyle={{ padding: 20, alignItems: 'center' }}
                numColumns={6}
                data={arrTamanhos}
                renderItem={({ item }) => <RenderItem data={item} />}

              />

            </View>


          </View>
        </Modal>

        <SimulaInput>

          <TituloInput>Tamanhos Disponiveis</TituloInput>
          <FlatList
            ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
            horizontal
            data={SizesFormatted(tamanho)}
            renderItem={({ item }) => <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular', color: "#000" }} >{item}</Text>}
          />

          <Pressable
            onPress={() => setModalVisible(true)}>
            <Text style={{ color: '#000', fontFamily: 'Roboto-Medium' }}>{tamanho.length > 0 ? 'Editar' : 'Inserir'}</Text>
          </Pressable>
        </SimulaInput>


        <BotaoPrincipal
          disabled={load}
          background={colors.tema}
          activeOpacity={1}
          onPress={Postar}>
          {load ? <ActivityIndicator color='#fff' /> :
            <TextBtn
              cor={'#fff'}>
              Postar
            </TextBtn>
          }
        </BotaoPrincipal>

      </ScrollView>
    </Tela>
  )
}
