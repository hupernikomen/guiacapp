import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
  ToastAndroid,
  ActivityIndicator
} from 'react-native';
import { Picker } from "@react-native-picker/picker";

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import { LojaContext } from "../../contexts/lojaContext"
import { ProdutoContext } from '../../contexts/produtoContext';
import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'


import { Input, TituloInput, ContainerInput, SimulaInput, CurrencyInputs, BotaoPrincipal, TextBtn, Tela, BtnIcone } from "../../styles";

import Animated,{ FadeIn, FlipInXDown, RollInLeft, SlideInDown, SlideInUp, StretchInX, ZoomIn } from 'react-native-reanimated';
export default function EditaProduto() {
  const { credenciais } = useContext(LojaContext)
  const { arrTamanhos } = useContext(ProdutoContext)

  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()


  const [modalVisible, setModalVisible] = useState(false);

  const [load, setLoad] = useState(false)

  const [listaCampanha, setListaCampanha] = useState([])

  const [produto, setProduto] = useState({})

  const { width } = Dimensions.get('window')

  useEffect(() => {

    setProduto(route.params)
    BuscaCampanhas()

    navigation.setOptions({
      headerRight: () => {
        return (

          <BtnIcone
            lado={'flex-end'}
            onPress={ConfirmaExclusao}
          >
            <Material name='delete-outline' size={30} color={colors.tema} />
          </BtnIcone>
        )
      }
    })

  }, [])

  useEffect(() => {

    if (produto.oferta === null) setProduto({ ...produto, campanhaID: null });
  },[produto.oferta])


  async function BuscaCampanhas() {
    await api.get('/campanhas/ativas')
      .then((response) => {
        setListaCampanha(response.data)
      })
  }

  async function ConfirmaExclusao() {

    Alert.alert("Excluir Produto", `${route.params?.nome}`, [
      {
        text: "Sim",
        onPress: () => Excluir(route.params?.id, credenciais),
      },
      { text: "Não" },
    ])
  }


  async function Excluir(id, credenciais) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.delete(`/produto?produtoID=${id}`, { headers })
      .then(() => {
        navigation.goBack()
        Toast('Produto excluido com sucesso!')
      })
      .catch((error) => {

      })
  }


  async function Atualizar() {

    if (produto.oferta >= produto.preco) {
      Toast("Oferta maior ou igual ao preço")
      return
    }

    setLoad(true)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/produto?produtoID=${produto.id}`, produto, { headers })
      .then(() => {
        setLoad(false)
        navigation.goBack()
        Toast('Atualizamos seu produto!')
      })
      .catch((error) => {
        setLoad(false)

      })
  }

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


  function RenderItem({ data }) {

    const response = produto.tamanho.indexOf(data)
    return (

      <Pressable
        style={{
          aspectRatio: 1,
          height: (width / 7) - 10,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 4,
          borderRadius: 4,
          backgroundColor: response == -1 ? "#fff" : colors.tema,
          borderWidth: response == -1 ? .5 : 0
        }}
        onPress={() => {
          if (response == -1) {
            const i = produto.tamanho
            setProduto({ ...produto, tamanho: [...i, data] })
          } else {

            let response = produto.tamanho.filter((item) => item != data)
            setProduto({ ...produto, tamanho: response })

          }
        }}>
        <Text style={{ color: response == -1 ? "#000" : '#fff' }}>{data}</Text>
      </Pressable>
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
        style={{paddingVertical:25}}
        showsVerticalScrollIndicator={false}>

        <ContainerInput>

          <TituloInput>
            Produto
          </TituloInput>

          <Input
            value={produto.nome}
            onChangeText={e => setProduto({ ...produto, nome: e })}
          />
        </ContainerInput>

        <ContainerInput>

          <TituloInput>
            Descrição
          </TituloInput>

          <Input
            multiline={true}
            numberOfLines={0}
            verticalAlign={'top'}
            value={produto.descricao}
            onChangeText={e => setProduto({ ...produto, descricao: e })} />
        </ContainerInput>


        <ContainerInput focusable={false}>

          <TituloInput>
            Preço R$ - ( Não editavel )
          </TituloInput>

          <CurrencyInputs value={produto.preco} />

        </ContainerInput>


        <ContainerInput>

          <TituloInput>
            Oferta R$
          </TituloInput>
          <CurrencyInputs

            value={produto.oferta}
            onChangeValue={e => setProduto({ ...produto, oferta: e })} />

        </ContainerInput>


        {!!produto.oferta &&
          <View style={{
            borderWidth: .5,
            borderColor: "#333",
            borderRadius: 55 / 2,
            borderColor: "#777",
            marginVertical: 10,
            minHeight: 55,
            paddingLeft:10
          }}>
            <TituloInput>
              Campanha
            </TituloInput>
            <Picker
              mode="dialog"
              selectedValue={produto.campanhaID}
              onValueChange={(e) => {
                setProduto({ ...produto, campanhaID: e });
              }}>
              <Picker.Item
                label="Nenhum"
                value={null}
              />

              {listaCampanha.map((item) => {
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
       }

        <View>
          <SimulaInput>

            <TituloInput>Tamanhos Disponiveis</TituloInput>
            <FlatList

              ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
              horizontal
              data={produto.tamanho}
              renderItem={({ item }) => <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular', color: "#000" }}>{item}</Text>}
            />

            <Pressable
              onPress={() => setModalVisible(true)}>
              <Text style={{ color: '#000', fontFamily: 'Roboto-Medium' }}>{produto.tamanho?.length > 0 ? 'Editar' : 'Inserir'}</Text>
            </Pressable>
          </SimulaInput>



        </View>

        <BotaoPrincipal
          activeOpacity={1}
          background={colors.tema}
          onPress={Atualizar}>
          {load ? <ActivityIndicator color={'#fff'} /> : <TextBtn cor={'#fff'}>Atualizar</TextBtn>}
        </BotaoPrincipal>


        <View style={{ marginVertical: 15 }} />


      </ScrollView>

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
    </Tela>
  );
}
