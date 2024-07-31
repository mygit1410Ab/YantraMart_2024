import { AxiosError } from "axios";
import { useState } from "react";
import { LOGIN_USER, REGSITER_USER } from "../api/auth";

const useAuthAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const login_user = async (
    user_email: string,
    password: string
  ): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await LOGIN_USER(user_email, password);
      return response;
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const register_user = async (
    first_name: string,
    last_name: string,
    user_email: string,
    username: string,
    gender: string,
    company_name: string,
    phone: string,
    password: string
  ): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await REGSITER_USER(
        first_name,
        last_name,
        user_email,
        username,
        gender,
        company_name,
        phone,
        password
      );
      return response;
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  // const register_device_id = async (playerId: string): Promise<any> => {
  //   setIsLoading(true);
  //   try {
  //     await REGISTER_DEVICE(playerId);
  //   } catch (err) {
  //     console.log('register_device_id', err as AxiosError);
  //     setIsLoading(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  return {
    isLoading,
    login_user,
    register_user,
  };
};

export default useAuthAPI;
