import { View, Text } from 'react-native';

import { useTheme } from '@react-navigation/native';
import estilo from './estilo';

export default function Off({ valor }) {

    const { app } = useTheme()

    return (
        <View>
            <View style={[estilo.container, { backgroundColor: app.tema }]}>

                <Text style={estilo.valor}>{valor}</Text>
                <Text style={estilo.off}>% OFF</Text>
            </View>
        </View>
    );
}