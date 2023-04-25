import React, { useState, useContext } from "react";
import {
  View,
} from "react-native";

import { LojaContext } from "../../contexts/lojaContext"
import { useNavigation, useTheme } from "@react-navigation/native";

import { ContainerInput, Input, BotaoPrincipal, TextBtn } from '../../styles'

export default function Login() {

  const { signIn } = useContext(LojaContext)

  const { colors } = useTheme()
  const navigation = useNavigation()

  const [email, setEmail] = useState("hupcontato@gmail.com")
  const [senha, setSenha] = useState("hpG422354")

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: "center",
      backgroundColor: '#fff'
    }}>


      <ContainerInput>
        <Input
          keyboardType='email-address'
          onChangeText={setEmail}
          value={email}
          placeholder='seuemail@email.com'

        />
      </ContainerInput>

      <ContainerInput>
        <Input
          onChangeText={setSenha}
          value={senha}
          secureTextEntry
          placeholder='*****'
        />

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
