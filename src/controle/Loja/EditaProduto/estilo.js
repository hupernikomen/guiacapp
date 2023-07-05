import { StyleSheet } from "react-native"

export default estilo = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  inputs: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    minHeight: 55,
    borderWidth: .5,
    borderColor: '#777',
    paddingHorizontal: 25,
    color: '#000',
    borderRadius: 28,
  },
  container_botoes_tamanho: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 4,

  },



  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    minHeight: 55,
    borderWidth: .5,
    borderColor: '#777',
    paddingHorizontal: 25,
    color: '#000',
    borderRadius: 28,
  },

  container_inputs: {
    position: 'relative',
    marginVertical: 10,
  },
  titulo_inputs: {
    fontFamily: 'Roboto-Regular',
    color: '#000',
    fontSize: 13,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    top: -12,
    zIndex: 999,
    marginLeft: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },


  currency_input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    minHeight: 55,
    borderWidth: .5,
    borderColor: '#777',
    paddingHorizontal: 25,
    color: '#000',
    borderRadius: 28,
  },
  container_tamanhos: {
    justifyContent: 'space-between',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems:'center',
    minHeight: 55,
    paddingHorizontal: 25,
    borderWidth: .5,
    borderColor: '#777',
    borderRadius: 30,
  },
  btn_cadastrar: {
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    flexDirection: 'row',
    marginVertical: 50
  },
  txt_botao: {
    color: '#fff'
  }
})