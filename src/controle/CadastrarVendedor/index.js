import { useState,useContext } from 'react';
import { View, Pressable,Image } from 'react-native';

import ImageResizer from '@bam.tech/react-native-image-resizer';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import ImagePicker from 'react-native-image-crop-picker'

import { LojaContext } from '../../contexts/lojaContext';
import { useTheme,useNavigation } from '@react-navigation/native';

import api from '../../servicos/api';

import { Tela, BotaoPrincipal, TextBtn, TituloInput, ContainerInput, Input } from '../../styles'

export default function CadastrarVendedor() {

  const { colors } = useTheme()
  const { credenciais } = useContext(LojaContext)
  const navigation = useNavigation()

  const [avatar, setAvatar] = useState([])
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [setor, setSetor] = useState("")


  const BuscarImagem = () => {
    ImagePicker.openPicker({
      width: 300, height: 300, cropping: true,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      showCropGuidelines: true,
      hideBottomControls: true

    }).then(image => {
      setAvatar(image)

    }).catch(() => {
      return
    });
  }

  async function CriarVendedores() {

    if (!nome || !whatsapp) {
      Alert.alert('Campos não preenchidos ou invalidos. nome e whatsapp', [
        {
          text: "Tentar Novamente",
          onPress: () => setModalVisible(true),
        }
      ])
      return
    }

    const formData = new FormData()
    formData.append("nome", nome)
    formData.append("setor", setor)
    formData.append("whatsapp", whatsapp)

    var result = await ImageResizer.createResizedImage(
      avatar.path,
      300,
      300,
      'JPEG',
      80,  //verificar a qualidade da foto e mudar se necessario
    );
    formData.append('avatar', {
      uri: result.uri,
      type: 'image/jpeg',
      name: result.name
    });

    await api.post(`/vendedor?lojaID=${credenciais.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(() => {
        navigation.goBack()
        setNome('')
        setWhatsapp('')
        setSetor('')
      })

      .catch((error) => console.log("error from image :", error.response))
  }


  return (
    <View>
      <Pressable
        style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', width: 70, aspectRatio: 1, borderRadius: 70 / 2, elevation: 5, alignSelf: 'center', marginVertical: 20 }}
        onPress={BuscarImagem}>
        {avatar.length == 0 ?
          <Material name='account-circle' size={36} />
          :
          <Image source={{ uri: avatar?.path }}
            style={{ width: 70, aspectRatio: 1, borderRadius: 70 / 2, borderColor: '#fff', borderWidth: 4 }} />
        }
      </Pressable>

      <ContainerInput>

        <TituloInput>
          Nome do Vendedor
        </TituloInput>

        <Input
          maxLength={25}
          value={nome}
          onChangeText={setNome} />

      </ContainerInput>

      <ContainerInput>

        <TituloInput>
          Setor
        </TituloInput>

        <Input
          maxLength={25}
          value={setor}
          onChangeText={setSetor} />

      </ContainerInput>
      <ContainerInput>

        <TituloInput>
          Whatsapp
        </TituloInput>

        <Input
          maxLength={25}
          value={whatsapp}
          onChangeText={setWhatsapp} />

      </ContainerInput>

      <BotaoPrincipal
        onPress={CriarVendedores}
        style={{ marginBottom: 50 }}
        background={colors.tema}
      >

        <TextBtn cor={'#fff'}>
          Cadastrar Vendedor
        </TextBtn>

      </BotaoPrincipal>
    </View>
  );
}