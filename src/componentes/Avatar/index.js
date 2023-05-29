import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

export default function Avatar({ DATA, WIDTH, SIZE }) {

    const [dados, setDados] = useState({})

    useEffect(() => {
        setDados({ DATA, WIDTH, SIZE })
    }, [])

    return (

        <View>
            {!!dados.DATA?.logo ?

                <Image
                    style={{ width: WIDTH, aspectRatio: 1, borderRadius: 30, marginRight:10 }}
                    source={{ uri: dados.DATA?.logo[0]?.location }}
                /> :
                <View style={{ width: WIDTH, aspectRatio: 1, borderRadius: 30, alignItems: 'center', marginRight:10, justifyContent: 'center', borderWidth: .5, borderColor: "#ddd" }}>
                    <Text style={{ fontFamily: "Roboto-Black", color: '#000', fontSize: dados.SIZE }}>{dados.DATA?.nome?.trim().split(' ')[0].substring(0, 1) + dados.DATA?.nome?.trim().split(' ')[1].substring(0, 1)}</Text>
                </View>
            }
        </View>
    );
}