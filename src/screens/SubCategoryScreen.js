import { StyleSheet, Text, View,Dimensions,FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Colors from '../configs/Colors';
import { colors, fonts } from '../configs/Configs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import { fontStyles } from '../style/FontsStyle';
import SearchBar from '../components/SearchBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import ThreeProductView from '../components/ThreeProductView';
import SubCatProductView from '../components/SubCatProductView';
import CategoryView from '../components/CategoryView';

const SubCategoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation=useNavigation()
  const route=useRoute()
  const {cateogoryId}=route.params
  const ITEM_HEIGHT = 150; 
  // console.log('---------->cateogoryId',cateogoryId)
  const [subcategories, setSubcategories] = useState([]);
  const [subcatProduct, setSubcatProduct] = useState([]);
  const [displayText, setDisplayText] = useState('Loading...');

  // const thumbs_Image_Url = 'https://yantramart.com/uploads/images/';


  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText('No Data');
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  useEffect(() => {
    const get_Subcategory_ByCategory_Id = async () => {
        try {
            const res = await axios.post(`https://yantramart.com/en/api/App_api/getSubcategoryByCategoryId?id=${cateogoryId.category_id}`);
            console.log(res.data.data);
            setSubcategories(res.data.data);  // Update state with fetched data
        } catch (error) {
            console.log('get_Subcategory_ByCategory_Id fetching error', error);
        }
    };
    const get_Subcategory_Products = async () => {
      try {
          const res = await axios.post(`https://yantramart.com/en/api/App_api/getCategoryProducts?id=${cateogoryId.category_id}`);
          // console.log(res.data.data);
          setSubcatProduct(res.data.data);  // Update state with fetched data
      } catch (error) {
          console.log('get_Subcategory_Products fetching error', error);
      }
  };

  get_Subcategory_Products();
  get_Subcategory_ByCategory_Id()
}, []); 


const ProductClick = (item) => {
  // console.log(item)
  navigation.navigate("NewProductDescriptionscreen", {item});
}



const renderRecentDealList = useCallback(
  ({ item }) => {
    return (
      <SubCatProductView item={item} onPress={ProductClick} />
    );
  },
  [ProductClick,]
);


const renderCategoryList = useCallback(
  ({ item }) => {
    const newItem = { ...item, itemType: 'sub_category' };
    return (
      <CategoryView item={newItem} />
    );
  },
  []
);

const keyExtractor = useCallback((photo) => photo.unique_id, []);
const keyExtractorCategory = useCallback((photo) => photo.subcategory_id, []);



  return (
    <View style={[styles.container,
    {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }
    ]}>
      <View style={styles.sub_navbar}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
            {cateogoryId.name}
          </Text>
        </View>
        <SearchBar placeHolder={false}  />

      </View>
      <View style={styles.contentCard}>
      {(() => {
            if (subcatProduct.length > 0) {
              return (
                <FlatList
                  // refreshing={loading}
                  // onRefresh={get_Recent_Deals_list}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerStyle={{ gap: 10, paddingBottom: 100, overflow: 'visible',width:'100%' }}
                  ListEmptyComponent={<View></View>}
                  data={subcatProduct}
                  renderItem={renderRecentDealList}
                  keyExtractor={keyExtractor}
                  numColumns={3}
                  scrollEventThrottle={16}  // lower value for more frequent updates
                  initialNumToRender={12}
                  maxToRenderPerBatch={10}
                  windowSize={21}
                  // onScroll={onScroll}
                  onEndReachedThreshold={0.2}
                  removeClippedSubviews={true}  // unload items outside of view
                  getItemLayout={(data, index) => (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                  )}
                  // onEndReached={handleScrollEnd}
                  ListHeaderComponent={
                    <View>
                  
                      <View style={{height:175,}}>
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
                          {"Sub Category"}
                        </Text>
                        <View style={{overflow: 'visible' }}>
                          <FlatList
                            horizontal
                            // refreshing={loading}
                            pagingEnabled
                            // estimatedItemSize={200}
                            renderItem={renderCategoryList}
                            keyExtractor={keyExtractorCategory}
                            contentContainerStyle={{ overflow: 'visible', }}
                            showsHorizontalScrollIndicator={false}
                            data={subcategories}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          // marginBottom: 10,
                          textAlign: "left",
                          fontSize: 20,
                          fontFamily: fonts.Urbanist_SemiBold,
                          color: colors.black,
                          // marginTop: 20,
                          marginLeft: 20,
                        }}
                      >
                        {"Categories Products"}
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
                  {displayText}
                </Text>
              </View>
            );
          })()}
      </View>
     
    </View>
  );
};
export default SubCategoryScreen;
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
  contentCard:{
    // borderWidth:1,
    flex:1,
    width:'100%',
    // padding:'5%',
    alignItems:'center'
  }
  
  });
