/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import {colors, fonts} from '../configs/Configs';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import BackButton from '../components/BackButton';
import {useEffect} from 'react';

const WebviewScreen = ({navigation}: any) => {
  useEffect(() => {});

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.container]}>
        <View style={styles.navbar}>
          <BackButton
            buttonColor={colors.white}
            buttonImage="../assets/images/left-arrow.png"
            buttonStyle={{
              width: 36,
              alignSelf: 'center',
              height: 36,
              borderRadius: 0,
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
        <WebView
          style={styles.webview}
          source={{uri: 'https://www.yantramart.com/en/'}}
        />
      </View>
    </SafeAreaView>
  );
};
export default WebviewScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  main_container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    // backgroundColor: colors.black,
    marginBottom: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  webview: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.black,
  },
  navbar: {
    width: '100%',
    height: 49,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    //backgroundColor: Colors.BLACK,
  },
});
