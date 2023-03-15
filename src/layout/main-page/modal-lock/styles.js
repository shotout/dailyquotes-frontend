import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: moderateScale(20),
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
    paddingBottom: 0,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: isIphoneXorAbove() ? moderateScale(50) : moderateScale(20),
  },
  ctnWrapper: {
    position: 'relative',
    paddingTop: moderateScale(30),
    // flex: 1,
  },
  ctnTxtDone: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(16),
    color: colors.black,
    paddingHorizontal: moderateScale(30),
  },
  ctnImg: {
    width: moderateScale(70),
    height: moderateScale(70),
    resizeMode: 'contain',
  },
  ctnImgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(20),
  },
  ctnTxtImg: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(20),
    color: colors.black,
    textAlign: 'center',
    marginTop: moderateScale(15),
  },
  ctnInput: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(12),
    height: moderateScale(42),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
  },
  ctnRadius: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(28 / 2),
    padding: moderateScale(6),
  },
  iconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  txtItem: {
    marginHorizontal: moderateScale(12),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(26),
  },
  ctnSeparator: {
    width: moderateScale(24),
    height: moderateScale(24),
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(26),
  },
  wrapper: {
    position: 'relative',
  },
  buttonStyle: {
    marginTop: moderateScale(10),
  },
  txtTopButton: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12),
    color: colors.black,
    textAlign: 'center',
  },
  wrapperFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(20),
  },
  txtFooter: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(11),
    color: colors.black,
  },
  touchWrap: {
    marginBottom: moderateScale(50),
  },
});
