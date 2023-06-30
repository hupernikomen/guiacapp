import { useContext, useCallback } from 'react';
import { FlatList, Pressable } from 'react-native';

import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native'

import { LojaContext } from '../../../contexts/lojaContext';
import ProdutoControle from '../../../componentes/Produto-Controle';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import Animated, { SlideInDown } from 'react-native-reanimated';


export default function HomeControle() {

  const { loja, BuscaLoja } = useContext(LojaContext)
  const navigation = useNavigation()
  const { admin } = useTheme()


  useFocusEffect(
    useCallback(() => {
      BuscaLoja()

    }, [])
  )

  return (
    <>


      <FlatList

        data={loja?.produtos}
        columnWrapperStyle={{ marginVertical: 2 }}
        contentContainerStyle={{padding:2}}
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