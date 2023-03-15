import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts, sizing} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  ctnBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  flexOne: {
    flex: 1,
  },
  ctnLogoIcon: {
    width: moderateScale(217),
    height: moderateScale(201),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '30%',
  },
  btnSkip: {
    marginHorizontal: moderateScale(20),
    height: moderateScale(44),
    // backgroundColor: 'red',
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  txtSkip: {
    color: colors.black,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterBold,
  },
  btnContinue: {
    marginTop: 0,
  },
  ctnHeight: {
    height: moderateScale(1),
  },
  ctnScroll: {
    flexGrow: 1,
  },
  txtSubscription: {
    color: colors.black,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    marginBottom: moderateScale(16),
  },
  btnWrapper: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(10) : 0,
  },
  noMgBtm: {
    marginBottom: 0,
  },
  ctnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(10),
  },
  btnTerms: {
    paddingHorizontal: moderateScale(10),
    paddingBottom: moderateScale(30),
  },
  txtTerms: {
    color: colors.black,
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: fonts.InterSemiBold,
  },
  registerStyle: {
    width: '100%',
    height: moderateScale(230),
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
  mgBtmMore: {
    marginBottom: moderateScale(20),
  },
  mgBtm40: {
    marginBottom: moderateScale(40),
  },

  ctnConvetti: {
    position: 'absolute',
    width: '100%',
    height: sizing.getDimensionHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
  animationStyle: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
});
