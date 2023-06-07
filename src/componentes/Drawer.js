import { useContext } from 'react';
import { Linking, View } from 'react-native';


import { useNavigation } from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import { LojaContext } from '../contexts/lojaContext';

export default function DrawerCustom(props) {

    const { autenticado } = useContext(LojaContext)

    const navigation = useNavigation()

    return (
        <DrawerContentScrollView {...props}>


            {!autenticado ?
                <DrawerItem
                    labelStyle={{ fontFamily: 'Roboto-Regular' }}
                    label="Login"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("Signin")}
                /> :
                <DrawerItem
                    labelStyle={{ fontFamily: 'Roboto-Regular' }}
                    label="Area Lojista"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("HomeControle")}
                />

            }


            <View style={{ borderColor: '#951c1c', borderTopWidth: 1, borderBottomWidth: 1 }}>

                <DrawerItem
                    labelStyle={{ fontFamily: 'Roboto-Regular' }}
                    label="Feed"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("Home")}
                />
                <DrawerItem
                    labelStyle={{ fontFamily: 'Roboto-Regular' }}
                    label="Lojas Cadastradas"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("Lojas")}
                />
                {/* <DrawerItem
                    labelStyle={{ fontFamily: 'Roboto-Regular' }}
                    label="Serviços Profissionais"
                    inactiveTintColor='#fff'
                    onPress={() => navigation.navigate("Servicos")}
                /> */}


            </View>

            <DrawerItem
                labelStyle={{ fontFamily: 'Roboto-Regular' }}
                label="Anuncie"
                inactiveTintColor='#fff'
                onPress={() => navigation.navigate("Anuncie")}
            />
            <DrawerItem
                labelStyle={{ fontFamily: 'Roboto-Regular' }}
                label="Fale com o Guia"
                inactiveTintColor='#fff'
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
            />
        </DrawerContentScrollView>
    );
}