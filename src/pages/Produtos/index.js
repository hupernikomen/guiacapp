import { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import Produto from '../../componentes/Produto-Feed';

import { useNavigation } from '@react-navigation/native'
import { Picker } from "@react-native-picker/picker";
import api from '../../servicos/api';
import Load from '../../componentes/Load';

export default function Produtos() {
  const navigation = useNavigation()

  const [load, setLoad] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState("")

  useEffect(() => {

    BuscaProdutos()
    BuscaCategorias()

  }, [])


  if (load) {
    return <Load />
  }

  async function BuscaProdutos() {
    setLoad(true)
    await api.get('/feed')
      .then((response) => {
        setProdutos(shuffle(response.data))
        setLoad(false)
      })
      .catch((error) => { if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") } })
  }

  async function BuscaCategorias() {
    await api.get('/categorias')
      .then((response) => {
        setCategorias(shuffle(response.data))
      })
      .catch((error) => { if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") } })
  }



  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr
  }



  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ marginHorizontal: 4, marginVertical: 4 }}
      ListHeaderComponent={
        <Picker
          mode="dialog"
          selectedValue={categoria}
          onValueChange={(itemValue) => {
            setCategoria(itemValue);
          }}>
          <Picker.Item
            label="Selecione uma categoria"
            style={{
              color: '#aaa',
              fontSize: 15
            }}
          />

          {categorias.map((item) => {
            return (
              <Picker.Item
                key={item.id}
                value={item}
                label={item.nome}
              />
            );
          })}
        </Picker>
      }
      // stickyHeaderHiddenOnScroll={true}
      // stickyHeaderIndices={[0]}
      data={produtos}
      renderItem={({ item }) => <Produto item={item} />}
      numColumns={2}

      refreshControl={
        <RefreshControl
          refreshing={load}
          onRefresh={() => {
            BuscaProdutos()
            BuscaCategorias()

          }}
        />
      }

    />
  )
}