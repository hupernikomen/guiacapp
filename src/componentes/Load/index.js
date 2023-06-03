import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { useTheme } from '@react-navigation/native';

export default function Load() {
    const { colors } = useTheme()

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>

            <ActivityIndicator size={40} color={colors.tema} />
            <Text style={{
                fontFamily:"Roboto-Regular",
                color:'#000'
            }}>Carregando</Text>
        </View>
    )
}