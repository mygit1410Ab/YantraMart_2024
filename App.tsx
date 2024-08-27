/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import "react-native-gesture-handler";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
// import SplashScreen from "react-native-splash-screen";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";

// import {Provider} from 'react-redux';
// import {store} from './src/redux/store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors, fonts } from "./src/configs/Configs";
import MainNavigator from "./src/navigation";
import AppSetting from "./src/configs/AppSettings";
import LocalStorage from "./src/utils/LocalStorage";
import { requestUserPermission } from "./src/PushNotification/PushNotification";
import ForGroundHandler from "./src/PushNotification/ForGroundHandler";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
  },
};
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        marginTop: Platform.OS === "ios" ? 20 : 0,
        borderLeftColor: colors.blue,
      }}
      text1Style={{
        fontFamily: fonts.Urbanist_Medium,
        fontSize: 15,
        fontWeight: "400",
      }}
      text1NumberOfLines={2}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  failure: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        marginTop: 30,
        borderLeftColor: colors.red,
      }}
      contentContainerStyle={{
        paddingLeft: 10,
        paddingVertical: 10,
      }}
      text1Style={{
        fontFamily: fonts.Urbanist_Medium,
        fontSize: 15,
      }}
      text2Style={{
        fontFamily: fonts.Urbanist_Medium,
        fontSize: 14,
        color: colors.black,
      }}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
    />
  ),
};

const App: FunctionComponent = () => {
  useEffect(() => { }, []);

  useEffect(() => {
    CheckLogin();
    // SplashScreen.hide();
  });


  useEffect(() => {
    const initializeApp = async () => {
      try {
        await requestUserPermission();
      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initializeApp();
  }, []);

  const CheckLogin = async () => {
    AppSetting.isLoggedIn = await LocalStorage.getItem("isLoggedIN");
    // console.log("videoScreenDisplayComplete===>", AppSetting.isLoggedIn);
  };
  return (
    <SafeAreaProvider>
      <ForGroundHandler />
      <MainNavigator />
      <Toast config={toastConfig} visibilityTime={4000} />
    </SafeAreaProvider>
  );
};

export default App;
