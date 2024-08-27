/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import Colors from '../configs/Colors';
import { Platform } from 'react-native';
import fonts from '../configs/Fonts';
import ProfileScreen from './ProfileScreen';
import HomeScreen from './HomeScreen';
import ProductTabScreen from './ProductTabScreen';
import OrderTabScreen from './OrderTabScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();


const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Order"
      screenOptions={{
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.grey500,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 0 : 0,
          height: Platform.OS === 'ios' ? 90 : 64,
          backgroundColor: Colors.white,
          // elevation: 1,



        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarLabelStyle: styles_tab.tab_name_label_style,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.grey500,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../assets/images/hometab.png')
              : require('../assets/images/hometab.png');
            return (
              <Image
                source={image}
                style={[
                  styles_tab.tab_image_style,
                  {
                    height: focused ? 35 : 24,
                    width: focused ? 35 : 24,
                    //tintColor: focused ? Colors.black : Colors.grey500,
                    resizeMode: 'contain',
                  },
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductTabScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Product',
          tabBarLabelStyle: styles_tab.tab_name_label_style,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.grey500,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../assets/images/nearbytab.png')
              : require('../assets/images/nearbytab.png');
            return (
              <Image
                source={image}
                style={[
                  styles_tab.tab_image_style,
                  {
                    height: focused ? 35 : 24,
                    width: focused ? 35 : 24,
                    //tintColor: focused ? Colors.black : Colors.grey500,
                    resizeMode: 'contain',
                  },
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderTabScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'News&blogs',
          tabBarLabelStyle: styles_tab.tab_name_label_style,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.grey500,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../assets/images/carttab.png')
              : require('../assets/images/carttab.png');
            return (
              <Image
                source={image}
                style={[
                  styles_tab.tab_image_style,
                  {
                    height: focused ? 35 : 24,
                    width: focused ? 35 : 24,
                    //tintColor: focused ? Colors.black : Colors.grey500,
                    resizeMode: 'contain',
                  },
                ]}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarLabelStyle: styles_tab.tab_name_label_style,
          tabBarActiveTintColor: Colors.black,
          tabBarInactiveTintColor: Colors.grey500,
          tabBarIcon: ({ focused }) => {
            const image = focused
              ? require('../assets/images/profiletab.png')
              : require('../assets/images/profiletab.png');
            return (
              <Image
                source={image}
                style={[
                  styles_tab.tab_image_style,
                  {
                    height: focused ? 35 : 24,
                    width: focused ? 35 : 24,
                    //tintColor: focused ? Colors.black : Colors.grey500,
                    resizeMode: 'contain',
                  },
                ]}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  )
};

export default MainTabScreen;
const styles_tab = StyleSheet.create({
  tab_image_style: {
    marginTop: 4,
    height: 20,
    width: 20,
    // color: Colors.black,
  },
  tab_name_label_style: {
    fontFamily: fonts.Urbanist_Medium,
    fontSize: 10,
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 13,
    bottom: 4,
  },
});
