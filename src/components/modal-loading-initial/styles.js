import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: '20%',
  },
  lottieWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(260),
    // backgroundColor: 'red',
  },
  txtLoader: {
    fontSize: moderateScale(16),
    color: colors.dark,
    fontFamily: fonts.YesevaOne,
    textAlign: 'center',
  },
  txtPercentage: {
    color: '#BFB9D7',
    fontFamily: fonts.YesevaOne,
    fontSize: moderateScale(110),
    right: moderateScale(-16),
  },
  percent: {
    fontSize: moderateScale(60),
    color: '#BFB9D7',
    fontFamily: fonts.YesevaOne,
    bottom: moderateScale(14),
    marginLeft: moderateScale(8),
  },
  lottieStyle: {},
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    // backgroundColor: 'blue',
  },
  ctnTextLoader: {
    width: '100%',
    top: moderateScale(28),
    minHeight: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerStyle: {
    width: '100%',
    height: moderateScale(230),
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
  },
});
