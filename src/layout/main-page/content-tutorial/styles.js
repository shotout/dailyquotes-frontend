/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.black,
  },
  ctnBackgroundImage: {
    resizeMode: 'cover',
    width: sizing.getWindowWidth(1),
    height: sizing.getDimensionHeight(1),
    overflow: 'hidden',
  },
  ctnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnFirstIcon: {
    width: moderateScale(90),
    height: moderateScale(90),
    alignSelf: 'center',
    marginBottom: moderateScale(8),
  },
  ctnLogoIcon: {
    width: moderateScale(60),
    height: moderateScale(80),
    alignSelf: 'center',
    marginBottom: moderateScale(20),
  },
  bgTextBottom: {
    height: moderateScale(30),
    borderRadius: moderateScale(30 / 2),
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkip: {
    paddingHorizontal: moderateScale(20),
    minWidth: moderateScale(160),
    height: moderateScale(38),
    backgroundColor: colors.red,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  btnSkipGreen: {
    paddingHorizontal: moderateScale(20),
    minWidth: moderateScale(160),
    height: moderateScale(38),
    backgroundColor: colors.tosca,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  txtSkip: {
    fontSize: moderateScale(14),
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.InterMedium,
  },
  ctnIcon: {
    flex: 1,
  },
  ctnTutorial: {
    width: '100%',
  },
  ctnImgLove: {
    width: moderateScale(150),
    height: moderateScale(150),
  },
  ctnTapLove: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textStep: {
    fontSize: moderateScale(12),
    color: colors.black,
    textAlign: 'center',
    fontFamily: fonts.InterSemiBold,
  },quotesWrapper: {
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
    marginBottom: moderateScale(4)
  },
});
