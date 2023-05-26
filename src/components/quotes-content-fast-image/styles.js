/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { isIphoneXorAbove } from '../../shared/devices';
import { colors, fonts, sizing } from '../../shared/styling';

export default StyleSheet.create({
  ctnWrapper:{
    position: 'relative'
  },
  ctnBackgroundImage: {
    resizeMode: 'cover',
    width: sizing.getWindowWidth(1),
    height: sizing.getDimensionHeight(1),
  },
  ctnIcon: {
    flex: 1,
    // backgroundColor: 'red',
    marginBottom: isIphoneXorAbove() ? moderateScale(90) : moderateScale(70)
  },
  ctnPdAds:{
    marginBottom: isIphoneXorAbove() ? moderateScale(150) : moderateScale(130)
  },
  quotesWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnQuotesIcon: {
    width: moderateScale(80),
    height: moderateScale(80),
    alignSelf: 'center',
    marginBottom: moderateScale(30)
  },
  txtQuotesWrapper: {
    paddingHorizontal: moderateScale(30),
    marginBottom: moderateScale(60)
  },
  ctnQuotes: {
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.QuotesText,
    lineHeight: moderateScale(24),
    padding: moderateScale(4)
  },
  ctnAbsolute:{
    position: 'absolute'
  }
});
