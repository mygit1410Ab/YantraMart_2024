import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import { Width } from '../configs/Configs';

const SliderView = ({ data, sliderWidth, itemWidth }) => {

    const renderItem = useCallback(({ item }) => (
        <View style={[styles.slide, { height: 160, padding: 10 }]}>
            <TouchableOpacity
                disabled={true}
                activeOpacity={0.9}
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    borderRadius: 15,
                    backgroundColor: '#FFF',
                    elevation: 10, shadowColor: '#171717',
                    shadowOffset: { width: -2, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    padding: 5
                }}
            >
                <FastImage
                    style={{
                        flex: 1,
                        height: "100%",
                        width: '100%',
                        alignSelf: 'center'
                    }}
                    source={{
                        uri: item.image ? item.image : item.slider_image,
                        priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </TouchableOpacity>
        </View>
    ), []);
    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            width={Width * 1}
            height={Width / 2.4}
            // sliderWidth={Width * 1}
            itemWidth={Width * 1}
            layout={'default'}
            layoutCardOffset={9}
            autoplay={true}
            loop={true}
            scrollAnimationDuration={1000}
        />
    );
};

const styles = StyleSheet.create({
    slide: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
        // borderRadius: 15,
        // elevation: 10,
        // shadowColor: '#000',
    },
});

export default React.memo(SliderView);
