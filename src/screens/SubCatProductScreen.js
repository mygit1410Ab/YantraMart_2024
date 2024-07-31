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

const SubCatProductScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation=useNavigation()
  const route=useRoute()
  const {cateogoryId}=route.params
  const ITEM_HEIGHT = 150; 
//   console.log('---------->cateogoryId',cateogoryId)
  const [subcatProduct, setSubcatProduct] = useState([]);
  const [displayText, setDisplayText] = useState('Loading...');



  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayText('No Data');
    }, 4000);

    return () => clearTimeout(timer); 
  }, []);

  useEffect(() => {
    const get_Subcategory_Products = async () => {
      try {
             const res = await axios.post(`https://yantramart.com/en/api/App_api/getSubCategoryProducts?id=${cateogoryId.subcategory_id}`);
        //   console.log(res.data.data);
          setSubcatProduct(res.data.data); 
      } catch (error) {
          console.log('get_Subcategory_Products fetching error', error);
      }
  };

  get_Subcategory_Products();
}, []); 


const ProductClick = (item) => {
  // console.log('------------>',item.unique_id)
  navigation.navigate("NewProductDescriptionscreen", { item});
}



const renderRecentDealList = useCallback(
  ({ item }) => {
    return (
      <SubCatProductView item={item} onPress={ProductClick} />
    );
  },
  [ProductClick,]
);

const keyExtractor = useCallback((photo) => photo.unique_id, []);



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
            {cateogoryId?.title}
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
export default SubCatProductScreen;


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





//   ListHeaderComponent={
//     <View>
  
//       <View style={{height:175,}}>
//         <Text
//           style={{
//             marginBottom: 10,
//             textAlign: "left",
//             fontSize: 20,
//             fontFamily: fonts.Urbanist_SemiBold,
//             color: colors.black,
//             // marginTop: 20,
//             marginLeft: 20,
//           }}
//         >
//           {"Sub Category"}
//         </Text>
//         <View style={{overflow: 'visible' }}>
//           <FlatList
//             horizontal
//             // refreshing={loading}
//             pagingEnabled
//             // estimatedItemSize={200}
//             renderItem={renderCategoryList}
//             keyExtractor={keyExtractorCategory}
//             contentContainerStyle={{ overflow: 'visible', }}
//             showsHorizontalScrollIndicator={false}
//             data={subcategories}
//           />
//         </View>
//       </View>
//       <Text
//         style={{
//           // marginBottom: 10,
//           textAlign: "left",
//           fontSize: 20,
//           fontFamily: fonts.Urbanist_SemiBold,
//           color: colors.black,
//           // marginTop: 20,
//           marginLeft: 20,
//         }}
//       >
//         {"Categories Products"}
//       </Text>

//     </View>
//   }