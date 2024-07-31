import { Image, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Height, Width, colors, fonts } from '../configs/Configs';
import { fontStyles } from '../style/FontsStyle';
import TopHeader from '../components/TopHeader';
import MyCarousel from '../components/ProductImageCarousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import ImageView from "react-native-image-viewing";
import Entypo from 'react-native-vector-icons/Entypo'
// import { Rating, AirbnbRating } from 'react-native-ratings';
import { Get_Explore_Deal_Product, Get_New_Collection_Product } from '../api/service';
import FastImage from 'react-native-fast-image';
import Colors, { formatIndianNumber } from '../configs/Colors';
import ImageGallery from '../components/ImageGallery';
import axios from 'axios';
import HorzontalProductView from '../components/HorzontalProductView';
import call from 'react-native-phone-call'









const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.75);


const ProductDescription = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const scrollViewRef = useRef(null);
    const { item } = route.params
    // console.log('item gallery:', item.gallery);
    const insets = useSafeAreaInsets();
    const [description, setDescription] = useState('')
    const [country, setCountry] = useState(null)
    const [city, setCity] = useState(null)
    const [brand, setBrand] = useState(null)
    const [price, setPrice] = useState(null)
    const [category, setcategory] = useState(null)
    const [visible, setIsVisible] = useState(false);
    const [fulldes, setFulldes] = useState(false);
    const [exploreDealList, setExploreDealList] = useState(null);
    const [gallerydata, setGallerydata] = useState(null);
    const gallery_Url = 'https://yantramart.com/uploads/gallery/';
    // const thumbs_Image_Url = 'https://yantramart.com/uploads/thumbs/';
    const thumbs_Image_Url = 'https://yantramart.com/uploads/images/';










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
        const data = [
            { uri: `${thumbs_Image_Url}${item.featured_img}` },
            // { uri: item.featured_img },
        ];
        const gallery = JSON.parse(item.gallery);
        const newData = gallery.map((item) => {
            const itemWithUrl = `${gallery_Url}${item}`
            return { uri: itemWithUrl };
        });
        const ned = [...data, ...newData]
        setGallerydata(ned);
        get_Recent_Deals_list();
    }, [item,]);






    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const onItemClick = (item) => {
        navigation.navigate("ProductDescription", { item });
        scrollToTop()
    }


    const renderItemRelatedProduct = useCallback(({ item }) => {
        // console.log('----------->item', item)
        return <HorzontalProductView item={item} onPress={onItemClick} Image_Url={thumbs_Image_Url} />;
    }, []);


    const ProductItem = React.memo(({ item }) => {
        // console.log('------------>',item)
        return (
            <TouchableOpacity
                onPress={() => onItemClick(item)}
                activeOpacity={1.0}
            >
                <View style={styles.horizontalContainer}>
                    <View
                        style={{
                            // height: 250,
                            width: 200,
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
                            // marginLeft:,
                            marginHorizontal: 15
                        }}
                    >
                        <FastImage
                            source={
                                item.featured_img
                                    ? {
                                        uri: `${thumbs_Image_Url}${item.featured_img}`,
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
        );
    });


    const callHandler = () => {
        try {
            const args = {
                number: item.phone_no, // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
                skipCanOpen: true // Skip the canOpenURL check
            }

            call(args).catch(console.error)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (item.price) {
            const formattedPrice = formatIndianNumber(item.price);
            setPrice(formattedPrice)
        }
        if (item?.description) {
            try {
                let jsonString = item.description;
                let parsedDescription = JSON.parse(jsonString);
                let data1 = parsedDescription.en.split('<p>')[1].split('</p>')[0];
                // console.log('Product description:', data);
                setDescription(data1)
            } catch (error) {
                console.error('Error parsing description:', error);
            }
        }
        if (item?.country) {
            try {
                // console.log(item.country);
                const fetchLocation = async () => {
                    const res = await axios.post(`https://yantramart.com/en/api/App_api/getLocation?id=${item.country}`);
                    // console.log(res.data.data[0].name);
                    setCountry(res.data.data[0].name);
                };

                fetchLocation();
            } catch (error) {
                console.error('Error fetching location:', error);
            }

        }
        if (item?.city) {
            try {
                // console.log(item.country);
                const fetchLocation = async () => {
                    const res = await axios.post(`https://yantramart.com/en/api/App_api/getLocation?id=${item.city}`);
                    // console.log(res.data.data[0].name);
                    setCity(res.data.data[0].name);
                };

                fetchLocation();
            } catch (error) {
                console.error('Error fetching location:', error);
            }

        }
        if (item?.brand) {
            try {
                // console.log(item.brand);
                const fetchLocation = async () => {
                    const res = await axios.post(`https://yantramart.com/en/api/App_api/getBrandById?id=${item.brand}`);
                    // console.log(res.data.data[0].name);
                    setBrand(res.data.data[0].name);
                };

                fetchLocation();
            } catch (error) {
                console.error('Error fetching location:', error);
            }

        }
        if (item?.category) {
            try {
                // console.log(item.category);
                const fetchLocation = async () => {
                    const res = await axios.post(`https://yantramart.com/en/api/App_api/getCategoryById?id=${item.category}`);
                    // console.log(res.data.data[0].title);
                    setcategory(res.data.data[0].title);
                };

                fetchLocation();
            } catch (error) {
                console.error('Error fetching location:', error);
            }

        }

    }, [item?.description]);




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

                    {/* <ImageView
                        images={gallerydata}
                        imageIndex={0}
                        visible={visible}
                        animationType={'slide'}
                        doubleTapToZoomEnabled={true}
                        onRequestClose={() => setIsVisible(false)}
                    /> */}
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
                    >
                        <View style={{}}>
                            <View style={styles.sliderCard}>
                                <TouchableOpacity style={styles.shareBtn}>
                                    <FontAwesome name='share' size={30} color={'#000'} />
                                </TouchableOpacity>
                                <MyCarousel
                                    data={gallerydata}
                                    sliderWidth={sliderWidth}
                                    itemWidth={itemWidth}
                                    visible={visible}
                                    setIsVisible={setIsVisible}
                                />
                            </View>
                            <View style={styles.prodctNameCard}>
                                <View>
                                    <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>{item.unique_id.substring(0, 20)}</Text>
                                    <Text style={[fontStyles.heading_3_text, { color: '#000' }]}>{item.unique_id.substring(20)}</Text>
                                    <Text style={[fontStyles.big_title_text, { color: '#000', marginTop: 5 }]}>
                                        Rs {price}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.likeBtn}>
                                    <MaterialCommunityIcons name='heart-plus-outline' size={30} color={'black'} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.prodctNameCard}>
                                {item.total_view &&
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name='eye' size={30} color={'#000'} />
                                        <Text style={[fontStyles.caption_text, { color: '#000', marginTop: 5 }]}>{'  '}{item.total_view}</Text>
                                    </View>
                                }

                                {/* <Rating
                                    type='star'
                                    ratingCount={5}
                                    imageSize={20}
                                    reviewColor={'#FFAF45'}
                                    showRating={false}
                                    defaultRating={4}
                                    onFinishRating={this.ratingCompleted}
                                /> */}
                            </View>
                            {item.description &&
                                <View style={styles.descriptionCard}>
                                    <Text style={[fontStyles.big_title_text, { color: '#000', marginTop: 5 }]}>Description</Text>
                                    <View style={{}}>
                                        {fulldes !== true ? (
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
                                        )}
                                    </View>

                                </View>
                            }
                            <View style={styles.tableCard}>
                                {brand &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/brand-image.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Brand"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{brand}</Text>
                                        </View>
                                    </View>
                                }
                                {item?.purpose &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/target.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Purpose"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item?.purpose}</Text>
                                        </View>
                                    </View>
                                }
                                {item?.added &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/condition.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Added"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item?.added}</Text>
                                        </View>
                                    </View>
                                }
                                {category &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={[styles.iconStyle, { tintColor: '#006B3D' }]}
                                            source={require('../assets/images/categorization.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Category"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{category}</Text>
                                        </View>
                                    </View>
                                }
                                {country &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/countries.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Country"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{country}</Text>
                                        </View>
                                    </View>
                                }
                                {city &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/city.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"City"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{city}</Text>
                                        </View>
                                    </View>
                                }
                                {item.condition &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/condition.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Condition"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.condition}</Text>
                                        </View>
                                    </View>
                                }

                                {item.mileage &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/meliage.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Km/Hr Run"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.mileage}</Text>
                                        </View>
                                    </View>
                                }
                                {item.model &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/model.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Model"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.model}</Text>
                                        </View>
                                    </View>
                                }
                                {item.office_address &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/office.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>
                                                {"Office address"}
                                            </Text>
                                            {item.office_address.length > 0 && (
                                                <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                                                    {item.office_address.substring(0, 30)}
                                                </Text>
                                            )}
                                            {item.office_address.length > 30 && (
                                                <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                                                    {item.office_address.substring(30, 60)}
                                                </Text>
                                            )}
                                            {item.office_address.length > 60 && (
                                                <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                                                    {item.office_address.substring(60, 90)}
                                                </Text>
                                            )}
                                            {item.office_address.length > 90 && (
                                                <Text style={[fontStyles.big_title_text, { color: '#000', }]}>
                                                    {item.office_address.substring(90)}
                                                </Text>
                                            )}
                                        </View>
                                    </View>
                                }

                                {item.office_name &&
                                    <View style={styles.tableContaintCard}>
                                        <Image
                                            resizeMode='contain'
                                            style={styles.iconStyle}
                                            source={require('../assets/images/name.png')}
                                        />
                                        <View style={styles.tableTextCard}>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', textDecorationLine: 'underline', }]}>{"Office name"}</Text>
                                            <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.office_name.substring(0, 30)}</Text>
                                            {item.office_name.length > 30 && <Text style={[fontStyles.big_title_text, { color: '#000', }]}>{item.office_name.substring(30)}</Text>}
                                        </View>
                                    </View>
                                }

                                {item.transmission &&
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
                                }

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
                                    // refreshing={loading}
                                    // estimatedItemSize={200}
                                    showsHorizontalScrollIndicator={false}
                                    legacyImplementation={false}
                                    data={exploreDealList}
                                    contentContainerStyle={{ paddingLeft: '3%', paddingVertical: 10 }}
                                    renderItem={renderItemRelatedProduct}
                                // keyExtractor={(photo) => photo.id}
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
                                <ImageGallery item={item.gallery} />
                            </View>
                        </View>

                    </ScrollView>
                    <View

                        style={styles.contactBtnCard}>
                        <TouchableOpacity style={{ backgroundColor: '#09c2f1', padding: 8, borderRadius: 15 }}>
                            <Text style={[fontStyles.title_text, { color: '#fff', }]}>
                                Get BestDeals
                            </Text>
                        </TouchableOpacity>
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

export default ProductDescription

const styles = StyleSheet.create({
    mainCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    sliderCard: {
        // borderWidth: 1,
        height: Height * 0.4,
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
    }

})