import { useState, useContext } from 'react';
import { View, Pressable, Image, Text, Alert } from 'react-native';

import ImageResizer from '@bam.tech/react-native-image-resizer';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import ImagePicker from 'react-native-image-crop-picker'
import DatePicker from 'react-native-date-picker'

import { LojaContext } from '../../contexts/lojaContext';
import { useTheme, useNavigation } from '@react-navigation/native';

import api from '../../servicos/api';

import { BotaoPrincipal, TextBtn, TituloInput, ContainerInput, ContainerInputInline, Input } from '../../styles'

export default function CadastrarVendedor() {

  const { colors } = useTheme()
  const { credenciais } = useContext(LojaContext)
  const navigation = useNavigation()

  const [avatar, setAvatar] = useState([])
  const [nome, setNome] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [setor, setSetor] = useState("")


  const [entrada, setEntrada] = useState(new Date(Date.UTC(2023, 1, 1, 11, 0, 0)))
  const [almoco, setAlmoco] = useState(new Date(Date.UTC(2023, 1, 1, 15, 0, 0)))
  const [retorno, setRetorno] = useState(new Date(Date.UTC(2023, 1, 1, 16, 0, 0)))
  const [saida, setSaida] = useState(new Date(Date.UTC(2023, 1, 1, 20, 0, 0)))

  const [openEntrada, setOpenEntrada] = useState(false)
  const [openAlmoco, setOpenAlmoco] = useState(false)
  const [openRetorno, setOpenRetorno] = useState(false)
  const [openSaida, setOpenSaida] = useState(false)

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

    const horario = {
      e: entrada.getTime(),
      a: almoco.getTime(),
      r: retorno.getTime(),
      s: saida.getTime()
    }

    formData.append("nome", nome)
    formData.append("setor", setor)
    formData.append("whatsapp", whatsapp)
    formData.append("horario", JSON.stringify(horario))

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
    <View style={{ paddingHorizontal: 15 }}>
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
          keyboardType='phone-pad'
          maxLength={25}
          value={whatsapp}
          onChangeText={setWhatsapp} />

      </ContainerInput>

      <ContainerInputInline>

        <Pressable onPress={() => setOpenEntrada(true)} >
          <Text style={{fontFamily:'Roboto-Regular',color:'#000'}}>Entrada</Text>
          <Text>{entrada.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenAlmoco(true)} >
          <Text style={{fontFamily:'Roboto-Regular',color:'#000'}}>Almoço</Text>
          <Text>{almoco.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenRetorno(true)} >
          <Text style={{fontFamily:'Roboto-Regular',color:'#000'}}>Retorno</Text>
          <Text>{retorno.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenSaida(true)} >
          <Text style={{fontFamily:'Roboto-Regular',color:'#000'}}>Saida</Text>
          <Text>{saida.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <DatePicker
          modal
          title='Horário de entrada'
          confirmText='Confirma'
          cancelText='Cancelar'
          minuteInterval={15}
          mode='time'
          open={openEntrada}
          date={entrada}
          onConfirm={(entrada) => {
            setOpenEntrada(false)
            setEntrada(entrada)
          }}
          onCancel={() => {
            setOpenEntrada(false)
          }}
        />

        <DatePicker
          modal
          title='Horário de almoço'
          confirmText='Confirma'
          cancelText='Cancelar'
          minuteInterval={15}
          locale='pt-BR'
          mode='time'
          open={openAlmoco}
          date={almoco}
          onConfirm={(almoco) => {
            setOpenAlmoco(false)
            setAlmoco(almoco)
          }}
          onCancel={() => {
            setOpenAlmoco(false)
          }}
        />

        <DatePicker
          modal
          title='Horário de retorno do almoço'
          confirmText='Confirma'
          cancelText='Cancelar'
          minuteInterval={15}
          mode='time'
          open={openRetorno}
          date={retorno}
          onConfirm={(retorno) => {
            setOpenRetorno(false)
            setRetorno(retorno)
          }}
          onCancel={() => {
            setOpenRetorno(false)
          }}
        />

        <DatePicker
          modal
          title='Horário de saída'
          confirmText='Confirma'
          cancelText='Cancelar'
          minuteInterval={15}
          locale='pt-BR'
          mode='time'
          open={openSaida}
          date={saida}
          onConfirm={(saida) => {
            setOpenSaida(false)
            setSaida(saida)
          }}
          onCancel={() => {
            setOpenSaida(false)
          }}
        />


      </ContainerInputInline>

      <BotaoPrincipal
        onPress={CriarVendedores}
        style={{ marginVertical: 50 }}
        background={colors.tema}
      >

        <TextBtn cor={'#fff'}>
          Cadastrar Vendedor
        </TextBtn>

      </BotaoPrincipal>

    </View>
  );
}