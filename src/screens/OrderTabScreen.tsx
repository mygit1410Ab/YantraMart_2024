/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Height, Width, colors, fonts } from "../configs/Configs";
import { fontStyles } from "../style/FontsStyle";
import { useCallback, useEffect, useState } from "react";
import AppSetting from "../configs/AppSettings";
import { useIsFocused } from "@react-navigation/native";
import useProductAPI from "../hooks/useProductAPI";
import { NewCollectionList } from "../model/useProductModel";
import Colors from "../configs/Colors";
import FastImage from "react-native-fast-image";
import TwoColumnProdctView from "../components/TwoColumnProdctView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThreeProductView from "../components/ThreeProductView";
import TopHeader from "../components/TopHeader";
import BlogView from "../components/BlogView";

const ProductTabScreen = ({ navigation }: any) => {

  interface Product {
    id: number;
    name: string;
    // Add other relevant properties of a product
    [key: string]: any;
  }
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const thumbs_Image_Url = 'https://yantramart.com/uploads/thumbs/';
  const {
    get_new_collection_product,
    get_popular_product,
    get_Blogs,
    get_explore_deal_product,
  } = useProductAPI();
  const [blogList, setBlogList] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);


  useEffect(() => {
    if (isFocused) {
      get_Top_Blog_list();
    }
  }, [isFocused]);

  const get_Top_Blog_list = async () => {
    const response = await get_Blogs();
    // console.log("get_popular_product_list===>>>", response);
    setBlogList(response);
  };

  const handleScrollEnd = useCallback(async () => {
    // console.log('scroll Called');
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const response = await get_Blogs();
      setBlogList((prevProducts) => [...prevProducts, ...response]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore]);

  interface ItemType {
    [key: string]: any;
  }

  const PopularonItemClick = (item: object) => {
    navigation.navigate("BlogDescription", { item });
  }

  const renderBlogList = useCallback(
    ({ item }: { item: ItemType }) => {
      return (
        <BlogView item={item} onPress={PopularonItemClick} Image_Url={thumbs_Image_Url} />
      );
    },
    [PopularonItemClick, thumbs_Image_Url]
  );


  const keyExtractor = useCallback((photo: any) => photo.id, []);



  return (
    <View style={[
      styles.main_container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,

      }
    ]}>
      <TopHeader search={true} wishList={true} />
      <View
        style={{
          // marginBottom: 12,
          flex: 1,
          overflow: 'visible',
          // borderWidth:1,
          height: Height * 1
        }}
      >

        <View style={{ flex: 1, width: Width * 1, overflow: 'visible', height: Height * 1 }}>
          <FlatList
            ListHeaderComponent={
              <Text style={[fontStyles.big_title_text, { color: '#000', textAlign: 'center' }]}>
                Top Blogs
              </Text>
            }
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            style={{ height: Height * 1 }}
            contentContainerStyle={{ gap: 20, paddingBottom: 100, overflow: 'visible', alignItems: 'center', marginTop: 20 }}
            ListEmptyComponent={<View></View>}
            data={blogList}
            renderItem={renderBlogList}
            keyExtractor={keyExtractor}
            // numColumns={3}
            scrollEventThrottle={400}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            windowSize={21}
            // onEndReached={handleScrollEnd}
            onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    </View>
  );
};
export default ProductTabScreen;
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
  },

});
