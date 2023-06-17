import { useState, useEffect, useContext } from "react";
import { Text, Linking,Pressable } from 'react-native'

import { LojaContext } from "../../contexts/lojaContext"
import { useTheme, useNavigation, useIsFocused } from "@react-navigation/native";

import { Tela } from '../../styles'
import { ContainerInput, BotaoPrincipal, TextBtn, Input } from './styles'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Login() {

  const navigation = useNavigation()

  const focus = useIsFocused()
  const { signIn, autenticado } = useContext(LojaContext)
  const { colors } = useTheme()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  useEffect(() => {

    autenticado && navigation.navigate('HomeControle')

  }, [focus])

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
        background={colors.tema}
        cor={colors.tema}
        activeOpacity={0.7}
        onPress={() => signIn({ email, senha })}
        disabled={!email && !senha ? true : false}>

        <TextBtn cor={'#fff'}>Entrar</TextBtn>

      </BotaoPrincipal>

      <Pressable
        style={{
          alignItems:'center',
          paddingVertical:10,
          marginTop:5
        }}

        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
      >
        <Text>Esqueci minha senha</Text>

      </Pressable>

      <Pressable
        style={{
          alignItems:'center',
          paddingVertical:10,
          marginTop:5
        }}
        onPress={() => navigation.navigate("HomeScreen")}>

        <Text>Cadastrar minha loja</Text>

      </Pressable>




    </Tela>
  );
}
