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
  ctnWrap: {
    flex: 1,
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    position: 'relative',
    paddingBottom: moderateScale(12),
  },
  ctnRowMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconSort: {
    width: moderateScale(25),
    height: moderateScale(25),
    resizeMode: 'contain',
    marginLeft: moderateScale(10),
  },
  searchStyle: {
    flex: 1,
  },
  cardWrap: {
    paddingTop: moderateScale(15),
  },
  flexOne: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(40),
  },
  imgStyle: {
    width: moderateScale(230),
    height: moderateScale(230),
    resizeMode: 'contain',
  },
  ctnText: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.black,
    textAlign: 'center',
    lineHeight: moderateScale(30),
  },
  ctnSortWrap: {
    position: 'absolute',
    top: moderateScale(100),
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

    elevation: 5,
    zIndex: 999,
  },
  ctnRowSort: {
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
  ctnScroll: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(60) : moderateScale(40),
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
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ctnDislike: {
    flex: 1,
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
  loading: {
    paddingVertical: moderateScale(20),
  },
});
