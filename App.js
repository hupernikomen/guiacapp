import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Rotas from './src/rotas';

import { LojaProvider } from './src/contexts/lojaContext'
import { ProdutoProvider } from './src/contexts/produtoContext'

const Theme = {
  dark: true,
  ...DefaultTheme,
  app: {
    icone: 21,
    tema: '#a82424',
    texto: '#fff',
    background: '#f5f5f5',
  },
  admin: {
    tema: '#fff',
    texto: "#000",
    botao: '#a82424',
    background: '#f5f5f5',
  },
};


export default function App() {

  return (
    <NavigationContainer theme={Theme}>

      <LojaProvider>
        <ProdutoProvider>

          <StatusBar
            backgroundColor={Theme.app.tema}
            translucent={false} />
          <Rotas />

        </ProdutoProvider>
      </LojaProvider>

    </NavigationContainer>
  )
}