import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone14Pro, isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnClose: {
    flex: 1,
  },
  ctnContent: {
    width: '100%',
    backgroundColor: '#1C1C1D',
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
    marginTop: moderateScale(30),
    position: 'absolute',
    bottom: isIphoneXorAbove() ? moderateScale(isIphone14Pro ? -10 : -40) : 0,
  },
  btnStyle: {
    position: 'absolute',
    right: moderateScale(12),
    marginTop: moderateScale(16),
  },
  btnClose: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  rowCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  ctnFooter: {
    backgroundColor: colors.purple,
    paddingTop: moderateScale(10),
    paddingBottom: isIphoneXorAbove() ? moderateScale(60) : moderateScale(10),
    width: '100%',
  },
  ctnBgDark: {
    paddingBottom: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  ctnDislike: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnBgDislike: {
    backgroundColor: colors.black,
    paddingHorizontal: moderateScale(40),
    borderRadius: moderateScale(20 / 2),
    paddingVertical: moderateScale(10),
  },
  iconDislikeWrap: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtDislike: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(10),
    color: colors.white,
    textAlign: 'center',
  },
});
