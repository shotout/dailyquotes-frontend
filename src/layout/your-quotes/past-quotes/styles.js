import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {
  isIphone,
  isIphone14Pro,
  isIphoneXorAbove,
} from '../../../shared/devices';
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
  ctnHeader: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(16),
  },
  wrapContent: {
    marginBottom: moderateScale(15),
    position: 'relative',
  },
  ctnMoreWrap: {
    position: 'absolute',
    top: moderateScale(35),
    right: moderateScale(30),
    width: sizing.getDimensionWidth(0.6),
    backgroundColor: colors.white,
    borderRadius: moderateScale(20 / 2),
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctnIconAction: {
    width: moderateScale(18),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  label: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    marginRight: moderateScale(10),
  },
  separator: {
    borderBottomColor: colors.gray,
    borderBottomWidth: moderateScale(1),
    marginVertical: moderateScale(10),
  },
  flexOne: {
    flex: 1,
  },
  noListWrap: {
    paddingHorizontal: moderateScale(20),
  },
  ctnLike: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnBgLike: {
    backgroundColor: colors.black,
    paddingHorizontal: moderateScale(40),
    borderRadius: moderateScale(20 / 2),
    paddingVertical: moderateScale(10),
  },
  iconLikeWrap: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  txtLike: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(10),
    color: colors.white,
    textAlign: 'center',
  },
  btnMoreStyle: {
    marginBottom: isIphoneXorAbove()
      ? moderateScale(64)
      : !isIphone
      ? moderateScale(40)
      : undefined,
    marginTop: moderateScale(12),
  },
  ctnScroll: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(24) : undefined,
  },
});
