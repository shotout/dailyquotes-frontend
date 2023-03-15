import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnContent: {
    height: '100%',
    width: '100%',
    // minHeight: sizing.getDimensionHeight(0.95),
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
    marginTop: isIphoneXorAbove() ? moderateScale(42) : moderateScale(32),
  },
  ctnWrap: {
    paddingHorizontal: moderateScale(20),
  },
  ctnChanged: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  ctnBgChanged: {
    backgroundColor: colors.darkGray,
    borderRadius: moderateScale(20 / 2),
    paddingVertical: moderateScale(10),
  },
  rowChanged: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(20),
  },
  iconChangedWrap: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
  txtChanged: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.white,
    paddingLeft: moderateScale(10),
  },
  btnWrap: {
    paddingVertical: moderateScale(10),
    borderTopColor: colors.gray,
    borderTopWidth: moderateScale(0.5),
  },
  btnOke: {
    color: colors.lightPurple,
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  ctnBanner: {
    position: 'relative',
    marginVertical: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(177),
    height: moderateScale(161),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
