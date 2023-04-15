import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, View, Image, FlatList, Animated } from 'react-native';


const WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = WIDTH * 0.9;


import { ExpandingDot } from "react-native-animated-pagination-dots";

export default function CarrosselBanners({ data }) {

    const scrollRef = useRef(null);
    const timeoutRef = useRef(null);
    const [index, setIndex] = useState(0);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();

        timeoutRef.current = setTimeout(() => {
            setIndex(old => (old === data.length - 1 ? 0 : old + 1));
        }, 8000);

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
                padding: 10
            }}>

                <Image
                    style={{ width: WIDTH - 20, flex: 1, borderRadius: 10 }}
                    source={{ uri: img }}
                />
            </View>
        )
    }
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View style={{ paddingBottom: 20 }}>

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
                data={data}
                renderItem={({ item }) => <RenderItem img={item} />}
            />

            <ExpandingDot
                data={data}

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
