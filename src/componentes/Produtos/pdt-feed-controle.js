import {
  Image,
  Text,
  Dimensions,
} from "react-native";

import { formatCurrency } from "react-native-format-currency";
import { useNavigation } from "@react-navigation/native";

import Off from "../Off";

const WIDTH = Dimensions.get('window').width

import { ProdutoContainer, ContainerInfo, Produto, TxtPreco } from "./styles";

export default function ProdutoControle({ item }) {

  const navigation = useNavigation();

  function Preco(preco) {
    if (!preco) return

    const [valueFormattedWithSymbol] = formatCurrency({ amount: preco, code: 'BRL' });
    return valueFormattedWithSymbol
  }


  function Capitalize(nome) {
    novonome = nome.toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0].toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
  }

  return (

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("EditaProduto", item )}
      activeOpacity={.9}>

      {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
      <Image
        style={{ aspectRatio: 1 }}
        source={{ uri: item.imagens[0].location }} />

      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {Capitalize(item.nome)}
        </Produto>

        <TxtPreco>
        {Preco(!!item.oferta ? item.oferta.toFixed(2) : item.preco.toFixed(2))} <Text style={{ fontFamily: 'Roboto-Light', fontSize: 13 }}>à vista</Text>
        </TxtPreco>
      </ContainerInfo>

    </ProdutoContainer>
  );
}