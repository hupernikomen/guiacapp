import { useContext } from 'react';
import { View, Linking, ScrollView } from 'react-native';

import { useTheme, useNavigation } from '@react-navigation/native'

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { LojaContext } from '../../contexts/lojaContext';

import { BtnCabecalho, TxtBtnCabecalho, BtnMenu, TxtBtnMenu } from './styles'

export default function Menu() {

    const navigation = useNavigation()
    const { colors } = useTheme()

    const { autenticado } = useContext(LojaContext)

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>

            <ScrollView
                horizontal
                style={{
                    backgroundColor: colors.tema,
                    padding: 10,
                    maxHeight: 130
                }}>

                <BtnCabecalho
                    cor={'#fff'}
                    onPress={() => navigation.navigate("Anuncie")}>
                    <Material name='bullhorn-variant-outline' size={28} color={colors.tema} />
                    <TxtBtnCabecalho>Anuncie no Guia</TxtBtnCabecalho>
                </BtnCabecalho>

                <BtnCabecalho
                    cor={'#fff'}
                    onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}>
                    <Material name='whatsapp' size={28} color={colors.tema} />
                    <TxtBtnCabecalho>Fale conosco</TxtBtnCabecalho>
                </BtnCabecalho>

            </ScrollView>

            <View style={{ marginTop: 10, flex: 1 }}>

                <BtnMenu
                    onPress={() => navigation.navigate("Lojas")}>
                    <TxtBtnMenu>Encontre Lojas</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu>

                {/* <BtnMenu
                    onPress={() => navigation.navigate("Servicos")}>
                    <TxtBtnMenu>Encontre Profissionais</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu> */}

                <BtnMenu
                    onPress={() => navigation.navigate(autenticado ? "HomeControle" : "Signin")}>
                    <TxtBtnMenu>Área do Lojista</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu>

            </View>
        </View>
    );
}
