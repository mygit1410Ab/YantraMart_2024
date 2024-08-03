/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, Modal, Alert, Pressable, TouchableOpacity } from "react-native";
import { colors, fonts } from "../configs/Configs";
import { fontStyles } from "../style/FontsStyle";
import { useEffect, useState } from "react";
import AppSetting from "../configs/AppSettings";
import { useIsFocused } from "@react-navigation/native";
import LocalStorage from "../utils/LocalStorage";
import FAButton from "../components/FAButton";
import { Button } from "react-native-paper";
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { googleLogIn } from "../fireBase/GoogleLogin";
import Loader from "../components/Loader";
import Toast from "react-native-toast-message";
import useAuthAPI from "../hooks/useAuthAPI";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { SOCIAL_LOGIN_USER } from "../api/auth";




const ProfileScreen: React.FC = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { isLoading, register_user } = useAuthAPI();
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [genderValue, setGenderValue] = useState("Male");
  const { login_user } = useAuthAPI();




  interface GoogleLoginResponse {
    firstName: string;
    lastName: string;
    email: string;
    uid: string;
  }

  const onRegisterScreen = () => {
    navigation.navigate("RegisterScreen");
  };
  const onLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };
  const onShopScreen = () => {
    navigation.navigate("WebviewScreen");
  };
  useEffect(() => {
    // Navigate to another screen when HomeScreen is loaded
    if (isFocused) {
      CheckLogin();
    }
  }, [isFocused]);

  const CheckLogin = async () => {
    AppSetting.isLoggedIn = await LocalStorage.getItem("isLoggedIN");
    const userdata = await LocalStorage.getItem("userData")
    // console.log("videoScreenDisplayComplete===>", AppSetting.isLoggedIn);
    // console.log("videoScreenDisplayComplete===>userdata",userdata);
    if (AppSetting.isLoggedIn && userdata) {
      navigation.navigate("TopUserScreen", { item: userdata })
    }
  };

  GoogleSignin.configure({
    webClientId: '106922038659-ohqeeon6o913eik20j9148st38nc3kst.apps.googleusercontent.com',
  });



  const googleLoginHandler = async () => {
    // console.log('googleLogInPressed');
    setModalVisible(true);
    try {
      const res = await googleLogIn();
      console.log('=======>>', res)
      if (res) {
        const userProfile: GoogleLoginResponse = res as GoogleLoginResponse;
        console.log('googlePressed2', userProfile);
        const firstName = userProfile.firstName
        const lastName = userProfile.lastName
        const email = userProfile.email
        const userName = userProfile.email
        const password = "123456"

        try {
          const response = await SOCIAL_LOGIN_USER(email);
          console.log("call_login_user====>>", response);
          if (AppSetting.isAuthDebugEnable) {
            console.log("call_login_user====>>", response);
          }
          if (response.status) {
            LocalStorage.setItem("isLoggedIN", true);
            Toast.show({ text1: response.message, type: "success" });
            navigation.navigate("MainTabScreen");
          } else if (response.data.status == false && response.data.message == 'User does not exist.') {
            console.log('kkkkkkkkkkkkk')
          }
          else {
            Toast.show({
              text1: "Failed",
              text2: response.message,
              type: "failure",
            });
          }
        } catch (err) {
          Toast.show({
            text1: "Failed",
            text2: "Please try after some time",
            type: "failure",
          });
        }
      }
    } finally {
      setModalVisible(false);
    }
  };

  const googleLogoutHandler = async () => {
    // console.log('googlePressedLogout');
    try {
      // Sign out from Firebase
      await auth().signOut();

      // Sign out from Google
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // console.log('User signed out successfully');
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <View style={[styles.main_container]}>
      <ImageBackground
        source={require("../assets/images/bgauth.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"

      >
        <View style={{ gap: 20 }}>
          <Image
            style={styles.logo}
            source={require("../assets/images/YantramartLogo.png")}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text
              numberOfLines={1}
              style={[
                fontStyles.heading_2_text,
                {
                  textAlign: "left",
                  // textTransform: "lowercase",
                  color: colors.black,
                  //   lineHeight: 32,
                  fontWeight: "900",
                  marginLeft: 0,
                  letterSpacing: 0.3,
                  marginTop: 14,
                },
              ]}
            >
              {"YANTRA"}
            </Text>
            <Text
              numberOfLines={1}
              style={[
                fontStyles.heading_2_text,
                {
                  textAlign: "left",
                  // textTransform: "lowercase",
                  color: colors.darkGreen,
                  //   lineHeight: 32,
                  fontWeight: "900",
                  marginLeft: 0,
                  letterSpacing: 0.3,
                  marginTop: 14,
                },
              ]}
            >
              {"MART"}
            </Text>
          </View>
          <Text
            numberOfLines={2}
            style={[
              fontStyles.big_title_text,
              {
                textAlign: "center",
                // textTransform: "lowercase",
                color: colors.black,
                //   lineHeight: 32,
                marginLeft: 30,
                marginRight: 30,
                letterSpacing: 0.3,
                marginTop: 14,
              },
            ]}
          >
            {
              "Show the world what you have got, Heavy machine Buy, Sell and Rent"
            }
          </Text>
          <View style={[styles.button_container, {}]}>
            <FAButton
              title={"LOGIN"}
              buttonStyle={{
                width: Dimensions.get("window").width / 2 - 40,
                height: 48,
                borderRadius: 10,
                marginTop: 0,
                backgroundColor: '#006B3D',
                marginRight: 10,
              }}
              textStyle={{
                fontSize: 14,
                fontFamily: fonts.Urbanist_Regular,
                fontWeight: "700",
                color: colors.white,
              }}
              action={() => {
                onLoginScreen();
                //Alert.alert('You tapped the Decrypt button!');
                //onSubmitPress();
                // let activeIndex = sliderRef?.state.activeIndex || 0;
                // if (activeIndex === 2) {
                //   navigation.navigate('SignInScreen');
                // } else {
                //   sliderRef?.goToSlide(activeIndex + 1);
                // }
              }}
            />
            <FAButton
              title={"SIGN UP"}
              buttonStyle={{
                width: Dimensions.get("window").width / 2 - 40,
                height: 48,
                borderRadius: 10,
                marginTop: 0,
                marginLeft: 10,
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: '#006B3D',
              }}
              textStyle={{
                fontSize: 14,
                fontFamily: fonts.Urbanist_Regular,
                fontWeight: "700",
                color: '#006B3D',
              }}
              action={() => {
                onRegisterScreen();
                //Alert.alert('You tapped the Decrypt button!');
                //onSubmitPress();
                // let activeIndex = sliderRef?.state.activeIndex || 0;
                // if (activeIndex === 2) {
                //   navigation.navigate('SignInScreen');
                // } else {
                //   sliderRef?.goToSlide(activeIndex + 1);
                // }
              }}
            />
          </View>
          <TouchableOpacity onPress={googleLoginHandler}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              width: '40%',
              paddingHorizontal: 20,
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: '#fff',
              shadowColor: '#171717',
              shadowOffset: { width: -2, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
              elevation: 5,
              borderRadius: 10,
              paddingVertical: 4


            }}>
            <Text style={[fontStyles.bigButton_text, { color: colors.darkGreen, textAlign: 'center' }]}>
              {"Login with   "}
            </Text>
            <FontAwesome
              size={25}
              color={colors.darkGreen}
              name={'google'}
            />
          </TouchableOpacity>
          <Text onPress={googleLogoutHandler}>
            logout
          </Text>
        </View>


        {modalVisible !== false &&
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <Loader />
          </Modal>
        }
      </ImageBackground>
    </View>
  );
};
export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1
  },
  main_container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  backgroundImage: {
    width: "100%",
    height: Dimensions.get("window").height,
    resizeMode: "contain",
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    resizeMode: "contain",
    //   position: "absolute",
    height: 130,
    width: 350,
    // marginTop: 200,
    // marginBottom: 10,
    // marginLeft: 0,
    alignSelf: 'center',
  },
  button_container: {
    // height: 80,
    // marginTop: 0,
    // paddingHorizontal: 40,
    // marginBottom: 120,
    flexDirection: "row",
    // backgroundColor: colors.black,
    // justifyContent: 'space-between',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth:1
  },
  heading_txt_style: {
    marginBottom: 10,
    color: colors.grey500,
    textAlign: "left",
    marginLeft: 20,
  },
  subheading_txt_style: {
    color: colors.dark,
    marginLeft: 20,
    marginRight: 20,
  },
  slider_container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  slider_box_container: {
    width: "100%",
    height: "70%",
    // backgroundColor: colors.blue,
  },
  slider_text_container: {
    width: "100%",
    height: "25%",
    justifyContent: "flex-start",
    // alignItems: 'center',
    // backgroundColor: colors.black,
    borderRadius: 0,
  },

});






