import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, Switch } from 'react-native';
import api from '../../servicos/api';

export default function CategoriasFavoritas() {

  const [categorias, setCategorias] = useState([])
  const [favoritas, setFavoritas] = useState([])

  useEffect(() => {

    BuscaCategorias()


  }, [])

  async function BuscaCategorias() {
    await api.get('/categorias')
      .then((response) => {
        setCategorias(response.data)
      })
  }


  const arr = []

  function TrataFavorito(nome) {
    let achei = arr.indexOf(nome)

    if (achei > -1) {
      arr.splice(achei, 1)

    } else {
      arr.push(...favoritas,nome)
      
    }
    setFavoritas(arr)
    arr=[]
    

    // }else{

    //   console.log("naoachei");
    //   setFavoritas(arr)

    // }

    // }



  }




  function RenderItem({ data }) {


    // if (data._count?.produto === 0) {
    //   return
    // }


    return (
      <View style={{ marginVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>

        <Text
          style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft: 25 }}>
          {data.nome}
        </Text>

        <Switch
          trackColor={{ false: '#767577', true: '#ddd' }}
          thumbColor={'red'}
          onValueChange={(e) => {
            TrataFavorito(data.nome, e)
          }}
          value={{}}
        />
      </View>
    )
  }


  return (
    <>
      <FlatList
        data={categorias}
        renderItem={({ item }) => <RenderItem data={item} />}
      />
    </>
  );
}