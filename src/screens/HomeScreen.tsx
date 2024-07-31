/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
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
// import { Searchbar } from "react-native-paper";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useHomeAPI from "../hooks/useHomeAPI";
import {
  ICategory,
  IDiscountBannerImage,
  ISliderImage,
} from "../model/useHomeModel";
import FastImage from "react-native-fast-image";
import useProductAPI from "../hooks/useProductAPI";
import { NewCollectionList } from "../model/useProductModel";
import AppSetting from "../configs/AppSettings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import TwoColumnProdctView from "../components/TwoColumnProdctView";
import SliderView from "../components/SliderView";
import HorzontalProductView from "../components/HorzontalProductView";
import LocationView from "../components/LocationView";
import TopUserView from "../components/TopUserView";
import BlogView from "../components/BlogView";
import CategoryView from "../components/CategoryView";
import ThreeProductView from "../components/ThreeProductView";






const HomeScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();



  const {
    isLoading: loading,
    get_category,
    get_slider,
    // get_discounted_Banner,
    get_TopUser
  } = useHomeAPI();
  const {
    get_new_collection_product,
    // get_popular_product,
    get_Blogs,
    get_explore_deal_product,
  } = useProductAPI();

  const [categorylist, setCategoryList] = useState<ICategory[]>([]);
  const [sliderlist, setSliderList] = useState<ISliderImage[]>([]);
  const [topUsers, setTopUsers] = useState<ISliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const Category_Image_Url = 'https://yantramart.com//uploads/car-icons/';
  const thumbs_Image_Url = 'https://yantramart.com/uploads/images/';
  // const thumbs_Image_Url = 'https://yantramart.com/uploads/thumbs/';
  const slider_Image_Url = 'https://yantramart.com/uploads/slider/';


  interface Product {
    id: number;
    name: string;
    // Add other relevant properties of a product
    [key: string]: any;
  }

  const [showHeader, setShowHeader] = useState(true);
  

  const [newCollectionProductList, setNewCollectionProductList] = useState<Product[]>([]);



  useEffect(() => {
    if (isFocused) {
      // AppSetting.auth_token = '';
      get_category_list();
      get_slider_list();
      // get_discountedbanner();
      // get_popular_product_list()
      get_Recent_Deals_list();
      // get_Tpo_Loacations_list();
      get_Top_Users_list()
        // get_Blog_list()

    }
  }, [isFocused]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderlist.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);
  const get_category_list = async () => {
    const response = await get_category();
    // console.log("get_category_list===>>>", response);
    setCategoryList(response);
  };
  const get_slider_list = async () => {
    const response = await get_slider();
    // console.log("get_slider_list_product===>>>", response);
    setSliderList(response);
  };
  const get_Top_Users_list = async () => {
    const response = await get_TopUser();
    // console.log("get_Top_Users_list===>>>", response);
    setTopUsers(response);
  };

  const get_Recent_Deals_list = async (): Promise<Product[]> => {
    const response = await get_new_collection_product();
    // console.log("get_Recent_Deals_list===>>>", response);
    setNewCollectionProductList(response);
  };
  const get_Tpo_Loacations_list = async () => {
    const response = await get_explore_deal_product();
    // console.log("get_Tpo_Loacations_list===>>>", response);
    setExploreDealList(response);
  };




  const renderCategoryList = useCallback(
    ({ item }: { item: ItemType }) => {
      const newItem = { ...item, itemType: 'category' };
  
      return (
        <CategoryView item={newItem} />
      );
    },
    []
  );


  const RecentDealClick = (item: object) => {
    // console.log(item.featured_img)
    const newItemData={
      image:`${thumbs_Image_Url}${item.featured_img}`,
      unique_id:item.unique_id
    }
    // console.log(newItemData)

    navigation.navigate("NewProductDescriptionscreen", {item:newItemData});
  }


  interface ItemType {
    [key: string]: any;
  }


  const renderRecentDealList = useCallback(
    ({ item }: { item: ItemType }) => {
      return (
        <ThreeProductView item={item} onPress={RecentDealClick} Image_Url={thumbs_Image_Url} />
      );
    },
    [RecentDealClick, thumbs_Image_Url]
  );





  const renderTopUserList = useCallback(
    ({ item }: { item: ItemType }) => {
      return (
        <TopUserView item={item} />
      );
    },
    []
  );


  

  const keyExtractor = useCallback((photo: any) => photo.id, []);
  const keyExtractorLocation = useCallback((photo: any) => photo.user_id, []);
  // const keyExtractorBlogs = useCallback((item: any) => item.date, []);

  const handleScrollEnd = useCallback(async () => {
    // console.log('scroll Called');
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await get_new_collection_product();
      setNewCollectionProductList((prevProducts) => [...prevProducts, ...response]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore]);




  const keyExtractorCategory = useCallback((photo: any) => photo.count, []);


  const onScroll = (event:any) => {
    // const currentOffset = event.nativeEvent.contentOffset.y;
    // const direction = currentOffset > scrollPos.current ? 'down' : 'up';
    // scrollPos.current = currentOffset;
    
    // if (direction === 'down' && showHeader) {
    //   setShowHeader(false);
    // } else if (direction === 'up' && !showHeader) {
    //   setShowHeader(true);
    // }
  };
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Math.round(sliderWidth * 0.75);
  const ITEM_HEIGHT = 150; 
  
  return (
    <View style={[styles.container, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      <View style={styles.sub_navbar}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo_symbol.png")}
        />
        <View style={{ flex: 1 }} />
        <Image
          style={styles.logo_notification}
          source={require("../assets/images/notification.png")}
        />
        <Image
          style={styles.logo_heartIcon}
          source={require("../assets/images/heart.png")}
        />
      </View>
      {showHeader && <SearchBar placeHolder={true} />}
      <View style={[{ marginTop: Platform.OS === 'ios' ? 0 : 10 }]}>
        <View style={{ flex: 1, height: '100%', width: Width * 1, }}>
          {(() => {
            if (newCollectionProductList.length > 0) {
              return (
                <FlatList
                  refreshing={loading}
                  onRefresh={get_Recent_Deals_list}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ gap: 10, paddingBottom: 100, overflow: 'visible' }}
                  ListEmptyComponent={<View></View>}
                  data={newCollectionProductList}
                  renderItem={renderRecentDealList}
                  keyExtractor={keyExtractor}
                  numColumns={3}
                  scrollEventThrottle={16}  // lower value for more frequent updates
                  initialNumToRender={12}
                  maxToRenderPerBatch={10}
                  windowSize={21}
                  onScroll={onScroll}
                  onEndReachedThreshold={0.2}
                  removeClippedSubviews={true}  // unload items outside of view
                  getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                  )}
                  onEndReached={handleScrollEnd}
                  ListHeaderComponent={
                    <View>
                      <View style={styles.image_slider_container}>
                        <View
                          style={{
                            // height: 130,
                            width: "100%",
                            flexDirection: "row",
                            // backgroundColor: colors.darkYellow,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            // marginBottom: 20,
                            // marginTop: 10,
                            // borderWidth:1
                          }}
                        >
                          <SliderView data={sliderlist} sliderWidth={sliderWidth} itemWidth={itemWidth} />

                        </View>

                      </View>
                      <View style={{}}>
                        <Text
                          style={{
                            marginBottom: 10,
                            textAlign: "left",
                            fontSize: 20,
                            fontFamily: fonts.Urbanist_SemiBold,
                            color: colors.black,
                            // marginTop: 20,
                            marginLeft: 20,
                          }}
                        >
                          {"Top Category"}
                        </Text>
                        <View style={{ flex: 1, overflow: 'visible' }}>
                          <FlatList
                            horizontal
                            refreshing={loading}
                            pagingEnabled
                            // estimatedItemSize={200}
                            renderItem={renderCategoryList}
                            keyExtractor={keyExtractorCategory}
                            contentContainerStyle={{ overflow: 'visible', }}
                            showsHorizontalScrollIndicator={false}
                            data={categorylist}
                          />
                        </View>
                      </View>

                      <View style={{ alignItems: 'flex-start', }}>
                        <Text
                          style={{
                            marginBottom: 10,
                            textAlign: "left",
                            fontSize: 20,
                            fontFamily: fonts.Urbanist_SemiBold,
                            color: colors.black,
                            // marginTop: 20,
                            marginLeft: 20,
                          }}
                        >
                          {"Top Users"}
                        </Text>
                        <FlatList
                          horizontal
                          pagingEnabled={true}
                          refreshing={loading}
                          showsHorizontalScrollIndicator={false}
                          legacyImplementation={false}
                          contentContainerStyle={{}}
                          data={topUsers}
                          renderItem={renderTopUserList}
                          keyExtractor={keyExtractorLocation}
                        />
                      </View>
                      <Text
                        style={{
                          marginBottom: 10,
                          textAlign: "left",
                          fontSize: 20,
                          fontFamily: fonts.Urbanist_SemiBold,
                          color: colors.black,
                          // marginTop: 20,
                          marginLeft: 20,
                        }}
                      >
                        {"Recent Deals"}
                      </Text>

                    </View>
                  }
                />
              );
            }

            return (
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
                    marginTop: 0,
                    marginLeft: 20,
                  }}
                >
                  {"Loading..."}
                </Text>
              </View>
            );
          })()}
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "column",
    alignItems: "center",
    // borderWidth:1
  },
  sub_navbar: {
    width: "100%",
    height: 49,
    // marginTop: 20,
    justifyContent: "flex-start",
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
    marginBottom: 10,
    // borderWidth:1
  },
  image_slider_container: {
    flexDirection: "column",
    // alignItems: 'center',
    // backgroundColor: colors.white,
    // height: 250,
  },
  grid_image: {
    resizeMode: "contain",
    height: 66,
    width: 66,
    // backgroundColor: colors.grey600,
  },
  slider_image: {
    height: 200,
    width: "100%",
  },
  tab_image: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 180,
    marginLeft: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  logo_notification: {
    resizeMode: "contain",
    height: 24,
    width: 24,
    marginRight: 14,
    flexDirection: "column",
    alignItems: "center",
  },
  logo_heartIcon: {
    resizeMode: "contain",
    height: 24,
    width: 24,
    marginRight: 20,
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
    // height: 130,
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: Colors.darkYellow,
    // borderRadius: (Dimensions.get('window').width / 2.5)/2,
  },
  sliderImageContainer: {
    width: Dimensions.get("window").width,
    height: 200,
    backgroundColor: Colors.white,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
    marginLeft: 6,
    marginRight: 6,
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




// Blogs section

{/* <View
style={{
  // marginBottom:100,
  backgroundColor: colors.white,
  // width:'100%',
  flex: 1,
  // borderWidth:1,
  // width: '100%',
  // height: '100%'

}}
>
<Text
  style={{
    marginBottom: 10,
    textAlign: "left",
    fontSize: 20,
    fontFamily: fonts.Urbanist_SemiBold,
    color: colors.black,
    marginTop: 20,
    marginLeft: 20,
  }}
>
  {"Blogs"}
</Text>
<FlatList
  pagingEnabled={true}
  // drawDistance={100}
  showsHorizontalScrollIndicator={false}
  // legacyImplementation={false}
  refreshing={loading}
  // onEndReached={onEndReached}
  onEndReachedThreshold={0.1}
  data={blogs}
  contentContainerStyle={{ paddingBottom: 200, }}
  // estimatedItemSize={200}
  renderItem={renderItem}
  keyExtractor={keyExtractorBlogs}
// numColumns={2}
/>
</View>

 */}



  // const get_discountedbanner = async () => {
  //   const response = await get_discounted_Banner();
  //   // console.log("get_discountedbanner_product_list===>>>", response);
  //   setDiscountedBanner(response);
  // };
  // const get_popular_product_list = async () => {
  //   const response = await get_popular_product();
  //   // console.log("get_popular_product_list===>>>", response);
  //   setPopularProductList(response);
  // };
{/* <View
                        style={{
                          marginBottom: 12,
                          backgroundColor: colors.lightGreen,
                          // height: 330,
                          paddingBottom:50
                        }}
                      >
                        <Text
                          style={{
                            marginBottom: 10,
                            textAlign: "left",
                            fontSize: 20,
                            fontFamily: fonts.Urbanist_SemiBold,
                            color: colors.white,
                            marginTop: 20,
                            marginLeft: 20,
                          }}
                        >
                          {"Top Locations"}
                        </Text>
                        <View style={{ flex: 1,paddingLeft:20 }}>
                          <FlatList
                            horizontal
                            pagingEnabled={true}
                            refreshing={loading}
                            showsHorizontalScrollIndicator={false}
                            // legacyImplementation={false}
                            // estimatedItemSize={200}
                            contentContainerStyle={{gap:15}}
                            data={exploreDealList}
                            renderItem={renderTopLocationList}
                            keyExtractor={keyExtractorLocation}
                          />
                        </View>
                      </View> */}




{/* <View
        style={{
          // height: 70,
          width: "100%",
          flexDirection: "row",
          // backgroundColor: colors.darkYellow,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginBottom: 0,
        }}
      >
        {(() => {
          if (discountedBanner.length > 0) {
            return (
              <FastImage
                source={
                  discountedBanner[0].featured_img
                    ? {
                      uri: discountedBanner[0].featured_img,
                    }
                    : require("../assets/images/material.png")
                }
                resizeMode="contain"
                style={{ height: 150, width: "100%" }}
              />
            );
          }

          return null;
        })()}
      </View> */}



{/* <FlashList
          data={sliderlist}
          horizontal
          estimatedItemSize={Dimensions.get("window").width}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          pagingEnabled={true}
          renderItem={sliderRenderItem}
        /> */}




          // const renderTopLocationList = useCallback(
  //   ({ item }: { item: ItemType }) => {
  //     return (
  //       <LocationView item={item} onPress={locationClick} Image_Url={thumbs_Image_Url} />
  //     );
  //   },
  //   [locationClick, thumbs_Image_Url]
  // );



  // const renderItem = useCallback(
  //   ({ item }: { item: ItemType }) => {
  //     return (
  //       <BlogView item={item} onPress={BlogItemClick} Image_Url={thumbs_Image_Url} />
  //     );
  //   },
  //   [BlogItemClick, thumbs_Image_Url]
  // );



          {/* <Text
          numberOfLines={1}
          style={[
            fontStyles.big_title_text,
            {
              textAlign: "left",
              // textTransform: "lowercase",
              color: colors.,
              //   lineHeight: 32,
              // marginLeft: 4,
              letterSpacing: 0.3,
              flexDirection:'row'
            },
          ]}
        >
          {"Mart"}
          <Text
          numberOfLines={1}
          style={[
            fontStyles.big_title_text,
            {
              textAlign: "left",
              // textTransform: "lowercase",
              color: colors.black,
              //   lineHeight: 32,
              marginLeft: 4,
              letterSpacing: 0.3,
            },
          ]}
        >
          {"YANTRAMART"}
        </Text>
        </Text> */}




        // const renderCategory = ({ item }: { item: ItemType }) => {
        //   // console.log(';;;;;;;;;;;>>>>>>>',item)
        //   return (
        //     <TouchableOpacity
        //       onPress={() => {
        //         AppSetting.title = item.title;
        //         onCategoryClick(item.id);
        //       }}
        //       disabled={true}
        //       activeOpacity={1.0}
        //     >
        //       <View style={styles.itemContainer}>
        //         <View
        //           style={{
        //             height: 100,
        //             width: 100,
        //             borderWidth: 1,
        //             borderColor: Colors.lightGreen,
        //             borderRadius: 50,
        //             justifyContent: "center",
        //             alignItems: "center",
        //             shadowColor: "black",
        //             shadowOpacity: 0.26,
        //             shadowOffset: { width: 0, height: 2 },
        //             shadowRadius: 10,
        //             elevation: 3,
        //             backgroundColor: Colors.white,
        //           }}
        //         >
        //           <FastImage
        //             source={{
        //               uri: `${item.image}`,
        //               priority: FastImage.priority.high,
        //             }}
        //             resizeMode="contain"
        //             style={styles.grid_image}
        //           />
        //         </View>
        //         <Text style={styles.item}>{item.name}</Text>
        //       </View>
        //     </TouchableOpacity>
      
        //   )
        // }
      


          // const BlogItemClick = (item: object) => {
  //   // console.log(item)
  //   // navigation.navigate("ProductDescription", { item });
  // }




    // const [discountedBanner, setDiscountedBanner] = useState<
  //   IDiscountBannerImage[]
  // >([]);

  // const [popularProductList, setPopularProductList] =
  //   useState<NewCollectionList>();








    // const get_Blog_list = async () => {
  //   const response = await get_Blogs();
  //   // console.log("get_Blog_list===>>>", response);
  //   setBlogs(response);
  // };