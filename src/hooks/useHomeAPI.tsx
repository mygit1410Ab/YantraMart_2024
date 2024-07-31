import { AxiosError } from "axios";
import { useState } from "react";
import { GET_CATEGORY, GET_SLIDER_IMAGES, GET_SUB_CATEGORY, GET_TOP_USERS, GetDiscountBanner } from "../api/service";
import { ICategory, IDiscountBannerImage, ISTopUsers, ISliderImage } from "../model/useHomeModel";

const useHomeAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const get_category = async (): Promise<ICategory[]> => {
    setIsLoading(true);
    try {
      const response = await GET_CATEGORY();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const get_sub_category = async (categoryId:string): Promise<ICategory[]> => {
    setIsLoading(true);
    try {
      const response = await GET_SUB_CATEGORY(categoryId);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
   const get_slider = async (): Promise<ISliderImage[]> => {
     setIsLoading(true);
     try {
       const response = await GET_SLIDER_IMAGES();
       return response.data;
     } catch (err) {
       setIsLoading(false);
       return [];
     } finally {
       setIsLoading(false);
     }
   };
   const get_TopUser = async (): Promise<ISTopUsers[]> => {
    setIsLoading(true);
    try {
      const response = await GET_TOP_USERS();
      return response.data;
    } catch (err) {
      setIsLoading(false);
      return [];
    } finally {
      setIsLoading(false);
    }
  };
    const get_discounted_Banner = async (): Promise<IDiscountBannerImage[]> => {
      setIsLoading(true);
      try {
        const response = await GetDiscountBanner();
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
    get_category,
    get_slider,
    get_discounted_Banner,
    get_sub_category,
    get_TopUser
  };
};

export default useHomeAPI;
