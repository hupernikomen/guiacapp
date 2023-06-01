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


import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import { LojaContext } from "../../contexts/lojaContext"
import { ProdutoContext } from '../../contexts/produtoContext';

import api from '../../servicos/api';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'


import { Input, TituloInput, ContainerInput, SimulaInput, BotaoPrincipal, TextBtn, Tela, BtnIcone } from "../../styles";

export default function EditaProduto() {
  const { credenciais } = useContext(LojaContext)
  const { arrTamanhos } = useContext(ProdutoContext)

  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()


  const [modalVisible, setModalVisible] = useState(false);

  const [load, setLoad] = useState(false)

  const [produto, setProduto] = useState({})

  const { width } = Dimensions.get('window')


  console.log('RENDER EDIÇÃO');

  useEffect(() => {

    setProduto(route.params)

    navigation.setOptions({
      headerRight: () => {
        return (

          <BtnIcone
            lado={'flex-end'}
            onPress={ConfirmaExclusao}
          >
            <Material name='delete-outline' size={30} color={'#fff'} />
          </BtnIcone>
        )
      }
    })

  }, [])


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
        ToastExcluiProduto()
      })
      .catch((error) => {

      })
  }


  async function Atualizar() {
    setLoad(true)

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/produto?produtoID=${produto.id}`, produto, { headers })
      .then(() => {
        setLoad(false)
        navigation.goBack()
        ToastAtualizaProduto()
      })
      .catch((error) => {
        setLoad(false)

      })
  }



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

  const ToastExcluiProduto = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Produto excluido com sucesso!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const ToastAtualizaProduto = () => {
    ToastAndroid.showWithGravityAndOffset(
      'Atualizamos seu produto!',
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

        <ContainerInput>

          <TituloInput>
            Produto
          </TituloInput>

          <Input
            value={produto.nome}
            onChangeText={(e) => setProduto({ ...produto, nome: e })}
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
            onChangeText={(e) => setProduto({ ...produto, descricao: e })} />
        </ContainerInput>


        <ContainerInput>

          <TituloInput>
            Preço Inicial - ( Não editavel )
          </TituloInput>

          <Input

            editable={false}
            value={parseFloat(produto.preco).toFixed(2).replace('.', ',')} />
        </ContainerInput>

        <ContainerInput>

          <TituloInput>
            Preço Oferta - R$
          </TituloInput>

          <Input
            value={produto.oferta}
            keyboardType="numeric"
            onChangeText={(e) => setProduto({ ...produto, oferta: e })} />
        </ContainerInput>

        <View>



          <SimulaInput>

            <TituloInput>Tamanhos Disponiveis</TituloInput>
            <FlatList

              ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
              horizontal
              data={produto.tamanho}
              renderItem={({ item }) => <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular', color: "#000" }} >{item}</Text>}
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
