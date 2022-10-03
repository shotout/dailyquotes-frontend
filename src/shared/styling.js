import {Dimensions} from 'react-native';

export const colors = {
  white: '#fff',
  black: '#000',
  purple: '#44417C',
  gray: '#CCCCCC', // unactive button
  lightBlue: '#D5EFF0', // input color
  blue: '#00C2CB',
  red: '#ED5267',
};

export const fonts = {
  InterBlack: 'Inter-Black',
  InterBold: 'Inter-Bold',
  InterExtraBold: 'Inter-ExtraBold',
  InterExtraLight: 'Inter-ExtraLight',
  InterLight: 'Inter-Light',
  InterMedium: 'Inter-Medium',
  InterRegular: 'Inter-Regular',
  InterSemiBold: 'Inter-SemiBold',
  InterThin: 'Inter-Thin',
};

export const sizing = {
  getDimensionWidth: value => Dimensions.get('screen').width * value,
  getDimensionHeight: value => Dimensions.get('screen').height * value,
};
