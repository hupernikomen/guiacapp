import React from 'react';
import { View, Text } from 'react-native';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

export default function DrawerCustom(props) {
    return (
        <DrawerContentScrollView {...props}>

            <View style={{
                padding: 15,
                marginVertical: 15
            }}>

                <Text>Guia Comercial</Text>
            </View>

            <DrawerItemList {...props} />

            <View style={{
                padding: 15,
                marginVertical: 15
            }}>

                <Text>Lojas</Text>
            </View>
           

        </DrawerContentScrollView>
    );
}