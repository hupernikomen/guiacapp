import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable, Linking, Image } from 'react-native';

import { useRoute } from '@react-navigation/native'
import api from '../../servicos/api';
import Animated, { FadeInUp } from 'react-native-reanimated';

import styles from './styles';

export default function Vendedores() {
  const route = useRoute()
  const [vendedores, setVendedores] = useState([])


  useEffect(() => {

    async function BuscaVendedores() {
      await api.get(`/vendedores?lojaID=${route.params}`)
        .then((response) => {
          setVendedores(shuffle(response.data));
        })
    }
    BuscaVendedores()

  }, [])


  // Pega o horario dovendedor e converte em um hora calculavel
  const converteHorario = (ponto) => {
    return new Date(ponto).toLocaleTimeString()
  }


  // Função para retornar informação de vendedor
  function StatusVendedor({ horario }) {
    const { e: entrada, a: almoco, r: retorno, s: saida } = JSON.parse(horario)

    const hora_atual = new Date().toLocaleTimeString()

    if (
      hora_atual > converteHorario(entrada) && hora_atual < converteHorario(almoco) ||
      hora_atual > converteHorario(retorno) && hora_atual < converteHorario(saida)) {
      return { status: true, mensagem: "Volto às " + converteHorario(retorno) }
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
      data={vendedores}
      renderItem={({ item }) => <RenderItem data={item} />}
      contentContainerStyle={{ paddingHorizontal: 15 }}
    />
  );
}

