/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
// import {colors} from '../configs/Configs';
import {fontStyles} from '../style/FontsStyle';

interface Props {
  onPressLeft: () => void;
  onPressRight: () => void;
  leftText?: string;
  centertitle?: string;
  rightText?: string;
  leftIcon?: any;
  rightIcon?: any;
}
const NavBar = (props: Props) => {
  const {onPressLeft, onPressRight} = props;
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {props.leftText === '' ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressLeft}>
            {props.leftIcon}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            <Text style={[fontStyles.heading_2_text, {fontWeight: '700'}]}>
              {props.leftText}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={[fontStyles.big_title_text, {fontWeight: '700'}]}>
          {props.centertitle}
        </Text>
        {props.rightText === '' ? (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            {props.rightIcon}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={onPressRight}>
            {props.rightText}
          </TouchableOpacity>
        )}
      </View>
      {/* <Text style={styles.for_business_style}>for business</Text> */}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    //backgroundColor: Colors.gray500,
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 6,
    marginLeft: 20,
    marginRight: 20,
  },
  navbar: {
    width: '100%',
    height: 49,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.black,
    // alignItems: "baseline",
  },
});
