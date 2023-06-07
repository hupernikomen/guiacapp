import {
  Image,
  Text,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import Off from "./Off";

const WIDTH = Dimensions.get('window').width

import { ProdutoContainer, ContainerInfo, Produto, TxtPreco } from "./styles";

export default function ProdutoControle({ item }) {

  const { preco, oferta, campanha, imagens, nome } = item
  const navigation = useNavigation();

 
  function Capitalize(nome) {
    novonome = nome.trim().toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0]?.toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
  }

  const formateValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  return (

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("EditaProduto", item)}
      activeOpacity={.9}>

      {!!oferta && <Off valor={(((preco - oferta) / preco) * 100).toFixed(0)} />}
      <Image
          style={{ aspectRatio: 1, borderTopLeftRadius:4, borderTopRightRadius:4 }}
          source={{ uri: imagens[0]?.location }} />

        {campanha?.nome &&
          <Text style={{ 
            position: 'absolute', 
            bottom: 0, 
            backgroundColor: campanha?.tema, 
            paddingVertical: 2, 
            paddingHorizontal: 4, 
            margin:2,
            borderRadius: 6,
            color: '#fff', 
            fontSize: 11 
          }}>{campanha?.nome}</Text>
        }

      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {Capitalize(nome)}
        </Produto>

        <TxtPreco>
          {formateValor(!!oferta ? oferta : preco)} <Text style={{ fontFamily: 'Roboto-Light', fontSize: 13 }}>à vista</Text>
        </TxtPreco>
      </ContainerInfo>

    </ProdutoContainer>
  );
}