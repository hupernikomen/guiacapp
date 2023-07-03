import { View, Text, FlatList, Pressable  } from 'react-native';
import { useTheme } from '@react-navigation/native'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Feed() {

  const { app } = useTheme()

  const arr = [
    {
      nome: "Ipiranga",
      tabela: {
        alcool: 4.80,
        gasolina: 5.29,
        diesel: 4.20
      }
    },
    {
      nome: "BR",
      tabela: {
        alcool: 4.82,
        gasolina: 5.34,
        diesel: 4.30
      }
    },
    {
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
      <View style={{ backgroundColor: '#fff', margin: 5, overflow: 'hidden', width: 140, borderRadius: 8, marginBottom: 15 }}>
        <View style={{ height: 80, backgroundColor: '#ddd' }}>

          <Text style={{ position: 'absolute', bottom: -4, right: 4, fontFamily: 'Roboto-Medium', color: '#fff', backgroundColor: '#a82424', fontSize: 11, padding: 3, borderRadius: 4 }}>24h</Text>

        </View>
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>

          <Text style={{ fontFamily: 'Roboto-Medium', color: '#000', marginBottom: 5 }}>
            {data.nome}
          </Text>
          <View>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13, marginBottom: -2 }}>Gasolina: {Number(data?.tabela?.gasolina).toFixed(2)}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13, marginBottom: -2 }}>Álcool: {Number(data?.tabela?.alcool).toFixed(2)}</Text>
            <Text style={{ fontFamily: 'Roboto-Light', color: '#000', fontSize: 13, marginBottom: -2 }}>Diesel: {Number(data?.tabela?.diesel).toFixed(2)}</Text>
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
        elevation:5
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

      <Header/>

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