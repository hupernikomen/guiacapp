import React from 'react';
import { Dimensions, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export default function CarrosselBanners({ data }) {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                // mode={'parallax'}
                snapEnabled={false}
                width={width}
                height={width / 2}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={1000}
                autoPlayInterval={5000}
                // onSnapToItem={(index) =>
                //     console.log('current index:', index)}
                renderItem={({ item, index }) => (
                    <Image
                        style={{ flex: 1 }}
                        source={{ uri: item }}
                    />
                )}
            />
        </View>
    );
}
