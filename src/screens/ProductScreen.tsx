/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FAButton from "../components/FAButton";
import { Width, colors, fonts } from "../configs/Configs";
import { fontStyles } from "../style/FontsStyle";
import { WebView } from "react-native-webview";
import Colors from "../configs/Colors";
import { Searchbar } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { ImageSlider } from "@pembajak/react-native-image-slider-banner";
import BackButton from "../components/BackButton";
import AppSetting from "../configs/AppSettings";
import useHomeAPI from "../hooks/useHomeAPI";
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import useProductAPI from "../hooks/useProductAPI";
import { NewCollectionList } from "../model/useProductModel";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";


interface Product {
  // Define the structure of the product object
  // For example:
  id: string;
  name: string;
  // Add more properties as needed
}


const ProductScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  const { isLoading: loading, get_product_list } = useProductAPI();
  const [categoryId, setCategoryId] = React.useState(route.params?.categoryId);
  const [subcategoryId, setSubCategoryId] = React.useState(
    route.params?.subcategoryid
  );

  const [productList, setProductList] = useState<NewCollectionList>();

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);
  useEffect(() => {
    if (isFocused) {
      get_product();
    }
  }, [isFocused]);
  const get_product = async () => {
    const response = await get_product_list(categoryId, subcategoryId);
    // console.log("get_product_response===>>>", response);
    setProductList(response);
  };

const onItemClick = (item: object) => {
  navigation.navigate("ProductDescription", { item });
}


  return (
    <View style={[styles.container,
    {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      <View style={styles.sub_navbar}>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
    <BackButton
          buttonColor={colors.white}
          buttonImage="../assets/images/left-arrow.png"
          buttonStyle={{
            width: 36,
            alignSelf: "center",
            height: 36,
            borderRadius: 0,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          numberOfLines={1}
          style={[
            fontStyles.big_title_text,
            {
              textAlign: "left",
              // textTransform: "lowercase",
              color: colors.black,
              //   lineHeight: 32,
              marginLeft: 10,
              letterSpacing: 0.3,
            },
          ]}
        >
          {AppSetting.title}
        </Text>
    </View>
    <SearchBar placeHolder={false}/>
      </View>
      <View style={[styles.container, { marginTop: 10 }]}>
        <View>
          <Text
            style={{
              marginBottom: 10,
              textAlign: "left",
              fontSize: 16,
              fontFamily: fonts.Urbanist_SemiBold,
              color: colors.black,
              marginTop: 0,
              marginLeft: 0,
            }}
          >
            {"Products"}
          </Text>
          <FlatList
            data={productList}
            refreshing={loading}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{width:Width*1,justifyContent:'space-between',alignItems:'center',padding:'5%'}}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    marginBottom: 10,
                    textAlign: "left",
                    fontSize: 16,
                    fontFamily: fonts.Urbanist_SemiBold,
                    color: colors.black,
                    marginTop: 200,
                    marginLeft: 20,
                  }}
                >
                  {"No products found for the specified category"}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                // onPress={onItemClick}
                onPress={() => onItemClick(item)}
                activeOpacity={1.0}
              >
                <View style={styles.horizontalContainer}>
                  <View
                    style={{
                      // height: 250,
                      width: 180,
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
                      marginBottom: 24,
                    }}
                  >
                    <FastImage
                      source={
                        item.featured_img
                          ? {
                              uri: item.featured_img,
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
                      {item.unique_id}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
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
                    </View>
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
                        {"Rs " + item.mileage}
                      </Text>
                      <Text
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
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </View>
    </View>
  );
};
export default ProductScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "column",
    alignItems: "center",
  },
  sub_navbar: {
    width: "100%",
    height: 49,
    // marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    // backgroundColor: Colors.black,
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: Colors.greyTextField,
  },
  search_bar_style: {
    width: "90%",
    justifyContent: "flex-start",
    flexDirection: "row",
    // backgroundColor: Colors.black,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  image_slider_container: {
    flexDirection: "column",
    // alignItems: 'center',
    // backgroundColor: colors.white,
    // height: 250,
  },
  grid_image: {
    resizeMode: "contain",
    height: 40,
    width: 40,
    // backgroundColor: colors.grey600,
  },
  tab_image: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 30,
    width: 30,
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  button_container: {
    height: 120,
    width: "100%",
    marginTop: 0,
    paddingHorizontal: 40,
    marginBottom: 40,
    flexDirection: "column",
    // backgroundColor: colors.black,
    justifyContent: "space-between",
  },
  itemContainer: {
    width: Dimensions.get("window").width / 3,
    height: 150,
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: Colors.darkYellow,
    // borderRadius: (Dimensions.get('window').width / 2.5)/2,
  },
  horizontalContainer: {
    // height: 150,
    // backgroundColor: Colors.darkYellow,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin:10,
    // borderWidth: 2,
    // borderColor: Colors.darkYellow,
    // borderRadius: (Dimensions.get('window').width / 2.5)/2,
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
  },
  tab_lable_item: {
    // flex: 1,
    // margin: 3,
    // backgroundColor: 'lightblue',
    textAlign: "center",
    fontSize: 12,
    fontFamily: fonts.Urbanist_SemiBold,
    color: colors.black,
  },
  heading_txt_style: {
    marginLeft: 12,
    textAlign: "left",
    fontSize: 20,
    fontFamily: fonts.Urbanist_Regular,
    fontWeight: "700",
    color: colors.black,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
});
