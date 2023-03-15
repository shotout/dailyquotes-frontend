import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(207),
    height: moderateScale(181),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
    flex: 1,
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.YesevaOne,
    color: colors.purple,
    textAlign: 'center',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(34),
  },
  txtNotif: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  txtBlod: {
    fontFamily: fonts.InterBold,
  },
  ctnInput: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    height: moderateScale(48),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
  },
  leftInput: {
    flex: 1,
  },
  txtLeftInput: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  rightInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnSelect: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(26 / 2),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnValue: {
    width: moderateScale(94),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtValue: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  txtDecrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.red,
    fontSize: moderateScale(18),
  },
  txtIncrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.blue,
    fontSize: moderateScale(18),
    marginTop: moderateScale(-3),
  },
  ctnCenter: {
    // flex: 1,
    paddingTop: moderateScale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnBannerAlt: {
    paddingTop: 0,
    marginTop: moderateScale(-30),
  },
});
