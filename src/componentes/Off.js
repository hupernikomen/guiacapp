import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Off({  valor }) {

    const { colors } = useTheme()
    return (
        <View style={{
            alignItems: 'center',
            position: 'absolute',
            zIndex: 99,
            left: -9,
            top: -6
        }}>

            <Material name='bookmark' size={46} color={'#EF6C0099'} />
            <View
                style={{
                    position: 'absolute',
                    top: 7
                }}>

                <Text style={{
                    fontFamily: "Roboto-Regular",
                    alignSelf: 'center',
                    fontSize: 9,
                    color: '#fff',
                    marginTop: 2
                }}>
                    {valor + '%'}
                </Text>
                <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 9,
                    marginTop: -2,
                    color: '#fff',
                    alignSelf: 'center'
                }}>OFF</Text>
            </View>
        </View>
    );
}