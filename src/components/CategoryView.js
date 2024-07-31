import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../configs/Colors'
import { colors, fonts } from '../configs/Configs'
import FastImage from 'react-native-fast-image'
import AppSetting from '../configs/AppSettings'
import { useNavigation } from '@react-navigation/native'

const CategoryView = ({ item,}) => {
  const navigation=useNavigation()

  const onCategoryClick = (categoryid) => {
    if(item.itemType === 'category'){
      navigation.navigate("SubCategoryScreen",{
        cateogoryId: categoryid,
      })
    }else if (item.itemType === 'sub_category'){
      navigation.navigate("SubCatProductScreen",{
        cateogoryId: categoryid,
      })
    }
  };
  const onCatclick = (item) => {
    // console.log('------->',item)
    onCategoryClick(item);

  }
    return (
        <TouchableOpacity
        // onPress={onCatclick}
        onPress={() => onCatclick(item)}
        
        // disabled={true}
        activeOpacity={1.0}
      >
        <View style={styles.itemContainer}>
          <View
            style={{
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: colors.darkGreen,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "black",
              shadowOpacity: 0.26,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 10,
              elevation: 3,
              backgroundColor: Colors.white,
            }}
          >
            <FastImage
              source={{
                uri: `${item.image}`,
                priority: FastImage.priority.high,
              }}
              resizeMode="contain"
              style={styles.grid_image}
            />
          </View>
          {item.name &&<Text style={styles.item}>{item.name}</Text>}
          {item.title &&<Text style={styles.item}>{item.title}</Text>}

        </View>
      </TouchableOpacity>
    )
}

export default React.memo(CategoryView);

const styles = StyleSheet.create({
    itemContainer: {
        width: Dimensions.get("window").width / 3,
        // height: 130,
        backgroundColor: Colors.white,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // borderWidth: 2,
        // borderColor: Colors.darkYellow,
        // borderRadius: (Dimensions.get('window').width / 2.5)/2,
      },
      grid_image: {
        resizeMode: "contain",
        height: 66,
        width: 66,
        // backgroundColor: colors.grey600,
      },
      item: {
        // flex: 1,
        // margin: 3,
        // backgroundColor: 'lightblue',
        marginBottom: 12,
        textAlign: "center",
        fontSize: 14,
        fontFamily: fonts.Urbanist_Medium,
        color: colors.black,
        marginTop: 6,
        marginLeft: 6,
        marginRight: 6,
      },
})
