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
  Dimensions,
  ImageBackground,
} from "react-native";
import { colors, fonts } from "../configs/Configs";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontStyles } from "../style/FontsStyle";
import FAButton from "../components/FAButton";
import { useState } from "react";
import { onlyNumberAllowed } from "../utils/Validators";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SelectList } from "react-native-dropdown-select-list";
import useAuthAPI from "../hooks/useAuthAPI";
import Toast from "react-native-toast-message";
import BackButton from "../components/BackButton";
import LocalStorage from "../utils/LocalStorage";

const RegisterScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPhoneLengthExceed, setisPhoneLengthExceed] = useState(true);
  const genderPersonData = [
    { value: "Male", key: "male" },
    { value: "Female", key: "female" },
  ];
  const [genderValue, setGenderValue] = useState("Male");
  const [isTermsConditionSelected, setTermsConditionSelected] = useState(false);
  const { isLoading, register_user } = useAuthAPI();
  const validator = require("validator");

  const onContinuePress = () => {
    // navigation.navigate('MainTabScreen');
    //call_register();
  };
  const onTermsConditionPress = () => {
    Linking.openURL("https://www.yantramart.com/en/page/terms_and_conditions");
  };
  const call_register = async () => {
    try {
      const response = await register_user(
        firstName,
        lastName,
        email,
        userName,
        genderValue,
        companyName,
        phoneNumber,
        password
      );
      if (response.status) {
        LocalStorage.setItem("isLoggedIN", true);
        Toast.show({ text1: response.message, type: "success" });
        navigation.navigate("MainTabScreen");
      } else {
        Toast.show({ text1: response.message, type: "failure" });
      }
    } catch (err) {
      Toast.show({
        text1: "Unable to register",
        type: "failure",
      });
    } finally {
    }
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground
        source={require("../assets/images/bgauth.png")}
        // style={styles.backgroundImage}
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
        <View style={[styles.container]}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.main_container]}>
              <Text
                style={[fontStyles.heading_3_text, styles.heading_txt_style]}
              >
                {"Sign Up"}
              </Text>
              {/* <Text
              style={[fontStyles.caption_text, styles.subheading_txt_style]}>
              {'Enter your details.'}
            </Text> */}
              <View style={styles.text_field_sub_container}>
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: colors.black,
                  }}
                >
                  <Text style={styles.textfield_label_text_style}>
                    {"First Name"}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setFirstName(text);
                    }}
                    value={firstName}
                    placeholder={"First Name"}
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
                    {"Last Name"}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setLastName(text);
                    }}
                    value={lastName}
                    placeholder={"Last Name"}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    value={email}
                    placeholder={"Email"}
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
                    {"Username"}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setUserName(text);
                    }}
                    value={userName}
                    placeholder={"Username"}
                    placeholderTextColor={colors.grey}
                    keyboardType="default"
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: colors.black,
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Text style={styles.textfield_label_text_style}>
                  {"Gender"}
                </Text>
              </View>
              <SelectList
                search={false}
                data={genderPersonData}
                setSelected={setGenderValue}
                inputStyles={{
                  marginLeft: 0,
                  fontSize: 14,
                  fontFamily: fonts.Urbanist_Regular,
                  marginRight: -6,
                  color: colors.black,
                }}
                dropdownTextStyles={{
                  marginLeft: -10,
                  color: colors.black,
                  fontSize: 14,
                  fontFamily: fonts.Urbanist_Regular,
                  marginRight: -26,
                  marginTop: -2,
                }}
                placeholder="Male"
                fontFamily={fonts.Urbanist_Regular}
                searchicon={<Text></Text>}
                boxStyles={{
                  borderRadius: 30,
                  borderColor: colors.greyTextField,
                  marginTop: 10,
                  // width: Dimensions.get('window').width - 60,
                  marginLeft: 20,
                  marginRight: 20,
                  // marginBottom: 24,
                }}
                // arrowicon={
                //   <Image
                //     source={require('../../assets/images/dropdown_arrow.png')}
                //     style={[styles.chevronIconComponent_style, {marginTop: 4}]}
                //   />
                // }
              />
              <View
                style={[styles.text_field_sub_container, { marginTop: 24 }]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // backgroundColor: colors.black,
                  }}
                >
                  <Text style={styles.textfield_label_text_style}>
                    {"Company Name"}
                  </Text>
                  {/* <Text style={styles.star_marker_style}>{'*'}</Text> */}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setCompanyName(text);
                    }}
                    value={companyName}
                    placeholder={"Company Name"}
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
                    {"Phone"}
                  </Text>
                  {/* <Text style={styles.star_marker_style}>{'*'}</Text> */}
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setPhoneNumber(text);
                    }}
                    value={phoneNumber}
                    maxLength={10}
                    placeholder={"Phone"}
                    placeholderTextColor={colors.grey}
                    keyboardType="number-pad"
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
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    value={password}
                    secureTextEntry={true}
                    placeholder={"password"}
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
                    {"Confirm Passowrd"}
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
                    secureTextEntry={true}
                    style={[
                      styles.input,
                      fontStyles.paragraph_text,
                      {
                        width: "100%",
                        borderColor: colors.greyTextField,
                      },
                    ]}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                    }}
                    value={confirmPassword}
                    placeholder={"confirm password"}
                    placeholderTextColor={colors.grey}
                    keyboardType="default"
                  />
                </View>
              </View>
              <View
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
                      tintColor: colors.darkGreen,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    {
                      fontSize: 14,
                      fontFamily: fonts.Urbanist_Regular,
                      fontWeight: "500",
                      color: colors.black,
                      textAlign: "left",
                      marginLeft: 10,
                    },
                  ]}
                >
                  {"I have read the "}
                  {/* <TouchableOpacity onPress={onTermsConditionPress}> */}
                  <Text
                    style={styles.button_txt_style}
                    onPress={onTermsConditionPress}
                  >
                    {"Terms and Condition"}
                  </Text>
                  {/* </TouchableOpacity> */}

                  {/* <TouchableOpacity onPress={onPloicyPress}> */}

                  {/* </TouchableOpacity> */}
                </Text>
              </View>
              <View style={[styles.button_container, {}]}>
                <FAButton
                  title={"Sign Up"}
                  disabled={
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    email.length > 0 &&
                    userName.length > 0 &&
                    genderValue.length > 0 &&
                    companyName.length > 0 &&
                    phoneNumber.length > 0 &&
                    phoneNumber.length < 11 &&
                    phoneNumber.length == 10 &&
                    password.length > 0 &&
                    password === confirmPassword &&
                    isTermsConditionSelected &&
                    validator.isEmail(email)
                      ? false
                      : true
                  }
                  type={
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    email.length > 0 &&
                    userName.length > 0 &&
                    genderValue.length > 0 &&
                    companyName.length > 0 &&
                    phoneNumber.length > 0 &&
                    phoneNumber.length < 11 &&
                    phoneNumber.length == 10 &&
                    password.length > 0 &&
                    password === confirmPassword &&
                    isTermsConditionSelected &&
                    validator.isEmail(email)
                      ? "primary"
                      : "disabled"
                  }
                  buttonStyle={{
                    width: "100%",
                    height: 48,
                    borderRadius: 24,
                    marginTop: 20,
                    marginBottom: 20,
                    backgroundColor:
                    firstName.length > 0 &&
                    lastName.length > 0 &&
                    email.length > 0 &&
                    userName.length > 0 &&
                    genderValue.length > 0 &&
                    companyName.length > 0 &&
                    phoneNumber.length > 0 &&
                    phoneNumber.length < 11 &&
                    phoneNumber.length == 10 &&
                    password.length > 0 &&
                    password === confirmPassword &&
                    isTermsConditionSelected &&
                    validator.isEmail(email)
                      ? colors.darkGreen
                      : colors.grey
                  }}
                  textStyle={[
                    fontStyles.bigButton_text,
                    {
                      color: colors.white,
                    },
                  ]}
                  action={() => {
                    call_register();
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    alignItems: "center",
  },
  main_container: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 140,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    width: Dimensions.get("window").width - 60,
    // borderWidth: 1,
    borderColor: colors.grey,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  button_container: {
    // height: 80,
    marginTop: 30,
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
    width: "100%",
    height: Dimensions.get("window").height,
    resizeMode: "contain",
  },
});
