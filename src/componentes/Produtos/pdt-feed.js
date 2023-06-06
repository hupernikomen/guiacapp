import {
  Image,
  Dimensions,
  View,
  Text
} from "react-native";

import Delivery from "../Delivery";
import Off from "../Off";
import { formatCurrency } from "react-native-format-currency";

import { useNavigation, useRoute } from "@react-navigation/native";

const { width: WIDTH } = Dimensions.get('window')

import { ProdutoContainer, ContainerInfo, Produto, LojaNome, TxtPreco, ContainerLoja } from "./styles";

export default function ProdutoFeed({ item }) {

  console.log(item, "itemmmmm");

  const navigation = useNavigation();
  const { name } = useRoute()

  function Preco(preco) {
    if (!preco) return

    const precoFormatado = parseFloat(preco).toFixed(2)

    const [valueFormattedWithSymbol] = formatCurrency({ amount: precoFormatado, code: 'BRL' });
    return valueFormattedWithSymbol
  }

  function Capitalize(nome) {
    novonome = nome.trim().toLowerCase().split(" ")

    for (let i = 0; i < novonome.length; i++) {
      novonome[i] = novonome[i][0].toUpperCase() + novonome[i].substr(1);
    }

    return novonome.join(" ")
  }

  return (

    <ProdutoContainer
      largura={(WIDTH / 2) - 12}
      onPress={() => navigation.navigate("DetalheProduto", { id: item.id })}
      activeOpacity={.9}>

      {!!item.oferta && <Off valor={(((item.preco - item.oferta) / item.preco) * 100).toFixed(0)} />}
      <View>

        <Image
          style={{ aspectRatio: 1 }}
          source={{ uri: item.imagens[0]?.location }} />

        {item.campanha?.nome &&
          <View style={{ position: 'absolute', bottom: 0, backgroundColor: item.campanha?.tema, paddingVertical: 2, paddingHorizontal: 6 }}>
            <Text style={{ color: '#fff', fontSize: 11 }}>{item.campanha?.nome}</Text>
          </View>
        }
      </View>



      <ContainerInfo>
        <Produto
          numberOfLines={1}
          ellipsizeMode={"tail"}>
          {Capitalize(item.nome)}
        </Produto>

        <TxtPreco>
          {Preco(!!item.oferta ? item.oferta : item.preco)} <Text style={{ fontFamily: 'Roboto-Light', fontSize: 13 }}>à vista</Text>
        </TxtPreco>

        <ContainerLoja>
          {name !== "Loja" && <LojaNome numberOfLines={1} lineBreakMode="tail">{item.loja?.nome}</LojaNome>}
          {item.loja?.entrega && <Delivery />}
        </ContainerLoja>

      </ContainerInfo>

    </ProdutoContainer>
  );
}

