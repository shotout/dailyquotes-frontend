import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    width: sizing.getWindowWidth(1),
    height: sizing.getDimensionHeight(1),
  },
  ctnBgCountdown: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ctnBannerCountdown: {
    width: '100%',
    aspectRatio: 1000 / 964,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  ctnTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(22),
  },
  ctnTimer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(8),
  },
  txtTitle: {
    fontFamily: fonts.InterMedium,
    color: colors.white,
    fontSize: moderateScale(18),
    textAlign: 'center',
  },
  txtTimer: {
    color: '#fff',
    fontSize: moderateScale(30),
    fontFamily: fonts.InterBold,
    textAlign: 'center',
  },
  ctnText: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  txtTitleQuotes: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
  },
  txtDesc: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
    marginTop: moderateScale(4),
  },
  ctnBtn: {
    marginTop: 20,
  },
  btnIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(58),
    borderRadius: moderateScale(16),
  },
  btnImgStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
    marginRight: moderateScale(12),
    top: -2,
  },
  txtBtnStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(16),
  },
  icnPlay: {
    width: moderateScale(26),
    height: moderateScale(26),
    marginRight: moderateScale(8),
    top: 0,
  },
  mgRight: {
    marginTop: 0,
    backgroundColor: '#8F8DB0',
  },
  ctnFree: {
    backgroundColor: '#ED5267',
    height: moderateScale(26),
    paddingHorizontal: moderateScale(18),
    borderRadius: moderateScale(26 / 2),
    position: 'absolute',
    top: moderateScale(8),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFree: {
    color: colors.white,
    fontSize: moderateScale(15),
    fontFamily: fonts.InterMedium,
  },
  ctnSwipe: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: moderateScale(40),
  },
  icnSwipe: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',
  },
  txtSwipe: {
    fontFamily: fonts.InterMedium,
    color: '#B4B4B4',
    fontSize: moderateScale(14),
    marginTop: moderateScale(6),
  },
});
