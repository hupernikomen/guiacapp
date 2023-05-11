import React,{useEffect, useState} from 'react';
import { FlatList, View, Text, Image, TouchableOpacity,Linking } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigationState, useRoute } from '@react-navigation/native'
import api from '../../servicos/api';

export default function Vendedores() {
    const route = useRoute()

    const [vendedores, setVendedores] = useState()

    useEffect(() =>{
        BuscaVendedores()
    },[])

    async function BuscaVendedores() {
        await api.get(`/vendedores?lojaID=${route.params}`)
        .then((response) => {
            setVendedores(response.data);
        })
    }

    function RenderItem({ data }) {
        return (
            <TouchableOpacity
            onPress={()=> Linking.openURL(`https://api.whatsapp.com/send?phone=${data.whatsapp}`)}
                style={{ flexDirection: "row", alignItems: 'center', marginVertical: 2 }}>
                <Image
                    style={{ width: 45, aspectRatio: 1, borderRadius: 23 }}
                    source={{ uri: data.foto[0].location }}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, flex: 1, borderRadius: 6 }}>

                    <View>
                        <Text style={{ fontFamily: 'Roboto-Light', color: '#000',fontSize:13 }}>Vendedor(a): </Text>
                        <Text numberOfLines={1} style={{ fontFamily: 'Roboto-Bold', color: '#000', fontSize: 16 }}>{data.nome}</Text>
                    </View>

                        <Material name='chevron-right' size={24} color='#000' />
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <FlatList
            ItemSeparatorComponent={<View style={{ borderWidth: .5, borderColor: '#ddd' }} />}
            data={vendedores}
            renderItem={({ item }) => <RenderItem data={item} />}
            contentContainerStyle={{ paddingHorizontal: 15 }}
        />
    );
}