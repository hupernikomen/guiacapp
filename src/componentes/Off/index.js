import { View, Text } from 'react-native';

import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native';

export default function Off({  valor }) {

    const {app} = useTheme()

    return (
        <View style={{opacity:.85}}>

            <View
                style={{
                    position: 'absolute',
                    bottom:0,
                    height:22,
                    paddingHorizontal:5,
                    borderRadius:2,
                    alignItems:'center',
                    justifyContent:"center",
                    backgroundColor:app.tema
                }}>

                <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 9,
                    color: '#fff',
                }}>
                    {valor + '%'}
                </Text>
                <Text style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 8,
                    marginTop: -2,
                    color: '#fff',
                }}>OFF</Text>
            </View>
        </View>
    );
}