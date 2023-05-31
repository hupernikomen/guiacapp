import { useState, useEffect, useContext } from "react";
import { Text, Linking } from 'react-native'

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
        <Material name={'email-outline'} size={24} color={'#222'}
          style={{
            position: 'absolute',
            zIndex: 99,
            left: 25,

          }} />
        <Input
          placeholder={"email@email.com"}
          placeholderTextColor={'#aaa'}
          maxLength={405}
          onChangeText={setEmail}
          value={email} />
      </ContainerInput>

      <ContainerInput>

        <Material name={'lock-outline'} size={24} color={'#222'}
          style={{
            position: 'absolute',
            zIndex: 99,
            left: 25,

          }} />
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
        disabled={!email && !senha ? true : false}
      >
        <TextBtn cor={'#fff'}>Entrar</TextBtn>

      </BotaoPrincipal>

      <BotaoPrincipal
        background={'#fff'}

        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <TextBtn cor={'#000'}>Sair</TextBtn>

      </BotaoPrincipal>

      <Text style={{ marginTop: 25, marginLeft: 15, fontFamily: 'Roboto-Light', color: '#000' }}>Esqueceu a sua senha?</Text>
      <BotaoPrincipal
        background={'#fff'}

        activeOpacity={0.7}
        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
      >
        <TextBtn cor={'#000'}>Fale com o Guia</TextBtn>

      </BotaoPrincipal>


    </Tela>
  );
}
