import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
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


import { Input, TituloInput, ContainerInput, SimulaInput, BotaoPrincipal, TextBtn } from "../../styles";

export default function EditaProduto() {
  const { credenciais, acao } = useContext(LojaContext)
  const { arrTamanhos } = useContext(ProdutoContext)

  const route = useRoute()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const [cod, setCod] = useState("")

  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [preco, setPreco] = useState("")
  const [oferta, setOferta] = useState("")
  const [tamanho, setTamanho] = useState("")
  const [cor, setCor] = useState("")
  const [id, setID] = useState("")

  const [categoriaID, setCategoriaID] = useState("")
  const [modalVisible, setModalVisible] = useState(false);

  const [carregando, setCarregando] = useState(false)

  const { width } = Dimensions.get('window')


  useEffect(() => {

    setCod(route.params?.cod)
    setNome(route.params?.nome)
    setDescricao(route.params?.descricao)
    setPreco(route.params?.preco)
    setOferta(route.params?.oferta)
    setTamanho(route.params?.tamanho?.sort())
    setCor(route.params?.cor)
    setCategoriaID(route.params?.categoriaID)
    setID(route.params?.id)

  }, [])


  async function ConfirmaExclusao(e) {

    Alert.alert("Excluir Produto", `${route.params?.nome}`, [
      {
        text: "Sim",
        onPress: () => Excluir(route.params?.id, credenciais),
      },
      { text: "Não" },
    ])
  }


  async function Excluir(id, credenciais) {

    setCarregando(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.delete(`/produto?produtoID=${id}`, { headers })
      .then(() => {
        navigation.goBack()
        setCarregando(false)
        ToastExcluiProduto()
      })
      .catch((error) => {
        setCarregando(false)

      })
  }


  async function Atualizar(nome, descricao, oferta, tamanho, cor, categoriaID, id, credenciais) {
    setCarregando(true)

    if (nome == "" || descricao == "") return

    const produto = {
      nome,
      descricao,
      oferta,
      tamanho,
      cor,
      categoriaID,
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/produto?produtoID=${id}`, produto, { headers })
      .then(() => {
        setCarregando(false)
        ToastAtualizaProduto()
      })
      .catch((error) => {
        setCarregando(false)

      })
  }



  function RenderItem({ data }) {

    const response = tamanho.indexOf(data)
    return (

      <Pressable
        style={{
          aspectRatio: 1,
          height: (width - 40) / 6,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          backgroundColor: response == -1 ? "#fff" : colors.tema,
          borderWidth: response == -1 ? .5 : 0
        }}
        onPress={() => {
          if (response == -1) {
            setTamanho(itensTam => [...itensTam, data]);
          } else {

            let response = tamanho.filter((item) => item != data)

            setTamanho(response);

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
    <>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.tela}>

        <ContainerInput>

          <TituloInput>
            Produto
          </TituloInput>

          <Input
            style={styles.input}
            value={nome}
            onChangeText={setNome}
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
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao} />
        </ContainerInput>



        <ContainerInput>

          <TituloInput>
            Preço Inicial - ( Não editavel )
          </TituloInput>

          <Input

            editable={false}
            style={[styles.input, { color: '#aaa' }]}
            value={parseFloat(preco).toFixed(2).replace('.', ',')}
            onChangeText={setPreco} />
        </ContainerInput>

        <ContainerInput>

          <TituloInput>
            Preço Oferta - R$
          </TituloInput>

          <Input
            style={styles.input}
            value={oferta}
            keyboardType="numeric"
            onChangeText={setOferta} />
        </ContainerInput>

        <View>



          <SimulaInput>

            <TituloInput>Tamanhos Disponiveis</TituloInput>
            <FlatList

              ItemSeparatorComponent={<Text style={{ marginHorizontal: 4 }}>-</Text>}
              horizontal
              data={tamanho}
              renderItem={({ item }) => <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular', color: "#000" }} >{item}</Text>}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(true)}>
              <Text style={{ color: '#000', fontFamily: 'Roboto-Medium' }}>{tamanho?.length > 0 ? 'Editar' : 'Inserir'}</Text>
            </TouchableOpacity>
          </SimulaInput>



        </View>

        <BotaoPrincipal
          activeOpacity={1}
          background={colors.tema}
          onPress={() => Atualizar(
            nome,
            descricao,
            // preco,
            oferta.replace(',', '.'),
            tamanho,
            cor,
            categoriaID,
            id,
            credenciais
          )}>
          {acao ? <ActivityIndicator size={20} color={'#000'} /> :
            <Text style={styles.txtbtn}>Atualizar</Text>
          }
        </BotaoPrincipal>

        <BotaoPrincipal
          disabled={carregando}
          background={colors.tema}
          activeOpacity={1}
          onPress={ConfirmaExclusao}>
          {carregando ? <ActivityIndicator color='#fff' /> :
            <TextBtn
              cor={'#fff'}>
              Excluir
            </TextBtn>
          }
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

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={{ flex: 1, backgroundColor: '#00000070' }}>

          </TouchableOpacity>

          <View style={{ backgroundColor: "#fff" }}>

            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30, alignItems: 'center' }}
              numColumns={6}
              data={arrTamanhos}
              renderItem={({ item }) => <RenderItem data={item} />}

            />

          </View>


        </View>
      </Modal>

    </>
  );
}

const styles = StyleSheet.create({

  tela: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20
  },
  icotopo: {
    marginLeft: 10,
    paddingLeft: 15
  },
  fotoReferencia: {
    width: 50,
    height: 50,
    margin: 2,
    borderRadius: 6
  },
  containerExcluir: {
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 20
  },

  infoinputs: {
    color: '#aaa',
    fontFamily: 'Roboto-Italic',
    marginLeft: 20,
  },

  txtbtn: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: "Roboto-Medium"
  },

  btnmenuitem: {
    paddingVertical: 15
  },

})