import { View, Text, ActivityIndicator, Image } from 'react-native';

import { useTheme } from '@react-navigation/native';
import estilo from './estilo';

import Animated, {FadeInDown, SlideInUp} from 'react-native-reanimated';

export default function Load() {
    const { app } = useTheme()

    return (
        <View style={estilo.pagina}>


            <ActivityIndicator size={40} color={app.tema} />
            <Text style={estilo.texto_carregando}>Carregando</Text>

        </View>
    )
}