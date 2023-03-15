import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: moderateScale(20),
  },
  ctnScroll: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingBottom: isIphoneXorAbove() ? moderateScale(100) : moderateScale(120),
  },
  rowHeaderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
    textAlign: 'center',
  },
  ctnContent: {
    height: '100%',
    width: '100%',
    minHeight: sizing.getDimensionHeight(1),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingBottom: 0,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: isIphoneXorAbove() ? moderateScale(10) : moderateScale(0),
  },
  ctnRelative: {
    position: 'relative',
  },
  txtHeaderBtn: {
    fontSize: moderateScale(14),
    color: colors.tosca,
    fontFamily: fonts.InterMedium,
  },
  ctnJustifyEnd: {
    justifyContent: 'flex-end',
  },
  txtMix: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
  },
  marginTop: {
    marginVertical: moderateScale(20),
  },
  btnClose: {
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  btnStyle: {
    position: 'absolute',
    right: 0,
    top: moderateScale(20),
  },
  ctnLabel: {
    borderColor: colors.defaultBorder,
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(16),
  },
  ctnHeader: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(16),
  },
  ctnTextHeader: {
    paddingTop: moderateScale(0),
    paddingBottom: moderateScale(20),
  },
  txtBlack: {
    color: '#000',
  },
  ctnClose: {
    paddingTop: isIphoneXorAbove() ? moderateScale(78) : moderateScale(60),
  },
});
