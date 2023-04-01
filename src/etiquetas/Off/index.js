import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Off({ valor }) {

    const { colors } = useTheme()
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 9999,
            left:-5,
            top:-10
        }}>

            <Material name='bookmark' size={50} color={colors.tema}/>
            <View 
            style={{
                position: 'absolute',
                top:8
            }}>

                <Text style={{
                    fontFamily: "Roboto-Regular",
                    alignSelf:'center',
                    fontSize: 10,
                    color: '#fff',
                    marginTop:2
                }}>
                    {valor + '%'}
                </Text>
                <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 10,
                    marginTop:-2,
                    color: '#fff',
                    alignSelf:'center'
                }}>OFF</Text>
            </View>
        </View>
    );
}