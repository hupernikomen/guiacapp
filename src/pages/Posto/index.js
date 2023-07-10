import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import { LojaContext } from "../../contexts/lojaContext"
import api from '../../servicos/api';
import { useTheme, useNavigation } from '@react-navigation/native';

export default function Posto() {

  const { app } = useTheme()
  const [tabela, setTabela] = useState([])
  const [posto, setPosto] = useState([])

  const navigation = useNavigation()

  const { credenciais, Toast, signOut } = useContext(LojaContext)
  useEffect(() => {
    BuscaPosto()
  }, [])

  async function BuscaPosto() {
    await api.get(`/posto?usuarioID=${credenciais.id}`)
      .then((response) => {
        setTabela(JSON.parse(response.data?.tabela))
        setPosto(response.data)
      })
  }

  async function AtualizaTabela() {


    await api.put(`/posto?postoID=${posto.id}`, { tabela: JSON.stringify(tabela) })
      .then((response) => {
        Toast("Preço Atualizado")
      })
      .catch((err) => console.log(err.response))
  }

  function Header() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: app.tema,
        elevation:5,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}>

          <Pressable onPress={() => navigation.openDrawer()} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            width: 45,
            aspectRatio: 1,
          }}>

            <Material name='menu' size={24} color={'#fff'} />

          </Pressable>

          <View style={{
            flex: 1,
            marginRight: 5
          }}>


            <Text numberOfLines={1} lineBreakMode='tail' style={{
              fontFamily: 'Roboto-Medium',
              color: '#fff',
              fontSize: 18,
            }}>
              {posto.nome}
            </Text>

          </View>

        </View>
        <View>
          <View style={{ flexDirection: 'row', gap: 2 }}>

            <Pressable onPress={signOut} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Material name='account-off-outline' size={app.icone} color='#fff' />
            </Pressable>

          </View>
        </View>
      </View>
    )
  }


  return (
    <>
      <Header />
      <View style={{
        marginVertical: 15
      }}>


        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 4,
          paddingHorizontal: 15,
          borderRadius: 99,
          backgroundColor: '#fff'
        }}>
          <Text style={{
            fontSize: 15,
            fontFamily: 'Roboto-Regular',
            color: '#000'
          }}>Gasolina</Text>

          <TextInput style={{
            fontSize: 18,
            fontFamily: 'Roboto-Regular',
            color: '#000',
            flex: 1,
            textAlign: 'right'
          }}
            keyboardType='numeric'
            value={tabela.Gasolina}
            onChangeText={e => setTabela({ ...tabela, Gasolina: e })}
          />
        </View>

        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 4,
          paddingHorizontal: 15,
          borderRadius: 99,
          backgroundColor: '#fff'
        }}>
          <Text style={{
            fontSize: 15,
            fontFamily: 'Roboto-Regular',
            color: '#000'
          }}>Etanol</Text>

          <TextInput style={{
            fontSize: 18,
            fontFamily: 'Roboto-Regular',
            color: '#000',
            flex: 1,
            textAlign: 'right'
          }}
            keyboardType='numeric'
            value={tabela.Etanol}
            onChangeText={e => setTabela({ ...tabela, Etanol: e })}
          />
        </View>

        <View style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 4,
          paddingHorizontal: 15,
          borderRadius: 99,
          backgroundColor: '#fff'

        }}>
          <Text style={{
            fontSize: 15,
            fontFamily: 'Roboto-Regular',
            color: '#000'
          }}>Diesel</Text>

          <TextInput style={{
            fontSize: 18,
            fontFamily: 'Roboto-Regular',
            color: '#000',
            flex: 1,
            textAlign: 'right'
          }}
            keyboardType='numeric'
            value={tabela.Diesel}
            onChangeText={e => setTabela({ ...tabela, Diesel: e })}
          />
        </View>



        <Pressable onPress={AtualizaTabela} style={{
          height: 50,
          alignItems: 'center',
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 15,
          paddingHorizontal: 15,
          borderRadius: 99,
          backgroundColor: app.tema
        }}>
          <Text style={{
            color: '#fff'
          }}>Atualizar</Text>
        </Pressable>
      </View>
    </>
  );
}