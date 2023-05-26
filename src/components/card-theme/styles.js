/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ctnCard: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(16),
    position: 'relative',
    marginRight: moderateScale(16)
  },
  ctnImgItem: {
    width: moderateScale(95),
    height: moderateScale(150),
    resizeMode: 'cover',
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(2),
    overflow: 'hidden'
  },
  ctnIcon: {
    height: moderateScale(25),
    width: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    borderRadius: moderateScale(25 / 2)
  },
  ctnIconItem: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  bgTransparent: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '96%',
    height: '10%',
    borderBottomLeftRadius: moderateScale(12),
    borderBottomRightRadius: moderateScale(12),
    marginHorizontal: moderateScale(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTittle: {
    color: colors.white,
  },
  rowRandomIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {},
  whiteBg: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    height: moderateScale(20),
    width: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: moderateScale(12),
    top: moderateScale(5),
  },
  ctnIconItemCheklist: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  ctnLoader:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  ctnRowCard:{
    position: 'relative',
  },
  ctnTheme:{
    position: 'relative',
  },
  txtTitle: {
    color: colors.black,
    fontSize: moderateScale(18),
    fontFamily: fonts.InterBold,
  },
  ctnTitle:{
    marginBottom: moderateScale(12),
    paddingHorizontal: moderateScale(20)
  },
  ctnFlatlist:{
    flex: 1
  },
  firstItem:{
    marginLeft: moderateScale(20)
  },
  lastItem:{
    marginRight: moderateScale(20)
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
  ctnLock:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: moderateScale(6),
    paddingLeft: moderateScale(4)
  }
});
