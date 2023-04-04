import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import api from '../../servicos/api';

export default function Servicos() {

  const [servico, setServico] = useState([])

  useEffect(() => {
    BuscaServicos()
  }, [])

  async function BuscaServicos() {
    try {
      const response = await api.get("/servicos")
      setServico(response.data);

    } catch (error) {

    }

  }

  const RenderItem = ({data}) => {
    return(
      <View>
        <Text>{data.nome}</Text>
        <Text>{data.telefone}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={servico}
      renderItem={({ item }) => <RenderItem data={item}/>}
    />
  );
}