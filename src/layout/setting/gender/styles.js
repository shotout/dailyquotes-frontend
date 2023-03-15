import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: moderateScale(25),
  },
  ctnContent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: isIphoneXorAbove() ? moderateScale(80) : moderateScale(30),
    paddingBottom: moderateScale(80),
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  btnSkip: {
    marginHorizontal: moderateScale(20),
    height: moderateScale(44),
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
  mainWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  ctnBanner: {
    position: 'relative',
    paddingBottom: moderateScale(20),
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
