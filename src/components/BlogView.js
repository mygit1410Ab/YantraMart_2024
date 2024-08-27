import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../configs/Colors'
import { Width, colors, fonts } from '../configs/Configs'
import FastImage from 'react-native-fast-image'
import { fontStyles } from '../style/FontsStyle'


const BlogView = ({ item, onPress,}) => {
    // console.log('----->', item)
    return (
        // <TouchableOpacity
        //     // activeOpacity={0.7}
        // // disabled={true}
        // >

        <View
            style={{
                // height: 250,
                width: Width * 0.9,
                borderWidth: 0,
                borderColor: Colors.greyTextField,
                borderRadius: 15,
                justifyContent: "flex-start",
                // alignContent: "center",
                // alignItems: "center",
                shadowColor: "black",
                shadowOpacity: 0.26,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 10,
                elevation: 3,
                backgroundColor: colors.white,
                // marginBottom: 24,
                // marginLeft:15,
                // marginRight:15,
                // margin: Width * 0.1,
                // marginTop: 5,
                // marginBottom: 26
            }}
        >
            <FastImage
                source={
                    item.image
                        ? {
                            uri: `${item.image}`,
                            priority: FastImage.priority.high,

                        }
                        : require("../assets/images/material.png")
                }
                resizeMode="cover"
                style={{
                    height: 150,
                    width: "100%",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}
            />
            <Text
                numberOfLines={2}
                style={{
                    marginBottom: 0,
                    textAlign: "left",
                    fontSize: 14,
                    fontFamily: fonts.Urbanist_SemiBold,
                    color: colors.black,
                    marginTop: 6,
                    marginLeft: 8,
                    marginRight: 8,
                }}
            >
                {item.title}
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flex: 0.8, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text
                        numberOfLines={2}
                        style={{
                            marginBottom: 0,
                            textAlign: "left",
                            fontSize: 14,
                            fontFamily: fonts.Urbanist_SemiBold,
                            color: colors.black,
                            //   marginTop: 6,
                            marginLeft: 8,
                            marginRight: 8,
                        }}
                    >
                        {item.author}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => onPress(item)}
                    // disabled={true}
                    style={{
                        padding: 10,
                        backgroundColor: colors.lightGreen,
                        borderRadius: 8,
                        shadowColor: '#171717',
                        shadowOffset: { width: -2, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 10
                    }}>
                    <Text style={[fontStyles.bigButton_text, { color: '#fff' }]}>
                        view more
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default React.memo(BlogView);

const styles = StyleSheet.create({})