import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../configs/Colors'
import { colors, fonts } from '../configs/Configs'
import FastImage from 'react-native-fast-image'

const LocationView = ({ item, onPress, Image_Url }) => {
    // console.log('-------->',item.url)
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
            activeOpacity={0.7}
        >

            <View
                style={{
                    // height: 250,
                    width:
                        Dimensions.get("window").width / 2 - 30,
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
                    // marginLeft: 15,
                    // marginRight: 15,
                    // top:-80
                    
                }}
            >
                <FastImage
                    source={{
                        uri: `${item?.url}`,
                        priority: FastImage.priority.high,
                    }}
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
                    {item.name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                    {/* <Image
                        style={{
                            height: 14,
                            width: 14,
                            marginTop: 6,
                            marginLeft: 8,
                        }}
                        source={require("../assets/images/speedometer.png")}
                        resizeMode="contain"
                    /> */}
                    <Text
                        numberOfLines={2}
                        style={{
                            textAlign: "left",
                            fontSize: 12,
                            fontFamily: fonts.Urbanist_Regular,
                            color: colors.grey500,
                            marginTop: 5,
                            marginLeft: 4,
                            marginRight: 8,
                        }}
                    >
                        {/* {item.mileage + " kms"} */}
                      Total Post  {item.total_post}
                    </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    {/* <Text
                        numberOfLines={2}
                        style={{
                            marginBottom: 10,
                            textAlign: "left",
                            fontSize: 12,
                            fontFamily: fonts.Urbanist_SemiBold,
                            color: colors.black,
                            marginTop: 5,
                            marginLeft: 8,
                            marginRight: 8,
                        }}
                    >
                        {"Rs " + item.mileage}
                    </Text> */}
                    {/* <Text
                        numberOfLines={2}
                        style={{
                            marginBottom: 10,
                            textAlign: "left",
                            fontSize: 12,
                            fontFamily: fonts.Urbanist_Regular,
                            color: colors.grey500,
                            marginTop: 5,
                            marginLeft: 4,
                            marginRight: 8,
                            textDecorationLine: "line-through",
                            textDecorationStyle: "solid",
                        }}
                    >
                        {"Rs " + item.mileage}
                    </Text> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(LocationView);

const styles = StyleSheet.create({})
