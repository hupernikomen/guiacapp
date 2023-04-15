import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';

import Produto from '../../componentes/Produto/ProdutoLoja';

import Material from "react-native-vector-icons/MaterialCommunityIcons"

import { useRoute, useNavigation, useIsFocused, useTheme } from '@react-navigation/native';

export default function Loja() {

    const navigation = useNavigation()
    const route = useRoute()
    const focus = useIsFocused()
    const { colors } = useTheme()

    const [infoLoja, setInfoLoja] = useState([])

    useEffect(() => {
        setInfoLoja(route.params)

    }, [focus])

    useEffect(() => {
        navigation.setOptions({
            title: infoLoja.nome,
            headerRight: () =>
                <>

                    <TouchableOpacity
                        onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${infoLoja.telefone}`)}>
                        <Material name='whatsapp' color='#fff' size={26} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginLeft: 20 }}
                        activeOpacity={.9}
                        onPress={() => navigation.navigate("Mapa", infoLoja)}>

                        <Material name='google-maps' size={26} color={'#fff'} />
                    </TouchableOpacity>


                </>

        })

    }, [infoLoja])

    return (
        <View style={styles.tela}>

            <View style={{
                backgroundColor: colors.tema,
                height: 100,
                paddingHorizontal: 20,
                paddingVertical: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: "flex-start"
                }}>

                    <Material name='text' size={20}  color='#ffffff90'/>
                    <Text style={{
                        color: '#fff',
                        marginLeft: 10,
                        fontFamily: 'Roboto-Light'
                    }}>
                        {infoLoja.bio}
                    </Text>
                </View>



                {infoLoja.entrega &&
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Material name='truck'size={20} color='#ffffff90'/>
                        <Text style={{
                            marginLeft: 10,
                            color: '#fff',
                            fontFamily: 'Roboto-Light'
                        }}>Fazemos Entregas</Text>
                    </View>
                }

            </View>


            <FlatList
                contentContainerStyle={{ marginVertical: 6 }}
                columnWrapperStyle={{ marginHorizontal: 8, marginVertical: 5 }}
                data={infoLoja.produtos}
                renderItem={({ item }) => <Produto item={item} />}
                numColumns={2}

            />


        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1
    }
})