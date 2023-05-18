import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, FlatList, View, StyleSheet } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';
import api from '../../servicos/api';


export default function ListaSubCategorias({ data }) {
    const navigation = useNavigation()
    const { colors } = useTheme()

    const [categorias, setCategorias] = useState([])

    const [filtro, setFiltro] = useState("")

    useEffect(() => {
        BuscaCategorias()
    }, [])

    async function BuscaCategorias() {

        await api.get(`/subcategorias?categoriaID=${data}`)
            .then((response) => {
                console.log(response.data);
                setCategorias(response.data)
            })
            .catch((error) => { if (error == "AxiosError: Network Error") { navigation.navigate("ErroConexao") } })
    }



    const RenderItem = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => setFiltro(item.id)}
                activeOpacity={.9}
                style={{
                    height: 50,
                    justifyContent: 'center',
                    paddingHorizontal: 15,
                }}>



                <Text style={{
                    textTransform: 'uppercase',
                    fontFamily: 'Roboto-Medium',
                    fontSize: 13,
                    color: '#fff',
                }}>
                    {item.nome}
                </Text>

                <View style={{
                    position: 'absolute',
                    right: 5,
                    top: 10
                }}>

                </View>


            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            style={{ backgroundColor: colors.tema }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categorias}
            renderItem={({ item }) => <RenderItem item={item} />}
            
            />
    )
}
