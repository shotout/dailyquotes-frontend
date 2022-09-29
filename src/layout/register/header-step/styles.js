import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  ctnRoot: {
    margin: moderateScale(20),
    // backgroundColor: 'red',
  },
  imgStep: {
    width: '100%',
    height: moderateScale(40),
    resizeMode: 'contain',
  },
});
