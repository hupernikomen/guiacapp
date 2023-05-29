import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Linking, TouchableOpacity,ToastAndroid } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { LojaContext } from '../../contexts/lojaContext';

export default function DrawerCustom(props) {

    const { Logo } = useContext(LojaContext)


    return (
        <DrawerContentScrollView {...props}>


            <DrawerItemList {...props} />

            <DrawerItem
                label="Fale com o Guia"
                inactiveTintColor='#fff'
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
            />

        </DrawerContentScrollView>
    );
}