import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  mainWrapper: {
    // marginTop: '35%',
    marginHorizontal: moderateScale(20),
  },
  ctnInput: {
    height: moderateScale(48),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  inputStyle: {
    flex: 1,
    fontFamily: fonts.InterRegular,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  txtLimit: {
    fontFamily: fonts.InterRegular,
    color: colors.dark,
    paddingTop: moderateScale(8),
    fontSize: moderateScale(12),
  },
  txtRed: {
    fontFamily: fonts.InterSemiBold,
    color: colors.red,
    paddingTop: moderateScale(8),
    fontSize: moderateScale(11),
  },
});
