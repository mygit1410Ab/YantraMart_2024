/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FAButton from "../components/FAButton";
import { colors, fonts } from "../configs/Configs";
import { fontStyles } from "../style/FontsStyle";
import { WebView } from "react-native-webview";

const AuthMainScreen = ({ navigation }: any) => {
  const onRegisterScreen = () => {
    navigation.navigate("RegisterScreen");
  };
  const onLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };
  const onShopScreen = () => {
    navigation.navigate("WebviewScreen");
  };

  return (
    <View style={[styles.main_container]}>


    </View>
  );
};
export default AuthMainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: colors.blue,
    flexDirection: "column",
    alignItems: "center",
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
  },
  logo: {
    resizeMode: "contain",
    //   position: "absolute",
    height: 150,
    width: 150,
    marginTop: 150,
    marginBottom: 10,
    marginLeft: 0,
  },
  button_container: {
    height: 80,
    marginTop: 0,
    paddingHorizontal: 40,
    // marginBottom: 120,
    flexDirection: "row",
    // backgroundColor: colors.black,
    // justifyContent: 'space-between',
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
