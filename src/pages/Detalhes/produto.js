import { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, ScrollView, Image, Pressable, FlatList } from 'react-native';
import { useNavigation, useRoute,CommonActions } from '@react-navigation/native';

import Pinchable from 'react-native-pinchable';

import api from '../../servicos/api';

import { ProdutoContext } from '../../contexts/produtoContext';

import ProdutoFeed from '../../componentes/Produto-Feed';

import estilo from './estilo'
import Load from '../../componentes/Load';
import Animated, { FadeInRight } from 'react-native-reanimated';


export default function Detalhes() {

  const [load, setLoad] = useState(false)

  const { arrTamanhos } = useContext(ProdutoContext)

  const navigation = useNavigation()
  const route = useRoute()

  const { width: WIDTH } = Dimensions.get('window')

  const [produto, setProduto] = useState([])
  const [produtosPorCategoria, setProdutosPorCategoria] = useState([])



  useEffect(() => {
    PegaItem()

  }, [route])



  if (load) {
    return <Load />
  }



  async function PegaItem() {

    await api.get(`/detalhe/produto?produtoID=${route.params?.id}`)
      .then((response) => {
        if (response.data == null) {
          navigation.navigate("ErroNaoEncontrado")
          return
        }

        setProduto(response.data);
        BuscaProdutoPorCategoria(response.data)
      })
      .catch((error) => {
        console.log('Error Busca Produto Detalhes', error);
      })

  }



  async function BuscaProdutoPorCategoria(item) {
    setLoad(true)

    await api.get(`/produtos/categoria?categoriaID=${item?.categoria?.id}`)
      .then((response) => {
        let arr = response.data?.filter((item) => item.id != route.params?.id)
        setProdutosPorCategoria(arr)
        setLoad(false)

      })
      .catch((error) => {
        console.log('Error BuscaProdutoPorCategoria', error);
        setLoad(false)

      })
  }


  function SizesFormatted(tams) {
    const sizesDefault = arrTamanhos;
    const array = tams;

    array.sort((firstElement, secondElement) => {
      const positionInDefaultA = sizesDefault.indexOf(firstElement);
      const positionInDefaultB = sizesDefault.indexOf(secondElement);
      return positionInDefaultA - positionInDefaultB;
    });

    return array;
  };



  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }



  function RenderProduto() {
    return (
      <View
        showsVerticalScrollIndicator={false}
        style={estilo.pagina}>

        <ScrollView pagingEnabled horizontal style={[estilo.slide_imagens, { width: WIDTH }]} >
          {produto.imagens?.map((item, index) => {
            return (
              <Pinchable key={index} minimumZoomScale={.8} maximumZoomScale={2.9}>
                <Image

                  source={{ uri: item.location }}
                  style={{
                    width: WIDTH,
                    flex: 1,
                    resizeMode: 'contain',
                  }}
                />

              </Pinchable>

            )
          })}
        </ScrollView>

        <Pressable
          style={estilo.container_loja}
          onPress={() => navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Produtos' },
                {
                  name: 'Loja',
                  params: produto?.loja?.usuarioID,
                },
              ],
            })
          )}>
            

          {
            produto?.loja?.avatar &&
            <Image
              style={{ width: 40, aspectRatio: 1, borderRadius: 20 }}
              source={{ uri: produto?.loja?.avatar?.location }} />
          }

          <Animated.View
            entering={FadeInRight.duration(600)}
            style={{ marginLeft: 15 }}>
            <Text
              style={estilo.nome_loja}>{produto.loja?.nome}</Text>

            <Text style={estilo.info_botao_loja}>Acessar página da loja</Text>
          </Animated.View>
        </Pressable>

        <View style={{
          paddingHorizontal: 20,
          marginVertical: 10,
        }}>



          {produto.campanha && <View style={{ position: 'relative', height: 20, marginTop: 15 }}>
            <Text style={{ borderRadius: 4, backgroundColor: '#000000', color: '#fff', paddingHorizontal: 10, paddingVertical: 2, fontSize: 10, position: 'absolute' }}>{produto?.campanha?.nome}</Text>
          </View>}

          <Text style={{ fontFamily: 'Roboto-Light', color: '#000', marginTop: 15 }}>{produto.categoria?.nome}</Text>
          <Animated.Text
            entering={FadeInRight.duration(600).delay(150)}
            style={{
              fontSize: 22,
              fontFamily: 'Roboto-Bold',
              textTransform: 'uppercase',
              color: '#000',
              
            }}>{produto.nome?.trim()}</Animated.Text>

          <Animated.View
            entering={FadeInRight.duration(600).delay(250)}
            style={{
              marginVertical: 20,
            }}
          >
            {!!produto.oferta ?
              <View>
                <Text style={estilo.preco_antigo}>{formateValor(produto.preco)}</Text>

                <Text style={estilo.preco}>{formateValor(produto.oferta)} <Text style={estilo.avista}>à vista</Text></Text>
              </View>
              :

              <Text style={estilo.preco}>{formateValor(produto.preco)} <Text style={estilo.avista}>à vista</Text></Text>
            }

          </Animated.View>


          {produto.tamanho?.length > 0 && <View style={{ flexDirection: 'row' }}>

            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>Tamanhos Disponiveis:</Text>


            {SizesFormatted(produto.tamanho)?.map((item, index) => {
              return (

                <Text
                  key={index}
                  style={{
                    color: '#000',
                    borderRadius: 6,
                    marginLeft: 5,
                  }}>
                  {index != 0 && '- '}{item}
                </Text>
              )
            })}
          </View>}

          <View style={{ marginVertical: 15 }}>

            <Text style={{ fontFamily: 'Roboto-Medium', color: '#000', fontSize:18, marginBottom:5 }}>Descrição do Produto</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000' }}>
              {produto.descricao}
            </Text>
          </View>


        </View>

        {!!produtosPorCategoria.length > 0 &&
          <Text style={{
            fontFamily: 'Roboto-Medium',
            color: '#000',
            fontSize: 18,
            marginTop: 30,
            marginLeft: 20,
            marginVertical: 15
          }}>Outros itens desta categoria</Text>
        }

      </View>
    )
  }

  return (

    <FlatList
      data={produtosPorCategoria}
      renderItem={({ item }) => <ProdutoFeed item={item} />}
      ListHeaderComponent={<RenderProduto />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 2 }}
      columnWrapperStyle={{ marginVertical: 2, gap: 4, paddingHorizontal: 4 }}

      numColumns={2}

    />
  );
}
