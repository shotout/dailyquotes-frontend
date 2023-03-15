import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone, isIphoneXorAbove} from '../../shared/devices';
import {colors, fonts} from '../../shared/styling';

const isSmallPhone = isIphone && !isIphoneXorAbove();

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
  },
  ctnBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ctnIcon: {
    flex: 1,
  },
  ctnLogoIcon: {
    width: isSmallPhone ? moderateScale(100) : moderateScale(110),
    aspectRatio: 217 / 201,
    alignSelf: 'center',
    marginTop: isSmallPhone ? moderateScale(30) : moderateScale(80),
  },
  btnWrapper: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(60) : moderateScale(40),
  },
  ctnText: {
    // marginHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isSmallPhone ? moderateScale(12) : moderateScale(26),
  },
  txtTitle: {
    marginHorizontal: moderateScale(16),
    fontFamily: fonts.YesevaOne,
    color: colors.purple,
    textAlign: 'center',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(32),
  },
  txtDesc: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(2),
    fontFamily: fonts.InterMedium,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(26),
    marginBottom: moderateScale(20),
  },
});
