import { StyleSheet } from "react-native"

export default estilo = StyleSheet.create({
  container_produto: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 1,
    borderRadius: 4,
    marginHorizontal: 4,

  },
  foto: {
    aspectRatio: 9 / 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  tag_campanha: {
    position: 'absolute',
    bottom: -1,
    left: -1,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 4,
    color: '#fff',
    fontSize: 11
  },
  informacoes_do_produto: {
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 8,
  },
  nome_produto: {
    fontFamily: 'Roboto-Regular',
    color:'#000'
  },
  preco:{
    fontFamily:'Roboto-Bold',
    fontSize:17,
    marginTop:-2,
    color:'#000'
  },
  container_loja:{
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    marginTop:2
  },
  nome_loja:{
    fontFamily:'Roboto-Light',
    fontSize:13,
    color:'#000'
  }
})