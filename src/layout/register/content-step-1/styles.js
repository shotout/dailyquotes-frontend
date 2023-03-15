import {Platform, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import responsiveFont from '../../../helpers/responsiveFont';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(108),
    height: moderateScale(110),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
  },
  ctnText: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  txtInput: {
    fontFamily: fonts.YesevaOne,
    color: colors.purple,
    textAlign: 'center',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(34),
  },
  ctnSuccess: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(40),
  },
  txtSuccessTitle: {
    fontFamily: fonts.YesevaOne,
    // fontSize: moderateScale(50),
    fontSize:
      Platform.OS === 'android' ? responsiveFont(50) : responsiveFont(58),
    color: colors.purple,
    textAlign: 'center',
  },
  txtDescTitle: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    marginTop: moderateScale(18),
    marginBottom: moderateScale(10),
  },
  welcomeText: {
    // marginTop: 0,
    fontSize: moderateScale(16),
    marginTop: moderateScale(6),
  },
  mainStyle: {},
});
