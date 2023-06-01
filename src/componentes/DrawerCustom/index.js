import { Linking } from 'react-native';

import {useNavigation} from '@react-navigation/native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

export default function DrawerCustom(props) {

    const navigation = useNavigation()

    return (
        <DrawerContentScrollView {...props}>


            <DrawerItemList {...props} />

            <DrawerItem
                label="Lojas Cadastradas"
                inactiveTintColor='#fff'
                onPress={() => navigation.navigate("Lojas")}
            />
            <DrawerItem
                label="Serviços Profissionais"
                inactiveTintColor='#fff'
                onPress={() => navigation.navigate("Servicos")}
            />
            <DrawerItem
                label="Fale com o Guia"
                inactiveTintColor='#fff'
                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${86994773403}`)}
            />

        </DrawerContentScrollView>
    );
}