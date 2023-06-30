import { StyleSheet } from "react-native";

export default estilo = StyleSheet.create({
  container_vendedor:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 4,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  foto_vendedor:{
    width: 55,
    aspectRatio: 1,
    borderRadius: 55 / 2,
    marginRight: 25
  },
  container_info :{ 
    flex: 1 
  },
  container_nome_info:{ 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  nome_vendedor:{
    fontFamily: 'Roboto-Bold',
    color: '#000',
    fontSize: 18
  },
  container_status:{ 
    alignItems: "center", 
    flexDirection: 'row' 
  },
  dot_status:{ 
    width: 8, 
    height: 8, 
    borderRadius: 5 
  },
  info_status:{
    fontSize: 13, 
  },
  setor:{
    fontFamily: 'Roboto-Light',
    color: '#000',
    fontSize: 13
  },
  mensagem:{
    fontFamily: 'Roboto-Light',
    color: '#000',
    fontSize: 13
  }

})