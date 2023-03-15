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
    minHeight: sizing.getDimensionHeight(0.95),
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
    marginTop: isIphoneXorAbove() ? moderateScale(38) : moderateScale(20),
  },
  ctnButtton: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(40) : moderateScale(70),
  },
  ctnWrapper: {
    position: 'relative',
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(30),
    flex: 1,
  },
  ctnTxtDone: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(16),
    color: colors.black,
  },
  ctnKet: {
    paddingVertical: moderateScale(10),
    flex: 0.5,
    marginTop: moderateScale(30),
  },
  ctnTxtKet: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(18),
    color: colors.black,
    lineHeight: moderateScale(28),
  },
  ctnImg: {
    width: moderateScale(180),
    height: moderateScale(180),
    resizeMode: 'contain',
  },
  ctnImgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(30),
  },
  ctnTxtImg: {
    fontFamily: fonts.InterSemiBold,
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
  },
  btnStyle: {
    position: 'absolute',
    left: moderateScale(20),
    marginTop: moderateScale(20),
  },
  btnClose: {
    height: moderateScale(24),
    width: moderateScale(24),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
});
