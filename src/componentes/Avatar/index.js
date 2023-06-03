import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

export default function Avatar({ DATA, WIDTH, SIZE }) {

    const [dados, setDados] = useState({})
    const [iniciais, setIniciais] = useState("")

    useEffect(() => {
        setDados({ DATA, WIDTH, SIZE })
        setIniciais(dados.DATA?.nome?.trim()
            .split(' ')[0]
            .substring(0, 1) +
            dados.DATA?.nome?.trim()
                .split(' ')[1]
                .substring(0, 1))
    }, [])

    return (

        <View style={{
            width: WIDTH,
            borderRadius: WIDTH / 2,
            aspectRatio: 1,
            overflow: "hidden",
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: "#ddd",
            backgroundColor: '#fff',
        }}>
            {!dados.DATA?.avatar ?

                <Text style={{
                    fontFamily: "Roboto-Black",
                    color: '#000',
                    fontSize: !dados.DATA?.Avatar ? 0 : dados.SIZE
                }}>
                    {iniciais}
                </Text>
                :
                <Image
                    style={{
                        width: WIDTH,
                        flex: 1,
                        resizeMode: 'contain'
                    }}
                    source={{ uri: dados.DATA?.avatar?.location }}
                />
            }
        </View>
    );
}