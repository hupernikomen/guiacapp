import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

import NetInfo from '@react-native-community/netinfo'

import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function Load() {

    const navigation = useNavigation()
    const focus = useIsFocused()


    useEffect(() => {
        NetInfo.addEventListener(state => {

            if (!state.isConnected) navigation.navigate('ErroConexao')

        });


    }, [focus])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignContent: "center" }}>
            <ActivityIndicator size={50} />
        </View>
    );
}