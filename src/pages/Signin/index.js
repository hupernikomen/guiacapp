import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";

import { LojaContext } from "../../contexts/lojaContext"
import { useNavigation, useTheme } from "@react-navigation/native";

export default function Login() {

  const { signIn} = useContext(LojaContext)

  const {colors} = useTheme()
  const navigation = useNavigation()

  const [email, setEmail] = useState("hupcontato@gmail.com")
  const [senha, setSenha] = useState("hpG422354")

  return (
    <View style={styles.tela}>

      <View style={styles.form_login}>

        <TextInput
        keyboardType='email-address'
        onChangeText={setEmail}
        value={email}
        style={styles.input}
        placeholder='seuemail@email.com'
        
        />

        <TextInput
          onChangeText={setSenha}
          value={senha}
          style={styles.input}
          secureTextEntry
          placeholder='*****'
        />


        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn_sign,{backgroundColor:colors.tema}]}
          onPress={()=> signIn({ email, senha })}
          disabled={!email && !senha ? true : false}
        >
          <Text style={styles.txtbtn_sign}>Entrar</Text>

        </TouchableOpacity>



      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(`https://api.whatsapp.com/send?phone=5586994773403`)
        }
        style={styles.btn_contact}
      >
        <Text style={styles.txtbtn_contact}>Fale com o Guia</Text>

      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form_login: {
    width: '80%',
  },
  input: {
    height: 60,
    textAlign: "left",
    marginBottom: 6,
    paddingHorizontal: 25,
    borderRadius: 60 / 2,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  btn_sign: {
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  txtbtn_sign: {
    fontWeight: '600',
    fontSize: 16,
    color:"#fff"
  },
  btn_contact: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  txtbtn_contact: {
    fontSize: 16,
  },
});