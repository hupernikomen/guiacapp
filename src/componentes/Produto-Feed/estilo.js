import { StyleSheet } from "react-native"

export default estilo = StyleSheet.create({
  container_produto: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 2,
    borderRadius: 6,

  },
  foto: {
    aspectRatio:1,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  tag_campanha: {
    opacity:.85,
    left:0,
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 4,
    color: '#fff',
    fontSize: 11,
    height:22
  },
  informacoes_do_produto: {
    paddingHorizontal: 8,
    paddingTop: 5,
    paddingBottom: 10,
  },
  nome_produto: {
    fontFamily: 'Roboto-Regular',
    color:'#000',
    fontSize:14
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
    marginTop:3
  },
  nome_loja:{
    fontFamily:'Roboto-Light',
    fontSize:13,
    color:'#000'
  }
})