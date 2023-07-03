import React, { createContext, useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import api from '../servicos/api'
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from "@react-navigation/native";

export const LojaContext = createContext({})

export function LojaProvider({ children }) {

  const navigation = useNavigation()

  const [credenciais, setCredenciais] = useState({
    id: '',
    email: '',
    token: '',
    conta:''
  })

  const [load, setLoad] = useState(false)
  const [loja, setLoja] = useState([])

  const autenticado = !!credenciais.email

  useEffect(() => {
    CredencialDoUsuario()

  }, [])


  function RedirecionaLogin(conta) {
    if (conta?.loja) {
      navigation.reset({ index: 0, routes: [{ name: 'HomeControle' }] })
      
    } else if (conta?.profissional) {
      navigation.reset({ index: 0, routes: [{ name: 'Profissional' }] })
    }
  }

  
  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      0,
    );
  };

  function SetLoja(params) {
    setLoja(params)
  }


  

  async function Atualizar() {
    setLoad(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    await api.put(`/loja?usuarioID=${credenciais.id}`, loja, { headers })
      .then(() => {
        Toast('Atualizamos seus dados!')
        BuscaLoja()
        setLoad(false)
      })
      .catch((error) => console.log(error.response, "catch Error"))
  }

  

  async function BuscaLoja() {

    setLoad(true)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }
    await api.get(`/loja/logado?usuarioID=${credenciais.id}`, { headers })
      .then((response) => {

        if (!response.data?.usuario?.status) {
          signOut()
        }

        setLoad(false)
        setLoja(response.data)
      })
      .catch((error) => {
        setLoad(false)
        console.log(error);
      })
  }



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
        token: _lojastorage.token,
        conta: _lojastorage.conta
      })

    } else {
      AsyncStorage.clear()
    }

  }



  async function signIn({ email, senha }) {
    if (!email || !senha) {
      return
    }
    setLoad(true)

    await api.post('/login', { email, senha })
      .then(async (response) => {

        const { id, token, conta } = response.data
        const data = { ...response.data }
        
        await AsyncStorage.setItem('@authGuiaComercial', JSON.stringify(data))
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setCredenciais({
          id,
          email,
          token,
          conta
        })

        RedirecionaLogin(conta)
        setLoad(false)

      })
      .catch(({ response }) => {
        if (response.status == '503') {
          Alert.alert("Manutenção", "Estamos melhorando as coisas por aqui, volte em alguns instantes...")
        } else {
          Toast(response.data?.error)
          
        }
        setLoad(false)
      })

  }

  async function signOut() {

    await AsyncStorage.clear()
      .then(() => {
        setCredenciais({
          id: '',
          email: '',
          token: '',
          conta:''
        })
        // navigation.navigate("HomeFeed")
        navigation.reset({ index: 0, routes: [{ name: 'HomeFeed' }] })
        Toast(('Você foi deslogado'))
      })
  }

  // signOut()

  return (
    <LojaContext.Provider value={{
      credenciais,
      autenticado,
      load,
      loja,
      Toast,
      SetLoja,
      Atualizar,
      BuscaLoja,
      signIn,
      signOut,
    }}>
      {children}
    </LojaContext.Provider>
  )
}