import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image
} from "react-native";

import { LojaContext } from "../../contexts/lojaContext"
import { useTheme,useNavigation,useIsFocused } from "@react-navigation/native";

import { ContainerInput, Input, TituloInput, BotaoPrincipal, TextBtn } from '../../styles'

export default function Login() {

  const navigation = useNavigation()

  const focus = useIsFocused()
  const { signIn,autenticado } = useContext(LojaContext)
  const { colors } = useTheme()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  useEffect(() => {

    autenticado && navigation.navigate('HomeControle')

  },[focus])

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: "center",
      backgroundColor: '#fff'
    }}>

      {/* <Image
        style={{width:100, height:100}}
        source={require("../../../assets/imagem/IconeGuiaComercial.png")}
      /> */}

      <ContainerInput>
        <TituloInput>
          Email
        </TituloInput>
        <Input
          placeholder={"email@email.com"}
          placeholderTextColor={'#ccc'}
          maxLength={35}
          onChangeText={setEmail}
          value={email} />
      </ContainerInput>

      <ContainerInput>
        <TituloInput>
          Senha
        </TituloInput>
        <Input
          secureTextEntry
          placeholder={"***"}
          placeholderTextColor={'#ccc'}
          maxLength={35}
          onChangeText={setSenha}
          value={senha} />
      </ContainerInput>


      <BotaoPrincipal
        cor={colors.tema}
        activeOpacity={0.7}
        onPress={() => signIn({ email, senha })}
        disabled={!email && !senha ? true : false}
      >
        <TextBtn>Entrar</TextBtn>

      </BotaoPrincipal>
    </View>
  );
}
