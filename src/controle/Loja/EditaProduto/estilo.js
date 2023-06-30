import { StyleSheet } from "react-native"

export default estilo = StyleSheet.create({
  tela:{
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  inputs:{
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    minHeight: 55,
    borderWidth: .5,
    borderColor: '#777',
    paddingHorizontal: 25,
    color: '#000',
    borderRadius: 28,
  },
  container_botoes_tamanho:{
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 4,

  },
  container_input:{
    position: 'relative',
    marginVertical:10
  },
  titulo_input:{
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    position: 'absolute',
    backgroundColor:'#fff',
    borderRadius: 10,
    zIndex: 99,
    top: -12,
    marginLeft: 15,
    paddingVertical:2,
    paddingHorizontal: 10,
  }
})