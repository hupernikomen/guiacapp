import React, { useState, useContext } from "react";
import {
  View,
} from "react-native";

import { LojaContext } from "../../contexts/lojaContext"
import { useTheme } from "@react-navigation/native";

import { ContainerInput, Input, TituloInput, BotaoPrincipal, TextBtn } from '../../styles'

export default function Login() {

  const { signIn } = useContext(LojaContext)
  const { colors } = useTheme()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: "center",
      backgroundColor: '#fff'
    }}>

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
