import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, } from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Width } from '../configs/Configs';



const MyCarousel = ({ data, sliderWidth, itemWidth, visible, setIsVisible }) => {

    const gallery_Url = 'https://yantramart.com/uploads/gallery/';
    // console.log('-------------->',data,)
    const renderItem = ({ item }) => {

        return (
            <View style={styles.slide}>
                <TouchableOpacity
                    onPress={() => setIsVisible(!visible)}
                    activeOpacity={0.9}
                    style={{
                        flex: 1,
                        height: '100%',
                        width: '100%',
                        padding: 10

                    }}
                >
                    <FastImage
                        style={{
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            alignSelf: 'center',
                            backgroundColor: 'gray',
                        }}
                        source={{
                            uri: `${item.uri}`,
                            priority: FastImage.priority.high,

                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <Carousel
            data={data}
            renderItem={renderItem}
            width={sliderWidth}
            height={itemWidth}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth:1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default MyCarousel;














{/* <SkeletonPlaceholder borderRadius={4}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 60, height: 60, borderRadius: 50}} />
        <View style={{marginLeft: 20}}>
          <Image style={{width: 120, height: 20}} src={{uri:'https://res.cloudinary.com/people-matters/image/upload/fl_immutable_cache,w_624,h_351,q_auto,f_auto/v1506578512/1506578510.jpg'}} />
          <Text style={{marginTop: 6, fontSize: 14, lineHeight: 18,color:'red'}}>Hello world</Text>
        </View>
      </View>
    </SkeletonPlaceholder> */}


<>
    {/* <FlatList
    data={data}
    renderItem={renderItem}
    /> */}
</>