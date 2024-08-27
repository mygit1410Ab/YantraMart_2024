/* eslint-disable @typescript-eslint/no-unused-vars */
import AppSetting from "../configs/AppSettings";
import { APIClient } from "./axios.config";
import URLs from "./urls";

type NetworkResponse<T> = {
  message: string;
  data: any;
  status: any;
};
const LOGIN_USER = async (
  user_email: string,
  password: string
): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.LOGIN_USER, {
      user_email: user_email,
      password: password,
    });
    console.log('============>>>>==', response)
    if (AppSetting.isAuthDebugEnable) {
      // console.log("LOGIN_USER Response=====>>>>", JSON.stringify(response));
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isAuthDebugEnable) {
      console.error("LOGIN_USER Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const SOCIAL_LOGIN_USER = async (
  user_email: string,
): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.SOCIAL_LOGIN_USER, {
      user_email: user_email,
    });
    if (AppSetting.isAuthDebugEnable) {
      // console.log("LOGIN_USER Response=====>>>>", JSON.stringify(response));
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isAuthDebugEnable) {
      console.error("LOGIN_USER Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
const REGSITER_USER = async (
  first_name: string,
  last_name: string,
  user_email: string,
  username: string,
  gender: string,
  company_name: string,
  phone: string,
  password: string
): Promise<NetworkResponse<any>> => {
  try {
    const response = await APIClient.post(URLs.SIGNUP_USER, {
      first_name: first_name,
      last_name: last_name,
      user_email: user_email,
      user_name: username,
      gender: gender,
      account_type: company_name != null ? "individual" : "individual",
      password: password,
      phone: phone,
      company_name: company_name,
    });
    if (AppSetting.isAuthDebugEnable) {
      // console.log("REGSITER_USER Response=====>>>>", JSON.stringify(response));
    }
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (err: any) {
    if (AppSetting.isAuthDebugEnable) {
      console.error("REGSITER_USER Error=====>>>>", err.response);
    }
    return err.response.data;
  }
};
// const REGISTER_DEVICE = async (
//   playerId: string,
// ): Promise<NetworkResponse<any>> => {
//   console.log('playerId', URLs.REGISTER_DEVICE_URL + playerId);
//   try {
//     const response = await APIClient.post(URLs.REGISTER_DEVICE_URL + playerId);
//     console.log('REGISTER_DEVICE Response====', JSON.stringify(response));
//     if (response.data.success) {
//       return response.data;
//     } else {
//       return response.data;
//     }
//   } catch (err: any) {
//     console.error('REGISTER_DEVICE', err.response);
//     return err.response.data;
//   }
// };

export { LOGIN_USER, REGSITER_USER, SOCIAL_LOGIN_USER };
