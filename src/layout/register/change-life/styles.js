import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone, isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

const isSmallPhone = isIphone && !isIphoneXorAbove();

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(60),
    paddingBottom: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(100),
    height: moderateScale(100),
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
    justifyContent: isSmallPhone ? 'space-between' : 'center',
    // alignItems: 'center',
    flex: 1,
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.YesevaOne,
    color: colors.purple,
    textAlign: 'center',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(36),
  },
  txtDesc: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  ctnRowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(12),
  },
  btnStyle: {
    width: '48%',
    marginHorizontal: 0,
    marginTop: moderateScale(0),
    marginBottom: moderateScale(12),
  },
  ctnGoalsInput: {
    paddingTop: '28%',
    paddingBottom: moderateScale(20),
  },
  animationStyle: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
});
