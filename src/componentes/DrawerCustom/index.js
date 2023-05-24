import React, { useContext } from 'react';

import { DrawerContentScrollView, DrawerItemList, DrawerItem,Dra } from '@react-navigation/drawer'

import { LojaContext } from '../../contexts/lojaContext';

export default function DrawerCustom(props) {

    const { autenticado, signOut } = useContext(LojaContext)

    return (
        <DrawerContentScrollView {...props}>

            <DrawerItemList {...props} />

            {autenticado &&
                <DrawerItem
                    label="Sair da loja"
                    inactiveTintColor='#fff'
                    onPress={signOut}
                />
            }

        </DrawerContentScrollView>
    );
}