import { useState, useEffect } from 'react'
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function ErroNaoEncontrado() {

  const navigation = useNavigation()

  const [regressiva, setRegressiva] = useState(5)

  useEffect(() => {
    
    setTimeout(() => {
      navigation.navigate("Feed")
      clearInterval(contagem)
    }, 5000);

    let contagem = setInterval(() => {
      setRegressiva(regressiva => regressiva - 1)
    }, 1000);

  }, [])


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}></Text>
      <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 22, color: '#000', textAlign: 'center' }}>Ops...{'\n'}Produto não encontrado</Text>

      <Text style={{ marginTop: 15 }}>Redirecionando em {regressiva} segundos</Text>
    </View>
  );
}