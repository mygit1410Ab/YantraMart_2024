import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import IntroScreen from '../../screens/IntroScreen';
import HomeScreen from '../../screens/HomeScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import WebviewScreen from '../../screens/WebviewScreen';
import LoginScreen from '../../screens/LoginScreen';
import AuthMainScreen from '../../screens/AuthMainScreen';
import SubCategoryScreen from '../../screens/SubCategoryScreen';
import MainTabScreen from '../../screens/TabNavigation';
import ProductScreen from '../../screens/ProductScreen';
import ProductDescription from '../../screens/ProductDescription';
import SearchScreen from '../../screens/SearchScreen';
import BlogDescription from '../../screens/BlogDescription';
import NewProductDescriptionscreen from '../../screens/NewProductDescriptionscreen';
import TopUserScreen from '../../screens/TopUserScreen';
import SubCatProductScreen from '../../screens/SubCatProductScreen';
import SettingScreen from '../../screens/SettingScreen';
import Notification from '../../screens/Notification';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName={'MainTabScreen'}
    screenOptions={({ }) => ({
      animation: 'fade',
      headerShown: false,
    })}>
    {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
    <Stack.Screen name="AuthMainScreen" component={AuthMainScreen} />
    <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} />
    <Stack.Screen name="MainTabScreen" component={MainTabScreen} />
    <Stack.Screen name="ProductScreen" component={ProductScreen} />
    <Stack.Screen name="ProductDescription" component={ProductDescription} />
    <Stack.Screen name="NewProductDescriptionscreen" component={NewProductDescriptionscreen} />
    <Stack.Screen name="Notification" component={Notification} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="SettingScreen" component={SettingScreen} />
    <Stack.Screen name="TopUserScreen" component={TopUserScreen} />
    <Stack.Screen name="SubCatProductScreen" component={SubCatProductScreen} />
    <Stack.Screen name="BlogDescription" component={BlogDescription} />
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="WebviewScreen" component={WebviewScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
  </Stack.Navigator>
);
export default AuthNavigator;
