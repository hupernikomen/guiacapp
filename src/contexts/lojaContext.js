import { createContext, useState, useEffect } from "react";
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
  
  // Exibe mensagens de retorno de execução de comandos
  const Toast = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      0,
    );
  };


  // Usado para armazenar em state informações da LOJA da tela Dados
  function SetLoja(params) {
    setLoja(params)
  }


  async function Atualizar() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    setLoad(true)

    await api.put(`/loja?usuarioID=${credenciais.id}`, loja, { headers })
      .then(() => {
        Toast('Dados Atualizados')
        BuscaLoja()
        setLoad(false)
      })
      .catch((error) => console.log("Erro ao atualizar loja", error.response))
  }

  

  async function BuscaLoja() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${credenciais.token}`
    }

    setLoad(true)

    await api.get(`/loja/logado?usuarioID=${credenciais.id}`, { headers })
      .then((response) => {

        // Força saída do usuario ao verificar status
        if (!response.data?.usuario?.status) {
          signOut()
        }

        setLoja(response.data)
        setLoad(false)
      })
      .catch((error) => {
        console.log("Erro ao buscar informações de loja/logada", error.response);
        setLoad(false)
      })
  }


  // Armazena informações do usuario logado
  async function CredencialDoUsuario() {
    const credencial = await AsyncStorage.getItem('@authGuiaComercial')

    let _lojastorage = await JSON.parse(credencial || '{}')

    // Verifica informações armazenadas no AsyncStorage
    if (Object.keys(credenciais).length > 0) {
      api.defaults.headers.common['Authorization'] = `Bearer ${_lojastorage.token}`

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

        navigation.navigate("Redireciona")
        setLoad(false)

      })
      .catch(({ response }) => {
        if (response.status == '503') {
          Toast("Manutenção", "Estamos melhorando as coisas por aqui, volte em alguns instantes...")

        } else {
          console.log("Erro ao tentar fazer login", response.data?.error)
          
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

        navigation.reset({ index: 0, routes: [{ name: 'HomeFeed' }] })
        Toast(('Você foi deslogado'))
      })
  }


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