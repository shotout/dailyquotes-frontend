/* eslint-disable prettier/prettier */
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
  ctnCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepWrapper: {
    width: '100%',
    position: 'absolute',
    top: moderateScale(40),
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
  ctnLogoIcon: {
    width: moderateScale(60),
    height: moderateScale(80),
    resizeMode: 'contain',
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
    paddingHorizontal: moderateScale(28),
    height: moderateScale(30),
    backgroundColor: colors.red,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(16),
  },
  txtSkip: {
    fontSize: moderateScale(12),
    color: colors.white,
    textAlign: 'center',
    fontFamily: fonts.InterMedium,
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  rowLef:{
    width: moderateScale(110)
  },
  btnCategories: {
    paddingHorizontal: moderateScale(8),
    marginLeft: moderateScale(0),
    marginRight: moderateScale(0),
    width: '100%',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(113),
    // backgroundColor: 'red'
  },
  btnRight: {
    width: moderateScale(48),
    height: moderateScale(48),
    marginRight: 0,
    borderRadius: moderateScale(10),
    marginLeft: 0
  },
  mgLeft:{
    marginLeft: moderateScale(12),
  },
  btnWrapper: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(20) : 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  ctnPdAds:{
    paddingBottom: isIphoneXorAbove() ? moderateScale(70) : moderateScale(60),
  },
  ctnIcon: {
    flex: 1,
  },
  quotesWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: moderateScale(80),
  },
  ctnQuotesIcon: {
    width: moderateScale(80),
    height: moderateScale(80),
    alignSelf: 'center',
    marginTop: moderateScale(-50),
    marginBottom: moderateScale(40),
  },
  ctnTutorial: {
    position: 'absolute',
    width: '100%',
    bottom: moderateScale(90),
  },
  ctnRelative: {
    position: 'relative',
  },
  ctnWatermark: {
    position: 'absolute',
    top: isIphoneXorAbove() ? moderateScale(110) : moderateScale(90),
    right: moderateScale(20),
  },
  txtWatermark: {
    fontFamily: fonts.InterMedium,
    color: colors.watermark,
    fontSize: moderateScale(16),
  },
  ctnViewShot: {
    position: 'absolute',
    width: '100%',
    height: sizing.getWindowHeight(1),
    top: sizing.getDimensionHeight(-100),
  },
  ctnLike: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  iconLikeWrap: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  ctnFreeBadge:{
    position: 'absolute',
    top: isIphoneXorAbove() ? moderateScale(60) : moderateScale(30),
    right: moderateScale(20),
    height: moderateScale(40),
    backgroundColor: 'rgba(68, 65, 124,0.6)',
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20)
  },
  txtFreeBadge:{
    color: colors.white,
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14)
  },
  ctnIconCrown:{
    width: moderateScale(26),
    height: moderateScale(26),
    marginRight: moderateScale(6)
  },
  ctnShare: {
    position: 'relative'
  },
  ctnPopupShare:{
    position: 'absolute',
    bottom: moderateScale(58),
    right: moderateScale(-63),
    aspectRatio: 249 / 93,
    width: moderateScale(170),
    overflow: 'visible'
  },
  ctnUnion:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  txtPopupMedium:{
    fontFamily: fonts.InterMedium,
    color: colors.white,
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginTop: moderateScale(6)
  },
  txtPopupBold:{
    fontFamily: fonts.InterBold,
    color: colors.white,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  rectangleStyle:{
    alignSelf: 'center',
    top: -200,
    height: moderateScale(22),
    width: moderateScale(22),
    resizeMode: 'contain',
    backgroundColor: 'red'
  },
  ctnRounded:{
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50 / 2),
    padding: moderateScale(12),
    marginHorizontal: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  subBottomWrapper:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(12)
  },
  ctnIconCategories:{
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(8)
  },
  txtCategory:{
    fontSize: moderateScale(13)
  },
  ctnBannerAds:{
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: isIphoneXorAbove() ? moderateScale(14) : 0,
    bottom: 0
  },
  ctnSwipe: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'red',
    bottom: isIphoneXorAbove() ? moderateScale(120) : moderateScale(110),
    justifyContent: 'center',
    alignItems: 'center'
  },
  adjustBtmPremiumSwipe:{
    bottom: moderateScale(70)
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
    marginBottom: moderateScale(6),
  },
  ctnSlideUp: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'red',
    bottom: moderateScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnSlideDown: {
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'red',
    bottom: moderateScale(0),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
