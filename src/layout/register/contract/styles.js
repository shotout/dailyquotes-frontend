import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
    // minHeight: moderateScale(730),
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(280),
    height: moderateScale(280),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.YesevaOne,
    color: colors.purple,
    textAlign: 'center',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(34),
  },
  txtNotif: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(8),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  ctnInput: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    height: moderateScale(48),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
  },
  leftInput: {
    flex: 1,
  },
  txtLeftInput: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  rightInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnSelect: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(26 / 2),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnValue: {
    width: moderateScale(94),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtValue: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  txtDecrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.red,
    fontSize: moderateScale(18),
  },
  txtIncrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.blue,
    fontSize: moderateScale(18),
    marginTop: moderateScale(-3),
  },
  ctnRootCenter: {
    flex: 1,
    paddingTop: isIphoneXorAbove() ? moderateScale(98) : moderateScale(80),
  },
  ctnChecklist: {
    marginTop: moderateScale(60),
  },
  wrapperContract: {
    marginTop: moderateScale(30),
    marginHorizontal: moderateScale(20),
  },
  rowContract: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: moderateScale(16),
  },
  borderContent: {
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: moderateScale(1),
    marginBottom: moderateScale(16),
  },
  icnContract: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
  },
  descContract: {
    marginLeft: moderateScale(12),
    flex: 1,
  },
  txtContract: {
    fontFamily: fonts.InterMedium,
    color: colors.black,
    fontSize: moderateScale(15),
    lineHeight: moderateScale(22),
  },
  txtBlue: {
    color: colors.blue,
  },
  ctnDesc: {
    marginHorizontal: moderateScale(20),
  },
  txtDesc: {
    fontFamily: fonts.InterMedium,
    color: '#515151',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(20),
  },
  mainWrapper: {
    flex: 1,
  },
  btnWrapper: {
    // alignSelf: 'center',
    width: '100%',
    bottom: -sizing.getDimensionHeight(isIphoneXorAbove() ? 0.8 : 0.82),
    position: 'absolute',
    height: sizing.getDimensionHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreBtm: {
    bottom: -sizing.getDimensionHeight(isIphoneXorAbove() ? 0.805 : 0.83),
  },
  altBtnWrapper: {
    backgroundColor: 'rgba(0, 194, 203,0.5)',
    width: sizing.getDimensionHeight(2),
    height: sizing.getDimensionHeight(2),
    borderRadius: sizing.getDimensionHeight(2) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ctnButton: {
    width: sizing.getDimensionHeight(2) - 120,
    height: sizing.getDimensionHeight(2) - 120,
    borderRadius: (sizing.getDimensionHeight(2) - 120) / 2,
    backgroundColor: '#00C2CB',
    // borderWidth: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  txtButton: {
    fontFamily: fonts.YesevaOne,
    color: colors.white,
    textAlign: 'center',
  },
  ctnAnimate: {
    // backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnText: {
    // backgroundColor: 'red',
    width: moderateScale(100),
    height: moderateScale(100),
    margin: moderateScale(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnMore: {
    height: moderateScale(230),
  },
});
