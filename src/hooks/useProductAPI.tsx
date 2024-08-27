import { AxiosError } from "axios";
import { useState } from "react";
import {
  Get_New_Collection_Product,
  Get_Explore_Deal_Product,
  Get_Popular_Product,
  GET_PRODUCT,
  Get_Blogs,
} from "../api/service";
import { ICategory, ISliderImage } from "../model/useHomeModel";
import { NewCollectionList } from "../model/useProductModel";

const useProductAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const get_new_collection_product = async (): Promise<NewCollectionList> => {
    setIsLoading(true);
    try {
      const response = await Get_New_Collection_Product();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const get_product_list = async (
    categoryId: string,
    sub_categoryId: string
  ): Promise<NewCollectionList> => {
    setIsLoading(true);
    try {
      const response = await GET_PRODUCT(categoryId, sub_categoryId);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const get_explore_deal_product = async (): Promise<NewCollectionList> => {
    setIsLoading(true);
    try {
      const response = await Get_Explore_Deal_Product();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const get_popular_product = async (): Promise<NewCollectionList> => {
    setIsLoading(true);
    try {
      const response = await Get_Popular_Product();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  const get_Blogs = async (): Promise<NewCollectionList> => {
    setIsLoading(true);
    try {
      const response = await Get_Blogs();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    get_new_collection_product,
    get_explore_deal_product,
    get_popular_product,
    get_product_list,
    get_Blogs,
  };
};

export default useProductAPI;
