import { useContext } from 'react';
import { View, Linking } from 'react-native';

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

            <View style={{
                backgroundColor: colors.tema,
                height: 130,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10
            }}>

                <BtnCabecalho
                    cor={colors.tema_2}
                    onPress={() => navigation.navigate("Anuncie")}>
                    <Material name='bullhorn-variant-outline' size={28} color='#fff' />
                    <TxtBtnCabecalho>Anuncie no Guia</TxtBtnCabecalho>
                </BtnCabecalho>

                <BtnCabecalho
                    cor={colors.tema_2}
                    onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}>
                    <Material name='whatsapp' size={28} color='#fff' />
                    <TxtBtnCabecalho>Fale conosco</TxtBtnCabecalho>
                </BtnCabecalho>

            </View>

            <View style={{ marginTop: 10 }}>

                <BtnMenu
                    onPress={() => navigation.navigate("Lojas")}>
                    <TxtBtnMenu>Encontre Lojas</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu>

                <BtnMenu
                    onPress={() => navigation.navigate("Servicos")}>
                    <TxtBtnMenu>Encontre Profissionais</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu>

                <BtnMenu
                    onPress={() => navigation.navigate(autenticado ? "HomeControle" : "Signin")}>
                    <TxtBtnMenu>Lojista</TxtBtnMenu>
                    <Material name='chevron-right' color={colors.tema} size={25} />
                </BtnMenu>

            </View>
        </View>
    );
}
