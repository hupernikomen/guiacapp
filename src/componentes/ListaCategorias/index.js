import React from 'react';
import { TouchableOpacity, Text, FlatList, View, StyleSheet } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';


export default function ListaCategorias({ data }) {
    const navigation = useNavigation()
    const { colors } = useTheme()

    const RenderItem = ({ item }) => {
        if (item._count.produto === 0) return

        function ContagemSimbolica({ valor }) {


            if (valor > 100 && valor <= 1000) {
                let result = valor / 100
                return <Text style={styles.cont}>{"+" + String(result).substring(0, 1) + "00"}</Text>

            } else if (valor > 1000) {
                let result = valor / 1000
                return <Text style={styles.cont}>{"+" + String(result).substring(0, 1) + "k"}</Text>

            } else {
                return <Text style={styles.cont}>{valor}</Text>
            }
        }

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Categorias", item)}
                activeOpacity={.9}
                style={{
                    height: 55,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                }}>



                <Text style={{
                    textTransform: 'uppercase',
                    fontFamily: 'Roboto-Bold',
                    fontSize:13,
                    color: '#fff',
                }}>
                    {item.nome}
                </Text>

                <View style={{
                    position: 'absolute',
                    right: 5,
                    top: 10
                }}>

                    <ContagemSimbolica valor={item._count.produto} />
                </View>


            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            style={{ backgroundColor: colors.tema }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}

const styles = StyleSheet.create({
    cont: {
        fontSize: 10,
        backgroundColor: '#22222250',
        paddingHorizontal: 5,
        borderRadius: 5,
        color: '#fff'
    }
})