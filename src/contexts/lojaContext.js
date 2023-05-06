import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import api from '../servicos/api'
import AsyncStorage from "@react-native-async-storage/async-storage";

import ImageResizer from '@bam.tech/react-native-image-resizer';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";

export const LojaContext = createContext({})

export function LojaProvider({ children }) {

  const navigation = useNavigation()

  const [credenciais, setCredenciais] = useState({
    id: '',
    email: '',
    token: ''
  })

  const [loadBotao, setLoadBotao] = useState(false)
  const [loja, setLoja] = useState([])
  const [loading, setLoading] = useState(true)
  const [previewLogo, setPreviewLogo] = useState("")

  const autenticado = !!credenciais.email

  useEffect(() => {
    CredencialDoUsuario()


  }, [])




  //---------------------------------------------------------------------



  async function CredencialDoUsuario() {
    const credencial = await AsyncStorage.getItem('@authGuiaComercial')

    let _lojastorage = await JSON.parse(credencial || '{}')

    // verifica se tem um user no asyncStorage
    if (Object.keys(credenciais).length > 0) {
      api.defaults.headers.common['Authorization'] = `Bearer ${_lojastorage.token}`

      // Se sim ele lança essa credencial para a state usuario
      setCredenciais({
        id: _lojastorage.id,
        email: _lojastorage.email,
        token: _lojastorage.token
      })

    } else {
      AsyncStorage.clear()
    }

    setLoading(false)
  }



  const options = {
    options: {
      mediaType: 'photo',

    },
  }


  //---------------------------------------------------------------------




  async function Logo() {
    await launchImageLibrary(options, ({ error, didCancel, assets }) => {
      if (error || didCancel) {
        return;
      } else {
        CadastrarLogo(assets[0])
      }
    })
  }




  //---------------------------------------------------------------------



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

    formData.append('logo', {
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
        setPreviewLogo(data?.logo[0]?.location);
      })
      .catch((error) => {
        console.log("error from image :", error);
      })
  }



  //---------------------------------------------------------------------




  async function BuscaLoja() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/loja?lojaID=${credenciais.id}`, { headers })
      .then((response) => {
        setLoja(response.data)
      })
  }



  //---------------------------------------------------------------------





  async function Atualizar(entrega, nome, endereco, bairro, referencia, bio) {

    setLoadBotao(true)

    const formData = new FormData()

    formData.append('entrega', entrega, Blob)
    formData.append('nome', nome || "")
    formData.append('endereco', endereco || "")
    formData.append('bairro', bairro || "")
    formData.append('referencia', referencia || "")
    formData.append('bio', bio || "")

    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/loja?lojaID=${credenciais.id}`, formData, { headers })
      .then(() => {
        setLoadBotao(false)
        Alert.alert("Muito bom...", "Seus dados já foram atualizados")


      })
      .catch((error) => console.error(error.response, "catch Error"))
  }




  //---------------------------------------------------------------------




  async function signIn({ email, senha }) {
    if (!email || !senha) {
      return
    }
    setLoading(true)

    await api.post('/login', { email, senha })
      .then(async (response) => {



        const { id, token } = response.data
        const data = { ...response.data }

        await AsyncStorage.setItem('@authGuiaComercial', JSON.stringify(data))

        //Passar para todas as requisições o token do lojista logado
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setCredenciais({
          id,
          email,
          token,
        })
        navigation.navigate("HomeControle")
        setLoading(false)
      })
      .catch(({ response }) => {
        if (response.status == '503') {
          Alert.alert("Manutenção", "Estamos melhorando as coisas por aqui, volte em alguns instantes...")
        } else {
          Alert.alert("Ops...", response.data?.error)
        }
        setLoading(false)
      })


  }

  async function signOut() {
    await AsyncStorage.clear()
      .then(() => {
        setCredenciais({
          id: '',
          email: '',
          token: ''
        })
      })
  }

  // signOut()

  return (
    <LojaContext.Provider value={{
      credenciais,
      loja,
      autenticado,
      loading,
      loadBotao,
      previewLogo,
      Logo,
      BuscaLoja,
      Atualizar,
      signIn,
      signOut,
    }}>
      {children}
    </LojaContext.Provider>
  )
}