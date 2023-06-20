import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, Image, FlatList, Animated } from 'react-native';

import estilo from './estilo';

const WIDTH = Dimensions.get('window').width;


import { ExpandingDot } from "react-native-animated-pagination-dots";

export default function CarrosselBanners() {

    const scrollRef = useRef(null);
    const timeoutRef = useRef(null);
    const [index, setIndex] = useState(0);

    const [banners, setBaners] = useState([
        'https://marketplace.canva.com/EAFM3ug4PvM/1/0/1600w/canva-banner-para-loja-de-eletr%C3%B4nicos-promo%C3%A7%C3%A3o-desconto-moderno-preto-e-roxo-bDGBCajFe_Q.jpg',
        'https://wooperstudio.com.br/wp-content/uploads/2022/01/banner-para-loja-no-shopee1.jpg'])

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();

        timeoutRef.current = setTimeout(() => {
            setIndex(old => (old === banners.length - 1 ? 0 : old + 1));
        }, 3000);

        scrollRef.current?.scrollToIndex({
            index,
        });

        return () => {
            resetTimeout();
        };
    }, [index]);

    function RenderItem({ img }) {
        return (
            <View style={{
                width: WIDTH,
                aspectRatio: 2,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8
            }}>

                <Image
                    style={{ width: WIDTH - 15, flex: 1, borderRadius: 10 }}
                    source={{ uri: img }}
                />
            </View>
        )
    }
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={estilo.container}>

            <FlatList
                ref={scrollRef}
                decelerationRate={0}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    }
                )}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={banners}
                renderItem={({ item }) => <RenderItem img={item} />}
            />

            <ExpandingDot
                data={banners}

                expandingDotWidth={10}
                scrollX={scrollX}
                inActiveDotOpacity={.1}
                activeDotColor={'#bd2828'}
                dotStyle={{
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    marginHorizontal: 3
                }}
                containerStyle={{
                    bottom: 10,
                }}
            />
        </View>

    );
}
