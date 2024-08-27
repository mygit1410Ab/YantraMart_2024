const Colors = {
  white: '#FFFFFF',
  transparent: '#ffffff00',
  black: '#000000',
  red: '#b52424',
  red100: '#FD451C',

  dark: '#191A26',
  grey: '#808D9E',
  grey100: '#F4F6FB',
  grey600: '#363944',

  grey500: '#797D81',

  greyTextField: '#DFE1E8',
  blue: '#3501FF',
  softgrey: '#EDF1F8',
  yellow: '#F9B34C',
  darkYellow: '#ff7400',
  lightGreen:'#9ec027',
  darkGreen:'#006B3D'
};

export default Colors;


export const formatIndianNumber = (number:number) => {
  let integerPart = number.toString().split('.')[0];
  
  let lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const formattedIntegerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return formattedIntegerPart;
};


