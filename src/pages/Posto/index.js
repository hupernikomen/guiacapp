import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';


import { LojaContext } from "../../contexts/lojaContext"
import api from '../../servicos/api';
import { useTheme } from '@react-navigation/native';

export default function Posto() {

  const { app } = useTheme()
  const [tabela, setTabela] = useState([])
  const [posto, setPosto] = useState([])

  const { credenciais, Toast } = useContext(LojaContext)
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

  return (
    <View style={{
      marginVertical: 15
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: 15,
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
        marginHorizontal: 15,
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
        marginHorizontal: 15,
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
        marginHorizontal: 15,
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
  );
}