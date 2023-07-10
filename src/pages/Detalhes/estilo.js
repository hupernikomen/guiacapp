import { StyleSheet } from "react-native";

export default estilo = StyleSheet.create({
  slide_imagens: {
    aspectRatio: 7 / 9,
    backgroundColor: '#f1f1f1'
  },
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
    padding: 15,
  },
  nome_loja: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000'
  },
  info_botao_loja: {
    fontSize: 13,
    fontFamily: 'Roboto-Light',
    color: '#455A64'
  },
  preco: {
    fontFamily: 'Roboto-Bold',
    fontSize: 26,
    marginTop: -5,
    color: '#000'
  },
  avista: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular'
  },
  preco_antigo: {
    marginLeft: 2,
    textDecorationLine: 'line-through',
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

