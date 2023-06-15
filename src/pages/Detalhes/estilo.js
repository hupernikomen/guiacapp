import { StyleSheet } from "react-native";

export default estilo = StyleSheet.create({
  pagina: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container_loja: {
    flexDirection: 'row',
    alignItems: 'center',
    justifContent: 'flex-start',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    padding: 20,
  },
  nome_loja: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17
  },
  info_botao_loja: {
    fontSize: 12,
    fontFamily: 'Roboto-Light',
    color: '#000'
  },
  preco: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    marginTop: -5
  },
  avista:{
    fontSize:16,
    fontFamily:'Roboto-Regular'
  },

  //Serviço

  detalheFoto: {
    backgroundColor: '#f1f1f1'
  },
  detalhes: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  servico: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    color: '#000',
    marginBottom: 5
  },
  bio: {
    color: '#000',
    fontFamily: 'Roboto-Light'
  },
  adomicilio: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoendereco: {
    color: '#000',
    fontFamily: 'Roboto-Light',
  },
  infodomicilio: {
    marginLeft: 20
  },
  tituloendereco: {
    fontFamily: "Roboto-Bold",
    fontSize: 22,
    color: '#000',
    marginBottom: 5
  },
  endereco: {
    marginTop: 20
  },
  btnmapa: {
    marginTop: 40,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtmapa: {
    color: '#fff'
  }
})

