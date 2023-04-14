import React from 'react';
import { Dimensions, View, Image, FlatList, Animated } from 'react-native';

const WIDTH = Dimensions.get('window').width;
import { useTheme } from 'react-native-paper';

import { ExpandingDot } from "react-native-animated-pagination-dots";

export default function CarrosselBanners({ data }) {

    const { colors } = useTheme()

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
                pagingEnabled
                scrollEventThrottle={16}
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

                expandingDotWidth={20}
                scrollX={scrollX}
                inActiveDotOpacity={0.2}
                activeDotColor={'#bd2828'}
                dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    marginHorizontal: 3
                }}
                containerStyle={{
                    bottom: 10,
                }}
            />
        </View>

    );
}
