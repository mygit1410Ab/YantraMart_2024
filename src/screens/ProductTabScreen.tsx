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
import { Width, colors, fonts } from "../configs/Configs";
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
    get_explore_deal_product,
  } = useProductAPI();
  const [newCollectionProductList, setNewCollectionProductList] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);


  useEffect(() => {
    if (isFocused) {
      get_popular_product_list();
    }
  }, [isFocused]);

  const get_popular_product_list = async () => {
    const response = await get_new_collection_product();
    // console.log("get_popular_product_list===>>>", response);
    setNewCollectionProductList(response);
  };


  interface ItemType {
    [key: string]: any;
  }

  const PopularonItemClick = (item: object) => {
    // console.log(item.featured_img)
    const newItemData = {
      image: `${thumbs_Image_Url}${item.featured_img}`,
      unique_id: item.unique_id
    }
    // console.log(newItemData)

    navigation.navigate("NewProductDescriptionscreen", { item: newItemData });
  }

  const renderRecentDealList = useCallback(
    ({ item }: { item: ItemType }) => {
      return (
        <ThreeProductView item={item} onPress={PopularonItemClick} Image_Url={thumbs_Image_Url} />
      );
    },
    [PopularonItemClick, thumbs_Image_Url]
  );

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
          marginBottom: 12,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, width: Width * 1, overflow: 'visible' }}>
          <FlatList

            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ gap: 10, paddingBottom: 100, overflow: 'visible' }}
            ListEmptyComponent={<View></View>}
            data={newCollectionProductList}
            renderItem={renderRecentDealList}
            keyExtractor={keyExtractor}
            numColumns={3}
            scrollEventThrottle={400}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            windowSize={21}
            onEndReached={handleScrollEnd}
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
