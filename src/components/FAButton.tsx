/* eslint-disable react-native/no-inline-styles */
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {colors} from '../configs/Configs';
const FAButton = ({
  title,
  Icon,
  withIcon = false,
  loading = false,
  disabled = false,
  borderType = 'rectangle',
  type = 'primary',
  buttonStyle,
  textStyle,
  action,
}: {
  title?: string;
  Icon?: any;
  withIcon?: boolean;
  loading?: boolean;
  disabled?: boolean;
  borderType?: 'rectangle' | 'rounded';
  type?:
    | 'primary'
    | 'danger'
    | 'warning'
    | 'info'
    | 'disabled'
    | 'white'
    | 'black';
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  action?: () => void;
}) => {
  const BorderStyle = {
    rectangle: {
      borderRadius: 20,
    },
    rounded: {
      borderRadius: 30,
    },
  };
  const ButtonType = {
    primary: {
      backgroundColor: colors.blue,
    },
    danger: {
      backgroundColor: colors.red,
    },
    warning: {
      backgroundColor: colors.grey,
    },
    info: {
      backgroundColor: colors.softgrey,
    },
    disabled: {
      backgroundColor: colors.grey,
    },
    white: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.grey,
    },
    black: {
      backgroundColor: colors.black,
    },
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      onPress={action}
      style={[
        styles.buttonBase,
        ButtonType[type],
        BorderStyle[borderType],
        buttonStyle,
      ]}>
      {loading ? (
        <ActivityIndicator
          animating={loading}
          color={type === 'white' ? colors.blue : colors.white}
        />
      ) : withIcon ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {Icon}
            <Text
              style={[
                {
                  color:
                    type === 'white'
                      ? colors.black
                      : type === 'disabled'
                      ? colors.white
                      : colors.white,
                },
                textStyle,
              ]}>
              {title}
            </Text>
          </View>
        </>
      ) : ['', undefined, null].includes(title) ? (
        Icon
      ) : (
        <Text
          style={[
            {
              color:
                type === 'white'
                  ? colors.black
                  : type === 'disabled'
                  ? colors.white
                  : colors.white,
            },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default FAButton;

const styles = StyleSheet.create({
  buttonBase: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
});
