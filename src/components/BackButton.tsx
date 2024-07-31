import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';

interface Props {
  onPress: () => void;
  buttonColor?: string;
  buttonImage?: string;
  buttonStyle?: any;
}
const BackButton = (props: Props) => {
  const {onPress, buttonColor, buttonStyle} = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#F93549',
      }}
      onPress={onPress}>
      <Image
        source={require('../assets/images/left-arrow.png')}
        style={styles.main_bg_image}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F93549',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main_bg_image: {
    flex: 1,
    width: '60%',
    height: '100%',
    resizeMode: 'contain',
    position: 'absolute',
  },
});
