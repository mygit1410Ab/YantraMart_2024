/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Linking,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import { colors, fonts } from "../configs/Configs";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontStyles } from "../style/FontsStyle";
import FAButton from "../components/FAButton";
import { useEffect, useState } from "react";
import { onlyNumberAllowed } from "../utils/Validators";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-toast-message";
import BackButton from "../components/BackButton";
import useAuthAPI from "../hooks/useAuthAPI";
import AppSetting from "../configs/AppSettings";
import LocalStorage from "../utils/LocalStorage";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const imagePath = 'https://yantramart.com/uploads/profile_photos/thumb/'

  const [isTermsConditionSelected, setTermsConditionSelected] = useState(false);
  const { isLoading, login_user } = useAuthAPI();
  const validator = require("validator");




  const onContinuePress = () => {
    call_login_user();
  };
  const onTermsConditionPress = () => {
    Linking.openURL("https://www.yantramart.com/en/page/terms_and_conditions");
  };
  const call_login_user = async () => {
    try {
      const response = await login_user(email, password);

      if (AppSetting.isAuthDebugEnable) {
        // console.log("call_login_user====>>", response);
      }
      if (response.status) {
        LocalStorage.setItem("isLoggedIN", true);
        const userData = {
          image: `${imagePath}${response.data.image}`,
          name: `${response.data.name}`,
          user_id: `${response.data.id}`,
          logIn: true
        }
        LocalStorage.setItem("userData", userData);
        Toast.show({ text1: response.message, type: "success" });
        navigation.navigate("TopUserScreen", { item: userData });
      } else {
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
    } finally {
    }
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground
        source={require("../assets/images/bgauth.png")}
        style={styles.backgroundImage}
        resizeMode="stretch"
      >
        <View style={styles.navbar}>
          <BackButton
            buttonColor={colors.white}
            buttonImage="../assets/images/left-arrow.png"
            buttonStyle={{
              width: 36,
              alignSelf: "center",
              height: 36,
              borderRadius: 0,
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ justifyContent: 'center', alignSelf: 'center', }}
        >
          <View style={[styles.main_container]}>
            <Text
              style={[fontStyles.heading_3_text, styles.heading_txt_style]}
            >
              {"Login"}
            </Text>

            <View style={styles.text_field_sub_container}>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: colors.black,
                }}
              >
                <Text style={styles.textfield_label_text_style}>
                  {"Email"}
                </Text>
                <Text style={styles.star_marker_style}>{"*"}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: colors.black,
                }}
              >
                <TextInput
                  editable={true}
                  style={[
                    styles.input,
                    fontStyles.textinput_paragraph_text,
                    {
                      width: "100%",
                      borderColor: colors.greyTextField,
                    },
                  ]}
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                  value={email}
                  placeholder={"Enter your email-id"}
                  placeholderTextColor={colors.grey}
                  keyboardType="default"
                />
              </View>
            </View>

            <View style={styles.text_field_sub_container}>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: colors.black,
                }}
              >
                <Text style={styles.textfield_label_text_style}>
                  {"Password"}
                </Text>
                <Text style={styles.star_marker_style}>{"*"}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: colors.black,
                }}
              >
                <TextInput
                  editable={true}
                  style={[
                    styles.input,
                    fontStyles.textinput_paragraph_text,
                    {
                      width: "100%",
                      borderColor: colors.greyTextField,
                    },
                  ]}
                  onChangeText={(text) => {
                    setPassword(text);
                  }}
                  value={password}
                  placeholder={"Enter your password"}
                  placeholderTextColor={colors.grey}
                  keyboardType="default"
                // secureTextEntry={true}
                />
              </View>
            </View>

            {/* <View
                style={{
                  width: "90%",
                  // backgroundColor: Colors.green_1,
                  // height: 50,
                  marginTop: 0,
                  marginLeft: 40,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (isTermsConditionSelected) {
                      setTermsConditionSelected(false);
                    } else {
                      setTermsConditionSelected(true);
                    }
                  }}
                >
                  <Image
                    source={
                      isTermsConditionSelected
                        ? require("../assets/images/checkbox_checked.png")
                        : require("../assets/images/checkbox_unselected.png")
                    }
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 0,
                      tintColor: colors.yellow,
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.textfield_label_text_style}>
                  {"Remember me"}
                </Text>
              </View> */}
            <View style={[styles.button_container, {}]}>
              <FAButton
                title={"Login"}
                disabled={
                  email.length > 0 &&
                    password.length > 0 &&
                    validator.isEmail(email)
                    ? false
                    : true
                }
                type={
                  email.length > 0 &&
                    password.length > 0 &&
                    validator.isEmail(email)
                    ? "primary"
                    : "disabled"
                }
                buttonStyle={{
                  width: "100%",
                  height: 48,
                  borderRadius: 24,
                  backgroundColor:
                    email.length > 0 &&
                      password.length > 0 &&
                      validator.isEmail(email)
                      ? colors.darkGreen
                      : colors.grey,
                }}
                textStyle={[
                  fontStyles.bigButton_text,
                  {
                    color: colors.white,
                  },
                ]}
                action={() => {
                  if (email !== null && password !== null) {
                    call_login_user();
                  }
                }}
              />
            </View>
            <View
              style={{
                // height: 80,
                width: "100%",
                marginTop: 0,
                // paddingHorizontal: 20,
                marginBottom: 0,
                flexDirection: "row",
                // backgroundColor: colors.black,
                justifyContent: "center",
              }}
            >
              <View style={[styles.button_container_row, {}]}>
                <FAButton
                  title={"Forgot Password?"}
                  buttonStyle={{
                    //   width: '100%',
                    height: 48,
                    borderRadius: 24,
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: colors.white,
                  }}
                  textStyle={[
                    fontStyles.bigButton_text,
                    {
                      color: colors.black,
                    },
                  ]}
                  action={() => { }}
                />
                <FAButton
                  title={"Sign Up"}
                  disabled={false}
                  type={"primary"}
                  buttonStyle={{
                    //   width: '100%',
                    height: 48,
                    borderRadius: 24,
                    marginTop: 0,
                    marginBottom: 0,
                    backgroundColor: colors.white,
                  }}
                  textStyle={[
                    fontStyles.bigButton_text,
                    {
                      color: colors.black,
                    },
                  ]}
                  action={() => {
                    navigation.navigate("RegisterScreen");
                  }}
                />
              </View>
            </View>
            {/* <View style={[styles.button_container, { marginTop: 0 }]}>
                <FAButton
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
                    backgroundColor: colors.red,
                  }}
                  textStyle={[
                    fontStyles.bigButton_text,
                    {
                      color: colors.white,
                    },
                  ]}
                  action={() => {}}
                />
              </View> */}
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: 'center',
    // borderWidth:1
    width: '100%',
    // borderWidth:1
  },
  main_container: {
    flex: 1,
    // flexDirection: "column",
    // marginBottom: 10,
    // marginLeft: 30,
    // marginRight: 30,
    marginTop: '25%',
    width: Dimensions.get("window").width - 60,
    borderWidth: 1,
    borderColor: colors.grey,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: 16,
    // borderWidth:1,
    alignSelf: 'center'


  },
  button_container: {
    // height: 80,
    marginTop: 20,
    // paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: "column",
    // backgroundColor: colors.black,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  button_container_row: {
    // height: 80,
    width: "50%",
    marginTop: 10,
    // paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    // backgroundColor: colors.yellow,
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  heading_txt_style: {
    marginBottom: 10,
    marginTop: 10,
    color: colors.dark,
    textAlign: "center",
  },
  subheading_txt_style: {
    color: colors.grey,
    marginBottom: 30,
  },
  input: {
    height: 44,
    width: "100%",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 6,
    padding: 10,
    paddingLeft: 20,
    borderColor: colors.grey500,
    color: colors.black,
    borderRadius: 22,
    fontSize: 14,
    fontFamily: fonts.Urbanist_Regular,
  },
  icon_style: {
    width: 22,
    height: 22,
    marginRight: 12,
    resizeMode: "contain",
  },

  text_field_sub_container: {
    height: 70,
    // width: Dimensions.get('window').width - 100,
    marginBottom: 24,
    marginTop: 0,
    marginLeft: 20,
    marginRight: 20,
  },
  textfield_label_text_style: {
    fontSize: 14,
    fontFamily: fonts.Urbanist_Regular,
    fontWeight: "500",
    color: colors.black,
    textAlign: "left",
    marginLeft: 20,
  },
  star_marker_style: {
    color: colors.black,
  },
  chevronIconComponent_style: {
    resizeMode: "contain",
    height: 11,
    width: 11,
    marginRight: -5,
    tintColor: colors.grey500,
  },
  button_txt_style: {
    // width: "85%",
    fontSize: 14,
    fontFamily: fonts.Urbanist_Regular,
    fontWeight: "600",
    // marginLeft: 100,
    color: colors.blue,
    // textDecorationLine: "underline",
  },
  navbar: {
    width: "95%",
    height: 49,
    justifyContent: "flex-start",
    flexDirection: "row",
    //backgroundColor: Colors.BLACK,
    marginTop: 10,
  },
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "contain",
    alignItems: 'center',
    justifyContent: 'center'
  },
});
