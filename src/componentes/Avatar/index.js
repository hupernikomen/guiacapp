import { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';

export default function Avatar({ DATA, WIDTH, SIZE }) {

    const [dados, setDados] = useState({})

    useEffect(() => {
        setDados({ DATA, WIDTH, SIZE })
    }, [])


    return (

        <View style={
            !dados.DATA?.Avatar ?
                {
                    width: WIDTH,
                    aspectRatio: 1,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
                :
                {
                    width: WIDTH,
                    aspectRatio: 1,
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    borderWidth: .5,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
            {!dados.DATA?.avatar ?

                <Text style={{ fontFamily: "Roboto-Black", color: '#000', fontSize: !dados.DATA?.Avatar ? 0 : dados.SIZE }}>
                    {dados.DATA?.nome?.trim().split(' ')[0].substring(0, 1) + dados.DATA?.nome?.trim().split(' ')[1].substring(0, 1)}
                </Text>
                :
                <Image
                    style={{ width: WIDTH, aspectRatio: 1, borderRadius: 30 }}
                    source={{ uri: dados.DATA?.avatar?.location }}
                />
            }
        </View>
    );
}