{/* <View
style={{
  height: 80,
  marginTop: 0,
  paddingHorizontal: 40,
  marginBottom: 120,
  // flexDirection: "row",
  // backgroundColor: colors.black,
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
}}
>
{/* <FAButton
title={"EXPLORE PRODUCTS"}
buttonStyle={{
  width: Dimensions.get("window").width - 60,
  height: 48,
  borderRadius: 10,
  marginTop: 0,
  marginLeft: 0,
  backgroundColor: colors.darkYellow,
  borderWidth: 1,
  borderColor: colors.darkYellow,
}}
textStyle={{
  fontSize: 14,
  fontFamily: fonts.Urbanist_Regular,
  fontWeight: "700",
  color: colors.white,
}}
action={() => {
  navigation.navigate("MainTabScreen");
}}
/> */}
{/* <FAButton
  title={"Sign in with Google"}
  disabled={
    false
    // firstName.length > 0 &&
    // secondName.length > 0 &&
    // email.length > 0 &&
    // userName.length > 0 &&
    // genderValue.length > 0 &&
    // companyName.length > 0 &&
    // phoneNumber.length > 0 &&
    // phoneNumber.length < 11 &&
    // password.length > 0 &&
    // password === confirmPassword &&
    // isTermsConditionSelected &&
    // validator.isEmail(email)
    //   ? false
    //   : true
  }
  type={
    "primary"
    // firstName.length > 0 &&
    // secondName.length > 0 &&
    // email.length > 0 &&
    // userName.length > 0 &&
    // genderValue.length > 0 &&
    // companyName.length > 0 &&
    // phoneNumber.length > 0 &&
    // phoneNumber.length < 11 &&
    // password.length > 0 &&
    // password === confirmPassword &&
    // isTermsConditionSelected &&
    // validator.isEmail(email)
    //   ? 'primary'
    //   : 'disabled'
  }
  buttonStyle={{
    height: 48,
    width: 200,
    borderRadius: 24,
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: colors.darkYellow,
  }}
  textStyle={[
    fontStyles.bigButton_text,
    {
      color: colors.white,
    },
  ]}
  action={() => { }}
/> */}

{/* <Text
  onPress={googleLoginHandler}
  style={{ color: 'red' }}>
  Google SigIn
</Text>
<Text
  onPress={googleLogoutHandler}
  style={{ color: 'red' }}>
  Google SigInout
</Text> */}
// </View> */}