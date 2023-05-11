import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, TouchableOpacity, Pressable, Modal, FlatList, Dimensions } from 'react-native';

import { useRoute, useNavigation, useTheme } from '@react-navigation/native';
import { LojaContext } from "../../contexts/lojaContext"
import { ProdutoContext } from '../../contexts/produtoContext';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { Input, TituloInput, ContainerInput, SimulaInput, BotaoPrincipal } from "../../styles";

export default function EditaProduto() {
  const { credenciais, acao } = useContext(LojaContext)
  const { Atualizar, Excluir, arrTamanhos } = useContext(ProdutoContext)

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

  const { width } = Dimensions.get('window')

  useEffect(() => {

    const { cod, nome, descricao, preco, oferta, tamanho, cor, categoriaID, id } = route.params


    setCod(cod)
    setNome(nome)
    setDescricao(descricao)
    setPreco(preco)
    setOferta(oferta)
    setTamanho(tamanho?.sort())
    setCor(cor)
    setCategoriaID(categoriaID)
    setID(id)


    navigation.setOptions({
      title: '' || 'Cod. ' + cod,

      headerRight: () => {

        return (
          <View style={{
            flexDirection: 'row'
          }}>

            <TouchableOpacity
              style={styles.icotopo}
              onPress={ConfirmaExclusao}>

              <Material
                name='delete'
                size={24}
                color={'#fff'} />
            </TouchableOpacity>
          </View>
        )
      }
    })
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
            style={[styles.input,{color:'#aaa'}]}
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
          cor={colors.tema}
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
          {acao ? <ActivityIndicator size={20} color={'#fff'} /> :
            <Text style={styles.txtbtn}>Atualizar</Text>
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

          <View style={{ backgroundColor: "#fff"}}>

            <FlatList
              contentContainerStyle={{ paddingHorizontal: 20,paddingVertical:30, alignItems: 'center' }}
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