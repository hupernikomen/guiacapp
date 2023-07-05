import { useState, useContext } from 'react';
import { View, Pressable, Image, Text, TextInput } from 'react-native';

import ImageResizer from '@bam.tech/react-native-image-resizer';

import Feather from 'react-native-vector-icons/Feather'

import ImagePicker from 'react-native-image-crop-picker'
import DatePicker from 'react-native-date-picker'

import { LojaContext } from '../../contexts/lojaContext';
import { useTheme, useNavigation } from '@react-navigation/native';

import api from '../../servicos/api';

import estilo from './estilo';


export default function CadastrarContato() {

  const { app } = useTheme()
  const { credenciais, Toast } = useContext(LojaContext)
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


  async function CriaContato() {

    if (!nome || !whatsapp || avatar.length == 0 || entrada >= almoco || almoco >= retorno || retorno >= saida) {
      Toast("Cadastro incompleto ou inválido")
      return
    }


    const horario = {
      e: entrada.getTime(),
      a: almoco.getTime(),
      r: retorno.getTime(),
      s: saida.getTime()
    }


    const formData = new FormData()
    formData.append("nome", nome)
    formData.append("whatsapp", whatsapp)
    formData.append("setor", setor)
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

    await api.post(`/contato?usuarioID=${credenciais.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${credenciais.token}`
      }
    })
      .then(() => {
        navigation.goBack()

        Toast("Vendedor Cadastrado")
        setNome('')
        setWhatsapp('')
        setSetor('')
      })

      .catch((error) => console.log("Erro ao cadastrar contato Vendedor :", error.response))
  }


  return (
    <View style={{ paddingHorizontal: 15 }}>

      <Pressable style={estilo.container_foto} onPress={BuscarImagem}>
        {avatar.length == 0 ?
          <Feather name='user' size={36} />
          :
          <Image source={{ uri: avatar?.path }}
            style={estilo.foto} />
        }
      </Pressable>


      <View style={estilo.container_inputs}>

        <Text style={estilo.titulo_inputs}>
          Nome do Vendedor
        </Text>

        <TextInput style={estilo.input} maxLength={25} value={nome} onChangeText={setNome} />

      </View>

      <View style={estilo.container_inputs}>

        <Text style={estilo.titulo_inputs}>
          Setor
        </Text>

        <TextInput style={estilo.input} maxLength={25} value={setor} onChangeText={setSetor} />

      </View>

      <View style={estilo.container_inputs}>

        <Text style={estilo.titulo_inputs}>
          Whatsapp
        </Text>

        <TextInput style={estilo.input} keyboardType='phone-pad' maxLength={25} value={whatsapp} onChangeText={setWhatsapp} />

      </View>

      <View style={estilo.container_horarios}>

        <Pressable onPress={() => setOpenEntrada(true)} >
          <Text style={estilo.horario}>Entrada</Text>
          <Text>{entrada.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenAlmoco(true)} >
          <Text style={estilo.horario}>Almoço</Text>
          <Text>{almoco.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenRetorno(true)} >
          <Text style={estilo.horario}>Retorno</Text>
          <Text>{retorno.toLocaleTimeString().substring(0, 5)}</Text>
        </Pressable>

        <Pressable onPress={() => setOpenSaida(true)} >
          <Text style={estilo.horario}>Saida</Text>
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


      </View>

      <Pressable
        onPress={CriaContato}
        style={[estilo.btn_cadastrar, { backgroundColor: app.tema }]}
      >

        <Text style={estilo.txt_botao}>
          Cadastrar Contato
        </Text>

      </Pressable>

    </View>
  );
}