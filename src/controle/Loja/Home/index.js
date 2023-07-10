import { useContext, useEffect, useState,useCallback, useMemo, useRef } from 'react';
import { FlatList, Pressable, View, Text } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native'

import { LojaContext } from '../../../contexts/lojaContext';

import ProdutoControle from '../../../componentes/Produto-Controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { SlideInDown } from 'react-native-reanimated';

import Load from '../../../componentes/Load'

export default function HomeControle() {

  const navigation = useNavigation()
  const { admin, app } = useTheme()

  const { BuscaLoja, load, loja, signOut } = useContext(LojaContext)


  useEffect(() => {
    BuscaLoja() 

  }, [])


  if (load) {
    return <Load />
  }
  
  
  function Header() {
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        backgroundColor: app.tema,
        elevation:5,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1
        }}>

          <Pressable onPress={() => navigation.openDrawer()} style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            width: 45,
            aspectRatio: 1,
          }}>

            <Material name='menu' size={24} color={'#fff'} />

          </Pressable>

          <View style={{
            flex:1,
            marginRight:5,
            marginLeft:10
          }}>


            <Text numberOfLines={1} lineBreakMode='tail' style={{
              fontFamily: 'Roboto-Medium',
              color: '#fff',
              fontSize: 20,
            }}>
              {loja.nome}
            </Text>

          </View>

        </View>
        <View>
          <View style={{ flexDirection: 'row', gap: 2 }}>

            <Pressable onPress={()=>navigation.navigate("CadastrarDados")} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Material name='playlist-edit' size={app.icone} color='#fff' />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("VendedoresControle")} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Material name='face-agent' size={app.icone} color='#fff' />
            </Pressable>
            <Pressable onPress={signOut} style={{
              width: 45,
              aspectRatio: 1,
              alignItems: 'center',
              justifyContent: "center"
            }}>
              <Material name='account-off-outline' size={app.icone} color='#fff' />
            </Pressable>

          </View>
        </View>
      </View>
    )
  }


  return (
    <>
    <Header/>
      <FlatList
        data={loja?.produtos}
        columnWrapperStyle={{ marginVertical: 2, gap: 4 }}
        contentContainerStyle={{ padding: 4 }}
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
          backgroundColor: admin.botao,
          elevation: 5
        }}
      >
        <Pressable
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress={() => navigation.navigate("CadastrarProduto")}>

          <Material name='plus-thick' size={26} color='#fff' />
        </Pressable >
      </Animated.View >

    </>
  );
}