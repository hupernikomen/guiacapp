import { StyleSheet } from "react-native";

export default estilo = StyleSheet.create({
  container_foto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: 70,
    aspectRatio: 1,
    borderRadius: 70 / 2,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 20
  },
  foto: { 
    width: 70, 
    aspectRatio: 1, 
    borderRadius: 70 / 2, 
    borderColor: '#fff', 
    borderWidth: 4 
  },
  horario: { 
    fontFamily: 'Roboto-Regular', 
    color: '#000' 
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
  container_horarios: {
    flexDirection: 'row',
    justifyContent: 'space-around'
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