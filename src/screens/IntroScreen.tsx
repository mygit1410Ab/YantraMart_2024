/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import FAButton from '../components/FAButton';
import {colors, fonts} from '../configs/Configs';
import {fontStyles} from '../style/FontsStyle';
import {PermissionsAndroid} from 'react-native';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import useAuthAPI from "../hooks/useAuthAPI";
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const IntroScreen = ({navigation}: any) => {
  const { isLoading } = useAuthAPI();

  const onSubmitPress = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    checkToken();
    navigation.navigate('AuthMainScreen');
  };
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('Message handled in the background!', remoteMessage);
    });
  });
  const checkToken = async () => {
    const femToken = await messaging().getToken();
    if (femToken) {
      console.log('femToken====>>>>', femToken);
      //call_register_device(femToken);
    }
  };
  // const call_register_device = async (player_id: string) => {
  //   try {
  //     const response = await register_device_id(player_id);
  //     console.log('call_register====>>', response);
  //   } catch (err) {
  //     // Toast.show({
  //     //   text1: 'Unable to register',
  //     //   type: 'failure',
  //     // });
  //     console.error(err);
  //   } finally {
  //   }
  // };
  return (
    <View style={[styles.main_container]}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text
          numberOfLines={1}
          style={[
            fontStyles.heading_3_text,
            {
              textAlign: 'left',
              // textTransform: "lowercase",
              color: colors.black,
              //   lineHeight: 32,
              fontWeight: '700',
              marginLeft: 0,
              letterSpacing: 0.3,
            },
          ]}>
          {'YANTRAMART'}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            fontStyles.heading_3_text,
            {
              textAlign: 'left',
              // textTransform: "lowercase",
              color: colors.black,
              //   lineHeight: 32,
              fontWeight: '700',
              marginLeft: 0,
              letterSpacing: 0.3,
            },
          ]}>
          {'Show the world what you have got, Heavy machine Buy, Sell and Rent'}
        </Text>
      </View>
      <View style={[styles.button_container, {}]}>
        <FAButton
          title={'Continue To Home'}
          buttonStyle={{
            width: '100%',
            height: 48,
            borderRadius: 24,
            backgroundColor: colors.blue,
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: fonts.Urbanist_Regular,
            fontWeight: '700',
            color: colors.white,
          }}
          action={() => {
            onSubmitPress();
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
        {/* <FAButton
          title={'Register'}
          buttonStyle={{
            width: '100%',
            height: 48,
            borderRadius: 24,
            marginTop: 0,
            backgroundColor: colors.yellow,
          }}
          textStyle={{
            fontSize: 14,
            fontFamily: fonts.Urbanist_Regular,
            fontWeight: '700',
            color: colors.white,
          }}
          action={() => {
            //Alert.alert('You tapped the Decrypt button!');
            //onSubmitPress();
            // let activeIndex = sliderRef?.state.activeIndex || 0;
            // if (activeIndex === 2) {
            //   navigation.navigate('SignInScreen');
            // } else {
            //   sliderRef?.goToSlide(activeIndex + 1);
            // }
          }}
        /> */}
      </View>
    </View>
  );
};
export default IntroScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.blue,
    flexDirection: 'column',
    alignItems: 'center',
  },
  main_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  logo: {
    resizeMode: 'contain',
    //   position: "absolute",
    height: 150,
    width: 150,
    marginTop: 120,
    marginBottom: 10,
    marginLeft: 0,
  },
  button_container: {
    height: 70,
    width: '100%',
    marginTop: 0,
    paddingHorizontal: 40,
    marginBottom: 40,
    flexDirection: 'column',
    // backgroundColor: colors.black,
    justifyContent: 'space-between',
  },

  heading_txt_style: {
    marginBottom: 10,
    color: colors.grey500,
    textAlign: 'left',
    marginLeft: 20,
  },
  subheading_txt_style: {
    color: colors.dark,
    marginLeft: 20,
    marginRight: 20,
  },
  slider_container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  slider_box_container: {
    width: '100%',
    height: '70%',
    // backgroundColor: colors.blue,
  },
  slider_text_container: {
    width: '100%',
    height: '25%',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // backgroundColor: colors.black,
    borderRadius: 0,
  },
});
