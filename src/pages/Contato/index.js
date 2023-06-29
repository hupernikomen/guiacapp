import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable, Linking, Image } from 'react-native';

import { useRoute } from '@react-navigation/native'
import api from '../../servicos/api';
import Animated, { FadeInUp } from 'react-native-reanimated';

import styles from './styles';

export default function Contato() {
  const route = useRoute()
  const [contato, setContato] = useState([])

  useEffect(() => {

    console.log(route.params,"okkokokok");

    async function BuscaContatos() {
      await api.get(`/contatos?usuarioID=${route.params}`)
        .then((response) => {
          setContato(shuffle(response.data));
        })
    }
    BuscaContatos()

  }, [])

  // Pega o horario dovendedor e converte em um hora calculavel
  const converteHorario = (ponto) => {
    return new Date(ponto).toLocaleTimeString()
  }

  // Função para retornar informação de atendimento do vendedor
  function StatusVendedor({ horario }) {
    const { e: entrada, a: almoco, r: retorno, s: saida } = JSON.parse(horario)
    const hora_atual = new Date().toLocaleTimeString()
    const data_atual = new Date().getDay()

    if ( // Condição para horarios de trabalho
      data_atual != 0 && // Domingo
      hora_atual > converteHorario(entrada) && hora_atual < converteHorario(almoco) || // Trabahando de manha
      hora_atual > converteHorario(retorno) && hora_atual < converteHorario(saida)) { // Trabalhando a tarde
      return { status: true, mensagem: "" }

    } else if ( // Condição antes da entrada do vendedor
      data_atual != 0 && // Domingo
      hora_atual > "06:00:00" && hora_atual < converteHorario(entrada)) {
      return { status: false, mensagem: "Entrará às " + converteHorario(entrada).substring(0, 5) + ' hs' }

    } else {
      return { status: false, mensagem: "Fora do horário de atendimento" }
    }
  }

  // Embaralhar Vendedores
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }


  function RenderItem({ data }) {
    const { status, mensagem } = StatusVendedor(data)

    return (
      <Pressable
        style={{
          opacity: status ? 1 : .5,
        }}
        disabled={!status}
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${data.whatsapp}`)}>
        <Animated.View
          entering={FadeInUp}
          style={styles.container_vendedor}>

          <Image
            source={{ uri: data.avatar?.location }}
            style={styles.foto_vendedor} />


          <View style={styles.container_info}>
            <View style={styles.container_nome_info}>

              <Text
                numberOfLines={1}
                style={styles.nome_vendedor}>

                {data.nome}
              </Text>

              <View style={styles.container_status}>

                <View style={[styles.dot_status, { backgroundColor: status ? '#388E3C' : '#aaa' }]} />
                <Text style={[styles.info_status, { color: status ? '#388E3C' : '#aaa' }]}>{status ? 'Online' : 'Off'}</Text>

              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {status ?
                <Text style={styles.setor}>{data.setor}</Text> :
                <Text style={styles.mensagem}>{mensagem}</Text>
              }
            </View>

          </View>

        </Animated.View>
      </Pressable>
    )
  }

  return (
    <FlatList
      data={contato}
      renderItem={({ item }) => <RenderItem data={item} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
}

