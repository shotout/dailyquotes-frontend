import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  stepWrapper: {
    width: '100%',
    // position: 'absolute',
    top: isIphoneXorAbove() ? moderateScale(60) : moderateScale(40),
    // top: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgTextTop: {
    height: moderateScale(34),
    borderRadius: moderateScale(34 / 2),
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStep: {
    fontSize: moderateScale(12),
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.InterSemiBold,
  },
});
