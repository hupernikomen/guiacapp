import { View, Text } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native';

export default function Off({  valor }) {

    const {app} = useTheme()

    return (
        <View style={{
            alignItems: 'center',
            position: 'absolute',
            zIndex: 99,
            left: -9,
            top: -7
        }}>

            <Material name='bookmark' size={48} color={app.tema} />
            <View
                style={{
                    position: 'absolute',
                    top: 7
                }}>

                <Text style={{
                    fontFamily: "Roboto-Medium",
                    alignSelf: 'center',
                    fontSize: 10,
                    color: '#fff',
                    marginTop: 2
                }}>
                    {valor + '%'}
                </Text>
                <Text style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 9,
                    marginTop: -2,
                    color: '#fff',
                    alignSelf: 'center'
                }}>OFF</Text>
            </View>
        </View>
    );
}