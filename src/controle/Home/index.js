import { useContext, useState, useCallback, useEffect } from 'react';
import { View, FlatList, Text, ToastAndroid, ScrollView, Pressable, RefreshControl, StatusBar } from 'react-native';
import { BtnIcone } from '../../styles'

import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native'

import { LojaContext } from '../../contexts/lojaContext';
import ProdutoControle from '../../componentes/Produto-Controle';
import Avatar from '../../componentes/Avatar';

import ImageResizer from '@bam.tech/react-native-image-resizer';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { launchImageLibrary } from 'react-native-image-picker';
import Animated, { SlideInDown } from 'react-native-reanimated';

import api from '../../servicos/api';

export default function HomeControle() {

  const { credenciais, loja, BuscaLoja } = useContext(LojaContext)
  const navigation = useNavigation()
  const { colors } = useTheme()

  useFocusEffect(
    useCallback(() => {
      let ativo = true
      BuscaLoja()


      return () => {
        ativo = false
      }
    }, [])
  )



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




  // function Header() {
  //   const paginas = [
  //     {
  //       nome: 'Dados',
  //       link: 'CadastrarDados',
  //     },
  //     {
  //       nome: 'Vendedores',
  //       link: 'VendedoresControle',
  //     },
  //     {
  //       nome: 'Mapa',
  //       link: 'MapaControle',
  //     },
  //   ]
  //   return (
  //     <View style={{
  //       backgroundColor: '#fff',
  //       zIndex: 999

  //     }}>
  //       <View style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         maxHeight: 55,
  //         height: 55,
  //       }}>

  //         <BtnIcone
  //           lado={'center'}
  //           onPress={() => navigation.openDrawer()}>
  //           <Material name='menu' size={24} color={'#000'} />
  //         </BtnIcone>

  //         <Pressable
  //           style={{
  //             minWidth: 55,
  //             width: 55,
  //             aspectRatio: 1,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             marginRight: 10
  //           }}
  //           onPress={Logo}>
  //           <Material name={'pencil-box'} size={18} color='#ECEFF1'
  //             style={{ position: 'absolute', zIndex: 9, right: 5, bottom: 5 }} />

  //           <Avatar DATA={loja} WIDTH={40} SIZE={14} />
  //         </Pressable>

  //         <Text
  //           numberOfLines={1}
  //           style={{
  //             flex: 1,
  //             fontFamily: 'Roboto-Medium',
  //             fontSize: 20,
  //             color: '#000',
  //           }}>{loja.nome}</Text>

  //         <BtnIcone
  //           onPress={signOut}
  //           lado={'center'}
  //         >
  //           <Material name='logout-variant' size={24} color={'#000'} />
  //         </BtnIcone>

  //       </View>

  //       <ScrollView
  //         horizontal
  //         style={{
  //           maxHeight: 55,
  //           height: 55,
  //           width: '100%',
  //           backgroundColor: '#fff',
  //         }}
  //       >
  //         {paginas.map((item, index) => (
  //           <Pressable
  //             key={index}
  //             style={{
  //               justifyContent: 'center',
  //               alignItems: "center",
  //               paddingHorizontal: 5,
  //               marginHorizontal: 10
  //             }}
  //             onPress={() => navigation.navigate(item.link)}
  //           >
  //             <Text style={{
  //               textTransform: 'uppercase',
  //               fontFamily: 'Roboto-Regular',
  //               fontSize: 13,
  //               color: '#000',
  //             }}>{item.nome}</Text>
  //           </Pressable>
  //         ))}

  //       </ScrollView>
  //     </View>

  //   )
  // }

  return (
    <>
      {/* <Header /> */}
      <FlatList

        data={loja?.produtos}
        contentContainerStyle={{ marginTop: 4 }}
        columnWrapperStyle={{ margin: 4 }}
        renderItem={({ item }) => <ProdutoControle item={item} />}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        
      />

      <Animated.View
        entering={SlideInDown.delay(500)}
        style={{
          width: 55,
          aspectRatio: 1,
          borderRadius: 55 / 2,
          position: 'absolute',
          zIndex: 9999,
          right: 15,
          bottom: 25,
          backgroundColor: colors.tema,
          elevation: 5
        }}
      >
        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          background={colors.tema}
          onPress={() => navigation.navigate("CadastrarProduto")}>

          <Material name='plus-thick' size={26} color='#fff' />
        </Pressable >
      </Animated.View >

    </>
  );
}