import { View, Text, FlatList, Pressable } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Feed() {

  const { app } = useTheme()
  const navigation = useNavigation()

  const arr = [
    {
      bandeira: 'Ipiranga',
      nome: "São Raimundo",
      tabela: {
        alcool: 4.80,
        gasolina: 5.29,
        diesel: 4.20
      }
    },
    {
      bandeira: 'BR',
      nome: "BR",
      tabela: {
        alcool: 4.82,
        gasolina: 5.34,
        diesel: 4.30
      }
    },
    {
      bandeira: 'Shell',
      nome: "Shell",
      tabela: {
        alcool: 4.80,
        gasolina: 5.49,
        diesel: 4.32
      }
    },
  ]

  function RenderItem({ data }) {
    return (
      <View style={{ backgroundColor: '#fff', margin: 2, overflow: 'hidden', width: 110, height: 150, borderRadius: 8 }}>

        <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 10 }}>

          <Text style={{ fontFamily: 'Roboto-Medium', color: '#000', marginBottom: 5, flex: 1 }}>
            {data.nome}
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={{ backgroundColor: '#43A047', padding: 2, paddingHorizontal: 5, fontFamily: 'Roboto-Light', color: '#fff', fontSize: 12, marginBottom: -2 }}>G - R$ {Number(data?.tabela?.gasolina).toFixed(2)}</Text>
            <Text style={{ backgroundColor: '', fontFamily: 'Roboto-Light', color: '#000', fontSize: 13, marginBottom: -2 }}>E {Number(data?.tabela?.alcool).toFixed(2)}</Text>
            <Text style={{ backgroundColor: '', fontFamily: 'Roboto-Light', color: '#000', fontSize: 13, marginBottom: -2 }}>D {Number(data?.tabela?.diesel).toFixed(2)}</Text>
          </View>
        </View>
      </View>
    )
  }


  function Header() {
    return (
      <View style={{
        height: 58,
        backgroundColor: app.tema,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>

          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 58,
            width: 58
          }}>
            <Pressable
              onPress={() => navigation.openDrawer()}>
              <Material name='menu' size={24} color={app.texto} />
            </Pressable>
          </View>
          <Text style={{
            fontFamily: 'Roboto-Medium',
            marginLeft: 10,
            color: '#fff',
            fontSize: 20
          }}>Guia Comercial</Text>
        </View>


        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 58,
          width: 58
        }}>
          {/* <Pressable
            style={{ padding: 10 }}
            onPress={() => navigation.navigate("Search")}>
            <Material name='magnify' size={24} color={app.texto} />
          </Pressable> */}

        </View>
      </View>
    )
  }


  return (
    <View>

      <Header />

      <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: '#000', margin: 10 }}>Postos de Combustíveis</Text>
      <FlatList
        snapToInterval={150}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={arr}
        renderItem={({ item }) => <RenderItem data={item} />}
      />
    </View>
  );
}