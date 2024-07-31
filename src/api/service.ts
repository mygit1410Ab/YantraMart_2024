/* eslint-disable @typescript-eslint/no-unused-vars */
import AppSetting from "../configs/AppSettings";
import { APIClient } from "./axios.config";
import URLs from "./urls";

type NetworkResponse<T> = {
  message: string;
  data: any;
  status: any;
};
const GET_CATEGORY = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.GET_CATEGORY);
    if (AppSetting.isHomeDebugEnable) {
      // console.log("GET_CATEGORY Response=====>>>>", JSON.stringify(response));
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_CATEGORY Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const GET_SUB_CATEGORY = async (
  categoryId: string
): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(
      URLs.GET_SUB_CATEGORY + "?parent=" + categoryId
    );
    if (AppSetting.isHomeDebugEnable) {
       console.log(
        //  "GET_SUB_CATEGORY Response=====>>>>",
         JSON.stringify(response)
       );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SUB_CATEGORY Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const GET_PRODUCT = async (
  categoryId: string,
  sub_categoryId: string
): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(
      URLs.GET_PRODUCTS + "?id=" + categoryId + "&sub_id=" + sub_categoryId
    );
    if (AppSetting.isHomeDebugEnable) {
      console.log(
        // "GET_SUB_CATEGORY Response=====>>>>",
        JSON.stringify(response)
      );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SUB_CATEGORY Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const GET_SLIDER_IMAGES = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.GET_SLIDER);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GET_SLIDER_IMAGES Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const GET_TOP_USERS = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.Get_Top_Users);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GET_SLIDER_IMAGES Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const GetDiscountBanner = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.GET_Discount_Banner);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GetDiscountBanner Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const Get_New_Collection_Product = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.Get_Recent_Deals);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GetDiscountBanner Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const Get_Explore_Deal_Product = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.Get_Top_Locations);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GetDiscountBanner Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const Get_Popular_Product = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.Get_Popular_Product);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GetDiscountBanner Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const Get_Blogs = async (): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.Get_Blogs);
    if (AppSetting.isHomeDebugEnable) {
      // console.log(
      //   "GetDiscountBanner Response=====>>>>",
      //   JSON.stringify(response)
      // );
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isHomeDebugEnable) {
      console.error("GET_SLIDER_IMAGES Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
export {
  GET_CATEGORY,
  GET_SUB_CATEGORY,
  GET_SLIDER_IMAGES,
  GetDiscountBanner,
  Get_New_Collection_Product,
  Get_Explore_Deal_Product,
  Get_Popular_Product,
  GET_PRODUCT,
  GET_TOP_USERS,
  Get_Blogs,
};
