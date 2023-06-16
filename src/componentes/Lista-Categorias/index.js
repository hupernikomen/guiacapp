import { TouchableOpacity, Text, FlatList } from 'react-native';

import { useNavigation, useTheme } from '@react-navigation/native';
import estilo from './estilo';

export default function ListaCategorias({data}) {
    const navigation = useNavigation()
    const { colors } = useTheme()


    const RenderItem = ({ item }) => {
        if (item._count.produto === 0) return

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Categorias", item)}
                activeOpacity={.9}
                style={estilo.botao}>
                <Text style={estilo.texto_botao}>
                    {item.nome}
                </Text>

            </TouchableOpacity>
        )
    }



    return (
        <FlatList
            contentContainerStyle={{ marginHorizontal: 5}}
            style={{ backgroundColor: colors.tema}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => <RenderItem item={item} />}

        />
    )
}
