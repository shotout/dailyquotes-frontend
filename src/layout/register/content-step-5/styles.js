import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(26),
  },
  txtBold: {
    fontFamily: fonts.InterExtraBold,
  },
  txtFeelingdesc: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    fontFamily: fonts.InterRegular,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(26),
  },
});
