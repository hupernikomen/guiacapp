import React, { useContext, useCallback, useState } from 'react';
import { View, Text, Switch, ScrollView, ToastAndroid, Pressable, Image } from 'react-native';
import { LojaContext } from "../../contexts/lojaContext"

import { useNavigation, useTheme, useFocusEffect } from '@react-navigation/native'
import ImageResizer from '@bam.tech/react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';

import api from '../../servicos/api';

import { Input, TituloInput, ContainerInput, BotaoPrincipal, TextBtn, Tela } from "../../styles";

export default function CadastrarDados() {
  const { colors } = useTheme()
  const { credenciais, BuscaLoja, loja } = useContext(LojaContext)
  const navigation = useNavigation()


  const selecaoEntrega = e => setLoja({ ...loja, entrega: e });


  useFocusEffect(
    useCallback(() => {
      let ativo = true
      BuscaLoja()


      return () => {
        ativo = false
      }
    }, [])
  )


  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };



  const options = {
    options: {
      mediaType: 'photo',

    },
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
      .then(() => {
        BuscaLoja()

      })
      .catch((error) => {
        console.log("error from image :", error);
      })
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


  async function Atualizar() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/loja`, loja, { headers })
      .then(() => {
        navigation.navigate('Home')
        Toast('Atualizamos seus dados!')
      })
      .catch((error) => console.log(error.response, "catch Error"))
  }




  return (
    <Tela>

      <ScrollView
        style={{ paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}
      >


        <Pressable
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 25
          }}
          onPress={Logo}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 13,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginLeft: 15,
              color: '#000',
              paddingHorizontal: 10,
            }}>Logo</Text>


          {loja?.avatar && <Image
            source={{ uri: loja?.avatar?.location }}
            style={{ width: 55, aspectRatio: 1, borderRadius: 55 / 2, borderColor: '#fff', borderWidth: 4 }}
          />}
        </Pressable>

        <ContainerInput>
          <TituloInput>
            Nome da Loja
          </TituloInput>

          <Input

            value={loja.nome}
            onChangeText={(e) => setLoja({ ...loja, nome: e })}
            maxLength={25} />
        </ContainerInput>

        <ContainerInput>
          <TituloInput>
            Endereço
          </TituloInput>

          <Input
            multiline numberOfLines={0}
            verticalAlign={'top'}
            onChangeText={(e) => setLoja({ ...loja, endereco: e })}
            value={loja.endereco}
            maxLength={50} />
        </ContainerInput>

        <ContainerInput>
          <TituloInput>
            Bairro
          </TituloInput>

          <Input
            onChangeText={(e) => setLoja({ ...loja, bairro: e })}
            value={loja.bairro}
            maxLength={40} />
        </ContainerInput>

        <ContainerInput>
          <TituloInput>
            Ponto de Referencia
          </TituloInput>

          <Input
            onChangeText={(e) => setLoja({ ...loja, referencia: e })}
            value={loja.referencia}
            maxLength={40} />
        </ContainerInput>


        <ContainerInput>
          <TituloInput>
            Sobre
          </TituloInput>

          <Input
            multiline numberOfLines={0}
            verticalAlign={'top'}
            maxLength={200}
            onChangeText={(e) => setLoja({ ...loja, bio: e })}
            value={loja.bio}
          />
          <Text
            style={{ alignSelf: "flex-end", marginRight: 15 }}>
            {loja.bio?.length || '0'}/200
          </Text>

        </ContainerInput>


        <View style={{ marginVertical: 30, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>

          <Text
            style={{ color: '#222', fontFamily: "Roboto-Regular", fontSize: 16, marginLeft: 25 }}>
            Entregas
          </Text>

          <Switch
            trackColor={{ false: '#767577', true: '#ddd' }}
            thumbColor={loja.entrega ? colors.tema : '#f4f3f4'}
            onValueChange={selecaoEntrega}
            value={loja.entrega}
          />
        </View>


        <BotaoPrincipal
          activeOpacity={1}
          background={colors.tema}
          onPress={Atualizar}>

          <TextBtn cor={'#fff'}>Atualizar</TextBtn>
        </BotaoPrincipal>

        <View style={{ marginVertical: 15 }} />

      </ScrollView>
    </Tela>

  );
}

