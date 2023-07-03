import { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Pressable,Image } from 'react-native';

import { useTheme } from '@react-navigation/native';

import ImageResizer from '@bam.tech/react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';

import { LojaContext } from '../../contexts/lojaContext';
import estilo from './estilo';
import {
  BotaoPrincipal,
  TextBtn,
} from "../../styles";
import api from '../../servicos/api';

export default function Profissional() {

  const { admin } = useTheme()
  const { credenciais, Toast } = useContext(LojaContext)
  const [load, setLoad] = useState(false)


  const [profissional, setProfissional] = useState([])

  useEffect(() => {
    BuscaProfissional()
  }, [])


  async function BuscaProfissional() {
    await api.get('/profissional')
      .then((response) => {
        setProfissional(response.data)
      })
  }


  const options = {
    options: {
      mediaType: 'photo',

    },
  }

  async function Avatar() {
    await launchImageLibrary(options, ({ error, didCancel, assets }) => {
      if (error || didCancel) {
        return;
      } else {
        AtualizarAvatar(assets[0])
      }
    })
  }


  async function AtualizarAvatar(assets) {
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

    await api.put(`/profissional?usuarioID=${credenciais.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then((response) => {
        BuscaProfissional()

      })
      .catch((error) => {
        console.log("error from image :", error);
      })
  }


  async function Atualizar() {

    setLoad(true)


    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/profissional?usuarioID=${credenciais.id}`, profissional, { headers })
      .then(() => {
        setLoad(false)
        Toast('Atualizamos seu produto!')
      })
      .catch((error) => {
        console.log(error);
        setLoad(false)

      })
  }

  return (
    <View style={estilo.tela}>

<View style={{marginTop: 15}}>
  

      <Pressable
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 25
        }}
        onPress={Avatar}>
        <Text
          style={{
            fontFamily: 'Roboto-Regular',
            fontSize: 13,
            backgroundColor: '#fff',
            borderRadius: 10,
            marginLeft: 15,
            color: '#000',
            paddingHorizontal: 10,
          }}>Foto</Text>

        <View style={{
          width: 60,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          aspectRatio: 1,
          borderRadius: 60 / 2,
          borderColor: '#fff',
          borderWidth: 4
        }}>

          {profissional?.avatar && <Image
              source={{ uri: profissional?.avatar?.location }}
              style={{ width: 52, aspectRatio: 1 }}
            />}
        </View>
      </Pressable>


      <View style={estilo.container_input}>

        <Text style={estilo.titulo_input}>
          Nome
        </Text>

        <TextInput
          style={estilo.inputs}
          value={profissional.nome}
          onChangeText={e => setProfissional({ ...profissional, nome: e })}
        />
      </View>
      <View style={estilo.container_input}>

        <Text style={estilo.titulo_input}>
          Sobre
        </Text>

        <TextInput
          style={estilo.inputs}
          multiline
          value={profissional.bio}
          onChangeText={e => setProfissional({ ...profissional, bio: e })}
        />
      </View>
      <View style={estilo.container_input}>

        <Text style={estilo.titulo_input}>
          Endereço
        </Text>

        <TextInput
          style={estilo.inputs}
          value={profissional.endereco}
          onChangeText={e => setProfissional({ ...profissional, endereco: e })}
        />
      </View>

      <BotaoPrincipal
        activeOpacity={1}
        background={admin.botao}
        onPress={Atualizar}>
        {load ? <ActivityIndicator color={'#fff'} /> : <TextBtn cor={'#fff'}>Atualizar</TextBtn>}
      </BotaoPrincipal>

</View>

    </View >
  );
}