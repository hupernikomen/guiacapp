import { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import estilo from './estilo';

export default function ErroNaoEncontrado() {

  const navigation = useNavigation()

  const [regressiva, setRegressiva] = useState(5)

  useEffect(() => {
    
    setTimeout(() => {
      clearInterval(contagem)
      navigation.navigate("Feed")
    }, 5000);
    
    let contagem = setInterval(() => {
      setRegressiva(regressiva => regressiva - 1)
    }, 1000);
    
    return() => {
      clearInterval(contagem)

    }

  }, [])


  return (
    <View style={estilo.pagina}>

      <Text style={estilo.mensagem}>Ops...{'\n'}Produto excluído recentemente</Text>
      <Text style={estilo.contagem}>Redirecionando em {regressiva} segundos</Text>
      
    </View>
  );
}