import React, { useContext } from 'react';
import { Linking } from 'react-native';

import { DrawerContentScrollView, DrawerItemList, DrawerItem, Dra } from '@react-navigation/drawer'

import { LojaContext } from '../../contexts/lojaContext';

export default function DrawerCustom(props) {


    return (
        <DrawerContentScrollView {...props}>

            <DrawerItemList {...props} />

            <DrawerItem
                label="Fale com o Guia"
                inactiveTintColor='#fff'
                onPress={()=> Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
            />

        </DrawerContentScrollView>
    );
}