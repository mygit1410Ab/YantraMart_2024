import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors, { formatIndianNumber } from '../configs/Colors'
import { colors, fonts } from '../configs/Configs'
import FastImage from 'react-native-fast-image'


const ThreeProductView = ({item,onPress,Image_Url}) => {
  let price = null;
  if (item.ask_for_price === "1" || item.price !== "0.00") {
    if (item.ask_for_price === "1") {
      price = 'Contact for price';
    } else {
      const formattedPrice = formatIndianNumber(item.price);
      price = formattedPrice;
    }
  } else {
    price = 'Contact for price';
  }
  // console.log('===========>====',JSON.parse(item.title).en)
  return (
    <TouchableOpacity
    onPress={() => onPress(item)}
    activeOpacity={0.7}
  >

    <View
      style={{
        // height: 250,
        width:
          Dimensions.get("window").width / 3 - 10,
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
        marginLeft:5,
        marginRight:5,
        marginTop:20
      }}
    >
      <FastImage
        source={
          item.featured_img
            ? {
              uri: `${Image_Url}${item.featured_img}`,
              priority: FastImage.priority.high,
               
            }
            : require("../assets/images/material.png")
        }
        resizeMode="cover"
        style={{
          height: 120,
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
        {JSON.parse(item.title).en}
      </Text>
      {/* <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            height: 14,
            width: 14,
            marginTop: 6,
            marginLeft: 8,
          }}
          source={require("../assets/images/speedometer.png")}
          resizeMode="contain"
        />
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
          {item.mileage + " kms"}
        </Text>
      </View> */}
      <View style={{ flexDirection: "row" }}>
        <Text
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
          {"Rs "+price}
        </Text>
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
    {/* <View style={styles.horizontalContainer}>
     
    </View> */}
  </TouchableOpacity>
  )
}

export default React.memo(ThreeProductView);

const styles = StyleSheet.create({})