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
    token: ''
  })

  const [loading, setLoading] = useState(true)


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



 


  //---------------------------------------------------------------------

  

  const ToastErroLogin = (mensagem) => {
    ToastAndroid.showWithGravityAndOffset(
      mensagem,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      50,
    );
  };

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
          ToastErroLogin(response.data?.error)
          // Alert.alert("Ops...", response.data?.error)
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
      autenticado,
      loading,
      signIn,
      signOut,
    }}>
      {children}
    </LojaContext.Provider>
  )
}