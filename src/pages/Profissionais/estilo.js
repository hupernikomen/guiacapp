import { StyleSheet } from "react-native"

export default estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    height:80,
    borderRadius: 6,
    marginHorizontal: 4,
    marginVertical:4,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"space-between"
  },

  imagem: {
    width: 55,
    borderRadius:99,
    aspectRatio: 1,
  },
  nome: {
    fontFamily: 'Roboto-Bold',
    color: '#000',
    fontSize:17
  }
})