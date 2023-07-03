import React, { useEffect, useState, useContext } from 'react';
import {
  View, Text,
  ScrollView,
  Alert,
  Pressable,
  TextInput,
  Modal,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Picker } from "@react-native-picker/picker";

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import { LojaContext } from "../../../contexts/lojaContext"
import { ProdutoContext } from '../../../contexts/produtoContext';
import api from '../../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'


import {
  SimulaInput,
  CurrencyInputs,
  BotaoPrincipal,
  TextBtn,
} from "../../../styles";

import Animated, { SlideInUp } from 'react-native-reanimated';
import estilo from './estilo';

export default function EditaProduto() {
  const { credenciais, BuscaLoja, Toast } = useContext(LojaContext)
  const { arrTamanhos } = useContext(ProdutoContext)

  const route = useRoute()
  const navigation = useNavigation()
  const { admin } = useTheme()


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

          <TouchableOpacity
            onPress={ConfirmaExclusao}
          >
            <Material name='delete-outline' size={30} color={admin.texto} />
          </TouchableOpacity>
        )
      }
    })

  }, [])

  useEffect(() => {

    if (produto.oferta === null) setProduto({ ...produto, campanhaID: null });
  }, [produto.oferta])



  async function BuscaCampanhas() {
    await api.get('/campanhas')
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
        BuscaLoja()
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
        navigation.goBack()
        BuscaLoja()
        Toast('Atualizamos seu produto!')
      })
      .catch((error) => {
        setLoad(false)

      })
  }

  function SizesFormatted(tams) {

    if (!tams) { return }

    const sizesDefault = arrTamanhos;
    const array = tams;

    array.sort((firstElement, secondElement) => {
      const positionInDefaultA = sizesDefault.indexOf(firstElement);
      const positionInDefaultB = sizesDefault.indexOf(secondElement);
      return positionInDefaultA - positionInDefaultB;
    });

    return array;
  };


  function BotoesTamanhos({ data }) {

    const response = produto.tamanho.indexOf(data)
    return (

      <Pressable
        style={[estilo.container_botoes_tamanho, {
          backgroundColor: response == -1 ? "#fff" : admin.tema,
          borderWidth: response == -1 ? .5 : 0,
          height: (width / 7) - 10
        }]}
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



  return (
    <View style={estilo.tela}>

      <ScrollView
        style={{ paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}>

        <View style={estilo.container_input}>

          <Text style={estilo.titulo_input}>
            Produto
          </Text>

          <TextInput
            style={estilo.inputs}
            value={produto.nome}
            onChangeText={e => setProduto({ ...produto, nome: e })}
          />
        </View>

        <View style={estilo.container_input}>

          <Text style={estilo.titulo_input}>
            Descrição
          </Text>

          <TextInput
            style={estilo.inputs}
            multiline={true}
            numberOfLines={0}
            verticalAlign={'top'}
            value={produto.descricao}
            onChangeText={e => setProduto({ ...produto, descricao: e })} />
        </View >


        <View style={estilo.container_input} focusable={false}>

          <Text style={estilo.titulo_input}>
            Preço R$ - ( Não editavel )
          </Text>

          <CurrencyInputs value={produto.preco} />

        </View>


        <View style={estilo.container_input}>

          <Text style={estilo.titulo_input}>
            Oferta R$
          </Text>
          <CurrencyInputs

            value={produto.oferta}
            onChangeValue={e => setProduto({ ...produto, oferta: e })} />

        </View>


        {!!produto.oferta &&
          <View style={{
            borderWidth: .5,
            borderColor: "#333",
            borderRadius: 55 / 2,
            borderColor: "#777",
            marginVertical: 10,
            minHeight: 55,
            paddingLeft: 10
          }}>
            <Text style={estilo.titulo_input}>
              Campanha
            </Text>
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

            <Text style={estilo.titulo_input}>Tamanhos Disponiveis</Text>
            <FlatList

              ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
              horizontal
              data={SizesFormatted(produto?.tamanho)}
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
          background={admin.botao}
          onPress={Atualizar}>
          {load ? <ActivityIndicator color={'#fff'} /> : <TextBtn cor={'#fff'}>Atualizar</TextBtn>}
        </BotaoPrincipal>


        <View style={{ marginVertical: 15 }} />


      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent
        onRequestClose={() => setModalVisible(false)}

      >

        <Animated.View
          entering={SlideInUp}
          style={{ flex: 1 }}>

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
              renderItem={({ item }) => <BotoesTamanhos data={item} />}

            />

          </View>


        </Animated.View>
      </Modal>
    </View>
  );
}
