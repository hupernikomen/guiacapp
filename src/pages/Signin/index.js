import { useState, useContext } from "react";
import { Text, Linking, Pressable,ActivityIndicator } from 'react-native'

import { LojaContext } from "../../contexts/lojaContext"
import { useTheme } from "@react-navigation/native";

import { Tela } from '../../styles'
import { ContainerInput, BotaoPrincipal, TextBtn, Input } from './styles'

export default function Login() {

  const { signIn, load } = useContext(LojaContext)
  const { app } = useTheme()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")


  return (
    <Tela>

      <ContainerInput>
        <Input
          placeholder={"email@email.com"}
          keyboardType='email-address'
          placeholderTextColor={'#aaa'}
          maxLength={405}
          onChangeText={setEmail}
          value={email} />
      </ContainerInput>

      <ContainerInput>

        <Input
          secureTextEntry
          placeholder={"*****"}
          placeholderTextColor={'#aaa'}
          maxLength={20}
          onChangeText={setSenha}
          value={senha} />
      </ContainerInput>


      <BotaoPrincipal
        background={app.tema}
        cor={app.tema}
        activeOpacity={0.7}
        onPress={() => signIn({ email, senha })}
        disabled={!email && !senha ? true : false}>

        {load ? <ActivityIndicator color='#fff'/> :
          <TextBtn cor={'#fff'}>Entrar</TextBtn>
        }

      </BotaoPrincipal>

      <Pressable
        style={{
          alignItems: 'center',
          paddingVertical: 10,
          marginTop: 5
        }}

        onPress={() => Linking.openURL(`https://wa.me/${558694773403}`)}
      >
        <Text>Esqueci minha senha</Text>

      </Pressable>


    </Tela>
  );
}
