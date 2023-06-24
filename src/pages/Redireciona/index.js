import { useEffect, useContext } from 'react';
import { View } from 'react-native';

import { LojaContext } from '../../contexts/lojaContext';

export default function Redireciona() {

  const { loja, BuscaLoja } = useContext(LojaContext)

  useEffect(() => {
    BuscaLoja()

  }, [])

  if (loja) {
    // switch (loja.conta) {
    //   case value:

    //     break;

    //   default:
    //     break;
    // }
  }

  return (
    <View>
      {console.log(loja.conta)}
    </View>
  );
}