import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Pressable, FlatList, Alert } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import { useTheme } from '@react-navigation/native';

import api from '../../servicos/api';


import { Tela, BotaoPrincipal, TextBtn, TituloInput, ContainerInput, Input } from '../../styles'

export default function Vendedores() {

  const { credenciais } = useContext(LojaContext)
  const { colors } = useTheme()

  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [setor, setSetor] = useState("")

  const [vendedores, setVendedores] = useState([])


  useEffect(() => {
    BuscarVendedores()

  }, [])


  async function BuscarVendedores() {
    await api.get(`/vendedores?lojaID=${credenciais.id}`)
      .then((response) => {
        setVendedores(response.data);
      })
  }



  async function CriarVendedores() {

    if (!nome || !whatsapp) {
      Alert.alert('Campos não preenchidos ou invalidos. nome e whatsapp', [
        {
          text: "Tentar Novamente",
          onPress: () => setModalVisible(true),
        }
      ])
      return
    }

    const vendedor = {
      nome,
      whatsapp,
      setor
    }


    await api.post(`/vendedor?lojaID=${credenciais.id}`, vendedor, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(() => {
        BuscarVendedores()
        setNome('')
        setWhatsapp('')
        setSetor('')
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
        style={{ 
          paddingHorizontal: 10, 
          flexDirection: "row", 
          alignItems: 'center', 
          borderRadius: 30, 
          height: 65, 
          margin: 2,
          borderWidth:.5,
          borderColor:'#777'
          }}>


        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, borderRadius: 6 }}>

          <View style={{ marginLeft: 20 }}>
            <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 18 }}>{data.nome}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Setor: {data.setor}</Text>
          </View>
          <Pressable
            style={{ padding: 10 }}
            onPress={() => Excluir(data.id)}>
            <Material name='trash-can-outline' size={24} color={colors.tema} />
          </Pressable>
        </View>
      </View>
    )
  }


  return (
    <Tela>

      <>

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
            Setor
          </TituloInput>

          <Input
            maxLength={25}
            value={setor}
            onChangeText={setSetor} />

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

        <BotaoPrincipal
          onPress={CriarVendedores}
          style={{ marginBottom: 50 }}
          background={colors.tema}
        >

          <TextBtn cor={'#fff'}>
            Cadastrar Vendedor
          </TextBtn>

        </BotaoPrincipal>

      </>

      

      <FlatList
        ListEmptyComponent={
          <Text style={{ marginTop: 40, textAlign: 'center', color: '#000', fontFamily: 'Roboto-Light' }}>
            Você ainda não cadastrou nenhum vendedor para seu atendimento via whatsapp.
          </Text>
        }
        data={vendedores}
        renderItem={({ item }) => <RenderItem data={item} />}
        ListHeaderComponent={
          <Text style={{fontFamily:'Roboto-Medium', fontSize:16, textAlign:"center",color:'#000',marginBottom:15}}>Vendedores Cadastrados</Text>
        }
      />

    </Tela>
  )
}
