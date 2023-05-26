/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot:{
    flex: 1,
  },
  ctnCard: {
    backgroundColor: colors.ligthTosca,
    height: moderateScale(90),
    flex: 1,
    maxWidth: '47%',
    minWidth: '40%',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: moderateScale(2),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  mgRight12:{
    marginRight: moderateScale(16)
  },
  ctnRelative: {
    position: 'relative',
    flex: 1,
  },
  ctnShadow: {
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    paddingTop: moderateScale(26)
  },
  ctnRowCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctnRowItem: {
    justifyContent: 'space-around',
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  ctnItemCategories: {
    justifyContent: 'space-between',
    flex: 1,
    zIndex: 99,
    marginVertical: moderateScale(8)
  },
  txtItem: {
    color: colors.black,
    fontSize: moderateScale(14),
    fontFamily: fonts.InterMedium,
    lineHeight: moderateScale(20),
  },
  ctnImgItem: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  ctnItemRigh: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: moderateScale(50),
    height: '100%',
    right: 0
  },
  ctnIcon: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnIconItem: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  marginTop: {
    marginVertical: moderateScale(20),
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
  },
  ctnAdvert: {
    alignItems: 'center',
  },
  ctnUnlockText: {
    color: colors.black,
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    marginVertical: moderateScale(20),
  },
  ctnImgAdv: {
    width: moderateScale(200),
    height: moderateScale(200),
    resizeMode: 'contain',
  },
  btnGoPremiun: {
    marginHorizontal: moderateScale(0),
  },
  imgStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  grayBg:{
    backgroundColor: colors.grayBg
  },
  mgTop20:{
    marginTop: moderateScale(20)
  },
  ctnEmpty:{
    marginTop: moderateScale(20),
  },
  emptyBanner:{
    width: moderateScale(100),
    height: moderateScale(100),
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  ctnTextDream:{
    marginTop: moderateScale(20),
    borderBottomColor: '#B7B7B7',
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  txtDream:{
    fontFamily: fonts.InterMedium,
    color: colors.black,
    fontSize: moderateScale(16),
    textAlign: 'center',
    lineHeight: moderateScale(24)
  },
  ctnAlt:{
    marginBottom: moderateScale(4)
  },
  txtAlt:{
    fontFamily: fonts.InterMedium,
    color: colors.black,
    fontSize: moderateScale(16),
    textAlign: 'center',
    lineHeight: moderateScale(24)
  },
  ctnRowMain: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  ctnPremiumIcon:{
    alignItems: 'center',
    flexDirection: 'row',
  },
  ctnAdsIcon:{
    height: moderateScale(22),
    borderRadius: moderateScale(22 / 2),
    paddingHorizontal: moderateScale(6),
    marginRight: moderateScale(6),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ED5267'
  },
  iconAds:{
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
    marginRight: moderateScale(4)
  },
  txtAds:{
    color: '#fff',
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12)
  },
  shadowWrapper:{
    position: 'relative',
    paddingTop: moderateScale(20)
  },
  ctnUlockFree:{
    backgroundColor: '#ED5267',
    position: 'absolute',
    top: moderateScale(8),
    alignSelf: 'center',
    height: moderateScale(24),
    borderRadius: moderateScale(24 / 2),
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtUnlockFree:{
    color: '#fff',
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12)
  },
});
