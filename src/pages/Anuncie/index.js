import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Anuncie() {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const valores = [{
    lojas: {
      preco: '14,90',
      oferta: '12,90'
    },
    servicos: {
      preco: '4,90',
      oferta: '4,10'
    }
  }]

  return (
    <View
      style={styles.tela}>

      <Text style={styles.objetivo}>
        Temos o objetivo de aproximar lojistas, profissionais e clientes. Com isso, criamos o <Text style={styles.txtdestaque}>App Guia Comercial</Text>. Nele você poderá divulgar seus produtos e serviços, e nós cuidamos em trazer clientes até você.
      </Text>

      <View style={styles.containerassinatura}>
        <View style={styles.containertitulo}>

          <Text style={styles.tituloassinatura}>Assinatura:</Text>
          <Text>Assinatura mensal no cartão de crédito</Text>
        </View>

        <View style={[styles.containervalor, { backgroundColor: colors.destaque }]}>
          <Text style={styles.tipo}>Lojas</Text>
          <View style={styles.containervalores}>

            {valores[0].lojas?.oferta ?
              <>
                <Text style={styles.valor}>R$ {valores[0].lojas.preco}</Text>
                <Text >Por pouco tempo: <Text style={styles.valoroferta}>R$ {valores[0].lojas.oferta}</Text></Text>
              </>
              :
              <Text style={valores[0].lojas?.oferta ? styles.valor: styles.valoroferta}>R$ {valores[0].lojas.preco}</Text>

            }

          </View>
        </View>

        <View style={[styles.containervalor, { backgroundColor: colors.destaque }]}>
          <Text style={styles.tipo}>Servicos</Text>
          <View style={styles.containervalores}>
            {valores[0].servicos?.oferta ?
              <>
                <Text style={styles.valor}>R$ {valores[0].servicos.preco}</Text>
                <Text >Por pouco tempo: <Text style={styles.valoroferta}>R$ {valores[0].servicos.oferta}</Text></Text>
              </>
              :
              <Text style={valores[0].servicos?.oferta ? styles.valor: styles.valoroferta}>R$ {valores[0].servicos.preco}</Text>

            }
          </View>
        </View>
      </View>

      <Text style={styles.infocancelamento}>O cancelamento da assinatura pode ser feito a qualquer momento e sem burocracia</Text>


    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 20
  },
  objetivo: {
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    color: '#000'
  },
  txtdestaque: {
    fontFamily: 'Roboto-Medium',
    color: '#000'
  },
  containerassinatura: {
    marginTop: 40
  },
  containertitulo: {
    marginBottom: 40

  },
  tituloassinatura: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    color: '#000',
  },
  containervalor: {
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation:5
  },
  tipo: {
    fontFamily: 'Roboto-Bold',
    color: '#000'
  },
  containervalores: {
    alignItems: 'flex-end'
  },
  valor: {
    textDecorationLine: "line-through"
    // fontFamily: 'Roboto-Bold',
    // color: '#000',
    // fontSize: 20
  },
  valoroferta: {
    fontFamily: 'Roboto-Bold',
    color: '#000',
    fontSize: 20
  },
  infocancelamento: {
    marginTop:40
  }

})