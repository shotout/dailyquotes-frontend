import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnScroll: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingBottom: isIphoneXorAbove() ? moderateScale(100) : moderateScale(100),
  },
  rowHeaderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: moderateScale(30),
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
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
    marginTop: isIphoneXorAbove() ? moderateScale(10) : moderateScale(20),
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
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  btnStyle: {
    position: 'relative',
  },
  ctnLabel: {
    borderColor: colors.defaultBorder,
    borderBottomWidth: moderateScale(1),
    paddingBottom: moderateScale(16),
  },
  ctnHeader: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(16),
  },
  ctnSearch: {
    flex: 1,
    marginHorizontal: moderateScale(12),
  },
});
