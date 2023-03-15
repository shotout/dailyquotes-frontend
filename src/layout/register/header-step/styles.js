import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';

export default StyleSheet.create({
  ctnRoot: {
    margin: moderateScale(20),
    paddingTop: isIphoneXorAbove() ? moderateScale(28) : 0,
    // backgroundColor: 'red',
  },
  imgStep: {
    width: '100%',
    height: moderateScale(40),
    resizeMode: 'contain',
  },
});
