import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Image, Text, View } from 'react-native';

import { ImageSlider } from "react-native-image-slider-banner";

export default function CarrosselBanners({ data }) {

    const { width } = Dimensions.get('window')


    return (
        <View style={{
            backgroundColor: '#222',
        }}>


            <ImageSlider
                caroselImageStyle={{
                    width: width,
                    resizeMode: 'cover',
                    height: 185
                }}
                indicatorContainerStyle={{
                    top: 0
                }}
                caroselImageContainerStyle={{
                    height: 185,

                }}
                showIndicator={false}
                timer={6000}
                data={data}
                autoPlay={true}
                // onItemChanged={(item) => console.log("item", item)}
                closeIconColor="#fff"
            />
        </View>
    )
}
