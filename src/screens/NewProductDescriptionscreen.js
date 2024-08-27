import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, FlatList, Alert, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Height, Width, colors, fonts } from '../configs/Configs';
import { fontStyles } from '../style/FontsStyle';
import TopHeader from '../components/TopHeader';
import MyCarousel from '../components/ProductImageCarousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImageView from "react-native-image-viewing";
import Entypo from 'react-native-vector-icons/Entypo'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Get_Explore_Deal_Product, Get_New_Collection_Product } from '../api/service';
import FastImage from 'react-native-fast-image';
import Colors, { formatIndianNumber } from '../configs/Colors';
import ImageGallery from '../components/ImageGallery';
import axios from 'axios';
import HorzontalProductView from '../components/HorzontalProductView';
import call from 'react-native-phone-call'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';









const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.75);

const transformGalleryData = (data) => {
  return data.map(item => ({
    source: {
      uri: item.galleryimages,
    },

  }));
};



const NewProductDescriptionscreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const scrollViewRef = useRef(null);
  const { item } = route.params
  // console.log('item----> :', item);
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState('')
  const [country, setCountry] = useState(null)
  const [city, setCity] = useState(null)
  const [brand, setBrand] = useState(null)
  const [price, setPrice] = useState(null)
  const [category, setcategory] = useState(null)
  const [visible, setIsVisible] = useState(false);
  const [fulldes, setFulldes] = useState(false);
  const [productDetails, setProductDetails] = useState(null)
  const [exploreDealList, setExploreDealList] = useState(null);
  const [gallerydata, setGallerydata] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const gallery_Url = 'https://yantramart.com/uploads/gallery/';
  // const thumbs_Image_Url = 'https://yantramart.com/uploads/thumbs/';
  const thumbs_Image_Url = 'https://yantramart.com/uploads/images/';






  useEffect(() => {
    const backAction = () => {
      navigation.navigate('MainTabScreen', { screen: 'Home' });
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);



  useEffect(() => {
    const get_Recent_Deals_list = async () => {
      try {
        const response = await Get_New_Collection_Product();
        // console.log("get_Recent_Deals_list===>>>", response);
        setExploreDealList(response.data);
      } catch (error) {
        console.error('related products fetching error', error);
      }
    };
    const get_ProductDetails = async () => {
      try {
        const res = await axios.post(`https://www.yantramart.com/en/api/App_api/getProductDetail?unique_id=${item.unique_id}`);
        // console.log('============>product_detail', res.data);
        setProductDetails(res.data.product_detail[0]);
        const data = [
          { uri: `${item.image}` },
        ];
        const newData = res.data.gallery.map((item) => {
          const itemWithUrl = `${item.galleryimages}`
          return { uri: itemWithUrl };
        });
        const ned = [...data, ...newData]
        setGallerydata(ned);
      } catch (error) {
        console.log('get_Subcategory_Products fetching error', error);
      }
    };
    get_ProductDetails()
    get_Recent_Deals_list();
  }, [item,]);


  // console.log('gallerydata=========>', gallerydata)



  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  const onItemClick = (item) => {
    const newItemData = {
      image: `${thumbs_Image_Url}${item.featured_img}`,
      unique_id: item.unique_id
    }
    // console.log(newItemData)

    navigation.navigate("NewProductDescriptionscreen", { item: newItemData });
    scrollToTop()
  }


  const renderItemRelatedProduct = useCallback(({ item }) => {
    // console.log('----------->item', item)
    return <HorzontalProductView item={item} onPress={onItemClick} Image_Url={thumbs_Image_Url} />;
  }, []);




  const callHandler = () => {
    if (productDetails.phone) {
      try {
        const args = {
          number: productDetails.phone, // String value with the number to call
          prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
          skipCanOpen: true // Skip the canOpenURL check
        }

        call(args).catch(console.error)
      } catch (error) {
        console.log(error)
      }
    } else {
      Alert.alert('Contact Dealer', 'Contact is not available.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
  }




  const source = {
    html: productDetails?.description
  };
  const { width } = Width * 1;

  return (
    <>
      {visible == true ?
        <View style={[styles.mainCard, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: '#000',
          justifyContent: 'center'
        }]}>

          <ImageView
            images={gallerydata}
            imageIndex={0}
            visible={visible}
            animationType={'slide'}
            doubleTapToZoomEnabled={true}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
        :
        <View style={[styles.mainCard, {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }]}>
          <TopHeader wishList={true} search={true} />
          <ScrollView
            bounces={false}
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={{}}>
              <View style={[styles.sliderCard, { height: itemWidth }]}>
                {/* <TouchableOpacity style={styles.shareBtn}>
                  <FontAwesome name='share' size={30} color={'#000'} />
                </TouchableOpacity> */}
                {gallerydata && <MyCarousel
                  data={gallerydata}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  visible={visible}
                  setIsVisible={setIsVisible}
                />}
              </View>
              <View style={styles.prodctNameCard}>
                <View>
                  <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>
                    {productDetails?.title.split(' ').slice(0, 1)}{' '}{productDetails?.title.split(' ').slice(1, 2)}{' '}
                    <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>{productDetails?.title.split(' ').slice(2, 3)}</Text>
                  </Text>
                  {/* <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>{productDetails?.title?.substring(20)}</Text> */}
                  <Text style={[fontStyles.big_title_text, { color: '#000', marginTop: 5 }]}>
                    Rs {productDetails?.price}
                  </Text>
                </View>
                {/* <TouchableOpacity style={styles.likeBtn}>
                  <MaterialCommunityIcons name='heart-plus-outline' size={30} color={'black'} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.prodctNameCard}>
                {productDetails?.total_view &&
                  <View style={{ flexDirection: 'row' }}>
                    <Entypo name='eye' size={30} color={'#000'} />
                    <Text style={[fontStyles.caption_text, { color: '#000', marginTop: 5 }]}>{'  '}{productDetails?.total_view}</Text>
                  </View>
                }
              </View>
              {/* {productDetails?.description &&
                <>
                  <View style={styles.descriptionCard}>
                    <Text style={[fontStyles.big_title_text, { color: '#000', marginTop: 5 }]}>Description</Text>
                    {productDetails?.description.length > 300 ?

                      <View>
                        <View style={{ height: 80, overflow: 'hidden', display: fulldes === true && 'none' }}>
                          <RenderHtml
                            contentWidth={Width * 1}
                            source={source}
                          />

                        </View>
                        <Text
                          onPress={() => setFulldes(!fulldes)}
                          style={[fontStyles.bigButton_text, { color: colors.darkGreen, fontSize: 16, marginTop: 5, }]}>
                          {!fulldes ? "View more" : "View less"}
                        </Text>
                      </View>
                      :
                      <View>

                      </View>
                    }

                    {fulldes &&
                      <RenderHtml
                        contentWidth={Width * 1}
                        source={source}
                      />

                    }
                  </View>

                </>
              } */}
              <View style={styles.tableCard}>
                {productDetails?.brand_model &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/brand-image.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Brand & Model"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails.brand_model}</Text>
                    </View>
                  </View>
                }
                {productDetails?.purpose &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/target.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Purpose"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.purpose}</Text>
                    </View>
                  </View>
                }

                {productDetails?.category_name &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={[styles.iconStyle, { tintColor: '#006B3D' }]}
                      source={require('../assets/images/categorization.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Category"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.category_name}</Text>
                    </View>
                  </View>
                }
                {productDetails?.full_address &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/countries.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>
                        {"Address"}
                      </Text>
                      {productDetails?.full_address.length > 0 && (
                        <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                          {productDetails?.full_address.substring(0, 30)}
                        </Text>
                      )}
                      {productDetails?.full_address.length > 30 && (
                        <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                          {productDetails?.full_address.substring(30, 60)}
                        </Text>
                      )}
                      {productDetails?.full_address.length > 60 && (
                        <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                          {productDetails?.full_address.substring(60, 90)}
                        </Text>
                      )}
                      {productDetails?.full_address.length > 90 && (
                        <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                          {productDetails?.full_address.substring(90)}
                        </Text>
                      )}
                    </View>

                  </View>
                }
                {productDetails?.location &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/city.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"City"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.location.substring(0, 35)}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.location.substring(35)}</Text>
                    </View>
                  </View>
                }
                {productDetails?.added &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/condition.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Added"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.added}</Text>
                    </View>
                  </View>
                }

                {productDetails?.mileage &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/meliage.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Km/Hr Run"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.mileage}</Text>
                    </View>
                  </View>
                }

                {productDetails?.fuel_type &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/energy.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Fuel type"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.fuel_type}</Text>
                    </View>
                  </View>
                }
                {productDetails?.year &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/model.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Make Year"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.year}</Text>
                    </View>
                  </View>
                }
                {productDetails?.address &&
                  <View style={styles.tableContaintCard}>
                    <Image
                      resizeMode='contain'
                      style={styles.iconStyle}
                      source={require('../assets/images/office.png')}
                    />
                    <View style={styles.tableTextCard}>
                      <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Office address"}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.address.replace(/<br\s*\/?>/gi, '').substring(0, 30)}</Text>
                      <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{productDetails?.address.replace(/<br\s*\/?>/gi, '').substring(30, 60)}</Text>

                    </View>
                  </View>
                }

                {/* {item.office_name &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/name.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Office name"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.office_name.substring(0, 30)}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.office_name.substring(30)}</Text>
                                        </View>
                                    </View>
                                } */}

                {/* {item.transmission &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/meliage.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Transmission"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.transmission}</Text>
                                        </View>
                                    </View>
                                } */}

                {/* {item.search_meta &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/wheel.png')}
                                        />
                                        <View style={[styles.tableTextCard, { width: '85%' }]}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Search_meta"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                                                {item.search_meta.substring(0, 100)}....
                                            </Text>
                                        </View>
                                    </View>
                                } */}
              </View>
              <View style={{ backgroundColor: '#FFF', alignItems: 'flex-start', overflow: 'visible', paddingTop: 10 }}>
                <Text style={[fontStyles.big_title_text, { color: '#000', left: '5%', paddingVertical: '3%', }]}>
                  More Product
                </Text>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  data={exploreDealList}
                  contentContainerStyle={{ paddingLeft: '3%', paddingVertical: 10 }}
                  renderItem={renderItemRelatedProduct}
                  keyExtractor={(photo) => photo.id}
                />
              </View>

              <View style={styles.galleryCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image
                    resizeMode='contain'
                    style={{ height: 30, width: 30 }}
                    source={require('../assets/images/gallery.png')}
                  />
                  <Text style={[fontStyles.big_title_text, { color: '#000' }]}>
                    {"    Gallery"}
                  </Text>
                </View>
                <View style={styles.containerGallery}>
                  {gallerydata?.map((img, uri) => (
                    <View style={{ flex: 1 }}>
                      <FastImage
                        key={uri}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.image}
                        source={{
                          uri: img.uri,
                          priority: FastImage.priority.high,
                        }}
                      />
                    </View>
                  ))}
                </View>

              </View>
            </View>

          </ScrollView>
          <View

            style={styles.contactBtnCard}>
            {/* <TouchableOpacity style={{ backgroundColor: '#09c2f1', padding: 8, borderRadius: 15 }}>
              <Text style={[fontStyles.title_text, { color: '#fff', }]}>
                Get BestDeals
              </Text>
               <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={20}
                  reviewColor={'#FFAF45'}
                  showRating={false}
                  defaultRating={4}
                  onFinishRating={this.ratingCompleted}
                />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={callHandler}
              style={{ backgroundColor: '#1ad197', padding: 8, borderRadius: 15 }}>
              <Text style={[fontStyles.title_text, { color: '#fff', }]}>
                Contact Dealer
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      }
    </>
  )
}

export default NewProductDescriptionscreen

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  sliderCard: {
    // borderWidth: 1,
    // height: Height * 0.4,
    backgroundColor: 'rgba(158, 192, 39, 0.8)',
    backgroundColor: 'rgba(158, 192, 39, 0.8)'

  },
  prodctNameCard: {
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    flexDirection: 'row',
    width: sliderWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: 'gray'
  },
  nameStyle: {
    marginBottom: 10,
    textAlign: "left",
    fontSize: 20,
    fontFamily: fonts.Urbanist_SemiBold,
    color: colors.black,
    flex: 1
  },
  shareBtn: {
    padding: 3,
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    right: "5%",
    top: "2%"
  },
  likeBtn: {
    padding: 5, backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5
  },
  descriptionCard: {
    // borderWidth: 1,
    paddingHorizontal: '5%',
  },
  tableCard: {
    // borderWidth: 1,
    padding: '5%',
    // alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
    shadowColor: '#171717',
  },
  tableContaintCard: {
    backgroundColor: 'rgba(158, 192, 39, 1)',
    // width: '45%',
    paddingHorizontal: '1%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: colors.darkGreen,
    marginBottom: 15,
    borderEndWidth: 2,
    alignItems: 'center',
    paddingVertical: 3,
    justifyContent: 'flex-start'
  },
  iconStyle: {
    height: 40,
    width: 40,
  },
  tableTextCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 4,
  },
  relatedProductView: {
    height: Height * 0.28,
    flex: 1, width: Width * 0.6,
    backgroundColor: '#FFF',
    borderRadius: 25,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
    shadowColor: '#171717',
  },
  contactBtnCard: {
    // backgroundColor: colors.lightGreen,
    width: '100%',
    height: '6%',
    // borderRadius: 25,
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 0.5,
    // shadowColor: '#171717',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '3%',
    flexDirection: 'row',
    // borderWidth: 1
  },
  galleryCard: {
    // borderWidth: 1, 
    padding: '5%',
    marginBottom: Height * 0.1,
  },
  containerGallery: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1
    backgroundColor: 'rgba(158, 192, 39, 0.4)',
    marginTop: 20

  },
  image: {
    height: 300,
    width: 300,
    // marginBottom: 20, // Add spacing between images if needed
    alignSelf: 'center',
    flex: 1,
    backgroundColor: 'gray'
  },

})








// const ProductItem = React.memo(({ item }) => {
//     // console.log('------------>',item)
//     return (
//         <TouchableOpacity
//             onPress={() => onItemClick(item)}
//             activeOpacity={1.0}
//         >
//             <View style={styles.horizontalContainer}>
//                 <View
//                     style={{
//                         // height: 250,
//                         width: 200,
//                         borderWidth: 0,
//                         borderColor: Colors.greyTextField,
//                         borderRadius: 15,
//                         justifyContent: "flex-start",
//                         // alignContent: "center",
//                         // alignItems: "center",
//                         shadowColor: "black",
//                         shadowOpacity: 0.26,
//                         shadowOffset: { width: 0, height: 2 },
//                         shadowRadius: 10,
//                         elevation: 3,
//                         backgroundColor: colors.white,
//                         marginBottom: 24,
//                         // marginLeft:,
//                         marginHorizontal: 15
//                     }}
//                 >
//                     <FastImage
//                         source={
//                             item.featured_img
//                                 ? {
//                                     uri: `${thumbs_Image_Url}${item.featured_img}`,
//                                     priority: FastImage.priority.high,

//                                 }
//                                 : require("../assets/images/material.png")
//                         }
//                         resizeMode="cover"
//                         style={{
//                             height: 150,
//                             width: "100%",
//                             borderTopLeftRadius: 15,
//                             borderTopRightRadius: 15,
//                         }}
//                     />
//                     <Text
//                         numberOfLines={2}
//                         style={{
//                             marginBottom: 0,
//                             textAlign: "left",
//                             fontSize: 14,
//                             fontFamily: fonts.Urbanist_SemiBold,
//                             color: colors.black,
//                             marginTop: 6,
//                             marginLeft: 8,
//                             marginRight: 8,
//                         }}
//                     >
//                         {item.unique_id}
//                     </Text>
//                     <View style={{ flexDirection: "row" }}>
//                         <Image
//                             style={{
//                                 height: 14,
//                                 width: 14,
//                                 marginTop: 6,
//                                 marginLeft: 8,
//                             }}
//                             source={require("../assets/images/speedometer.png")}
//                             resizeMode="contain"
//                         />
//                         <Text
//                             numberOfLines={2}
//                             style={{
//                                 textAlign: "left",
//                                 fontSize: 12,
//                                 fontFamily: fonts.Urbanist_Regular,
//                                 color: colors.grey500,
//                                 marginTop: 5,
//                                 marginLeft: 4,
//                                 marginRight: 8,
//                             }}
//                         >
//                             {item.mileage + " kms"}
//                         </Text>
//                     </View>
//                     <View style={{ flexDirection: "row" }}>
//                         <Text
//                             numberOfLines={2}
//                             style={{
//                                 marginBottom: 10,
//                                 textAlign: "left",
//                                 fontSize: 12,
//                                 fontFamily: fonts.Urbanist_SemiBold,
//                                 color: colors.black,
//                                 marginTop: 5,
//                                 marginLeft: 8,
//                                 marginRight: 8,
//                             }}
//                         >
//                             {"Rs " + item.mileage}
//                         </Text>
//                         <Text
//                             numberOfLines={2}
//                             style={{
//                                 marginBottom: 10,
//                                 textAlign: "left",
//                                 fontSize: 12,
//                                 fontFamily: fonts.Urbanist_Regular,
//                                 color: colors.grey500,
//                                 marginTop: 5,
//                                 marginLeft: 4,
//                                 marginRight: 8,
//                                 textDecorationLine: "line-through",
//                                 textDecorationStyle: "solid",
//                             }}
//                         >
//                             {"Rs " + item.mileage}
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// });


{/* {fulldes !== true ? (
                                            <Text style={[fontStyles.caption_text, { color: '#000', marginTop: 5 }]}>
                                                {description.substring(0, 120)}....
                                            </Text>
                                        ) : (
                                            <Text style={[fontStyles.caption_text, { color: '#000', marginTop: 5 }]}>
                                                {description}
                                            </Text>
                                        )}
                                        {description.length > 120 && (
                                            fulldes !== true ? (
                                                <Text onPress={() => setFulldes(!fulldes)} style={[fontStyles.big_title_text, { color: '#006B3D' }]}>
                                                    view more
                                                </Text>
                                            ) : (
                                                <Text onPress={() => setFulldes(!fulldes)} style={[fontStyles.big_title_text, { color: '#006B3D' }]}>
                                                    hide
                                                </Text>
                                            )
                                        )} */}