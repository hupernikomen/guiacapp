import React, { useContext, useState, useCallback } from 'react';
import { View, FlatList, Text, ToastAndroid, ScrollView, Pressable, RefreshControl, } from 'react-native';
import { BtnIcone, BtnCanto } from '../../styles'

import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';
import ProdutoControle from '../../componentes/Pdt-controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import Avatar from '../../componentes/Avatar';

import api from '../../servicos/api';

export default function HomeControle() {

  const { credenciais, signOut } = useContext(LojaContext)
  const navigation = useNavigation()

  const [loja, setLoja] = useState([])

  const { colors } = useTheme()

  const [load, setLoad] = useState(false)

  useFocusEffect(
    useCallback(() => {
      onRefresh()

    }, [])
  )


  const onRefresh = () => {
    BuscaLoja()

  };

  const ToastErro = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  async function BuscaLoja() {
    setLoad(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/me?lojaID=${credenciais.id}`, { headers })
      .then((response) => {

        setLoja(response.data)
        setLoad(false)


      })
      .catch((error) => {
        ToastErro(error.status)
        setLoad(false)
      })

  }



  const options = {
    options: {
      mediaType: 'photo',

    },
  }




  async function Logo() {
    await launchImageLibrary(options, ({ error, didCancel, assets }) => {
      if (error || didCancel) {
        return;
      } else {
        CadastrarLogo(assets[0])
      }
    })
  }




  async function CadastrarLogo(assets) {
    try {
      var result = await ImageResizer.createResizedImage(
        assets.uri,
        200,
        200,
        'JPEG',
        90,
      );

    } catch (error) {
      Alert.alert('Unable to resize the photo');
    }


    const formData = new FormData()

    formData.append('avatar', {
      uri: result.uri,
      type: 'image/jpeg', // ou 'image/png', dependendo do tipo de imagem
      name: result.name
    });

    await api.put(`/loja?lojaID=${credenciais.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(({ data }) => {
        BuscaLoja()

      })
      .catch((error) => {
        console.log("error from image :", error);
      })
  }




  function Header() {
    return (
      <View style={{
        backgroundColor: colors.tema,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: 55,
        height: 55,
        elevation: 5,
        zIndex: 999
      }}>

        <BtnIcone
          lado={'center'}
          onPress={() => navigation.openDrawer()}>
          <Material name='menu' size={24} color={'#fff'} />
        </BtnIcone>

        <Pressable
          style={{
            minWidth: 55,
            width:55,
            aspectRatio:1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10
          }}
          onPress={Logo}>
          <Material name={'pencil-box'} size={18} color='#ECEFF1'
            style={{ position: 'absolute', zIndex: 9, right: 5, bottom: 5 }} />


          <Avatar DATA={loja} WIDTH={40} SIZE={14} />
        </Pressable>


        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontFamily: 'Roboto-Medium',
            fontSize: 20,
            color: '#fff',
          }}>{loja.nome}</Text>


        <BtnIcone
          onPress={signOut}
          lado={'center'}
        >
          <Material name='logout-variant' size={24} color={'#fff'} />
        </BtnIcone>


      </View>
    )
  }


  function CarrosselPaginas() {

    const paginas = [
      {
        nome: 'Dados',
        link: 'CadastrarDados',
      },
      {
        nome: 'Vendedores',
        link: 'VendedoresControle',
      },
      {
        nome: 'Mapa',
        link: 'MapaControle',
      },
    ]



    return (
      <ScrollView
        horizontal
        style={{
          maxHeight: 55,
          minHeight: 55,
          width: '100%',
          backgroundColor: colors.tema,
        }}
      >

        {paginas.map((item, index) => (
          <Pressable
            key={index}
            style={{
              justifyContent: 'center',
              alignItems: "center",
              paddingHorizontal: 5,
              marginHorizontal: 10
            }}
            onPress={() => navigation.navigate(item.link)}
          >
            <Text style={{
              textTransform: 'uppercase',
              fontFamily: 'Roboto-Regular',
              fontSize: 13,
              color: '#fff',
            }}>{item.nome}</Text>
          </Pressable>
        ))}

      </ScrollView>
    )
  }


  return (
    <>

      <Header />
      <CarrosselPaginas />

      <FlatList

        data={loja?.produtos}
        contentContainerStyle={{ marginTop: 4 }}
        columnWrapperStyle={{ margin: 4 }}
        renderItem={({ item }) => <ProdutoControle item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={load}
            onRefresh={onRefresh}
          />
        }
      />

      <BtnCanto
        background={colors.tema}
        lado={'flex-end'}
        onPress={() => navigation.navigate("CadastrarProduto")}>
        <Material name='plus-thick' size={24} color='#fff' />
      </BtnCanto>

    </>
  );
}



