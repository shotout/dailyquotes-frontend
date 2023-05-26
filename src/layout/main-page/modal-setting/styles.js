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
    // marginTop: isIphoneXorAbove() ? moderateScale(40) : moderateScale(20),
  },
  btnStyle: {
    position: 'absolute',
    right: moderateScale(20),
    marginTop: moderateScale(30),
  },
  btnClose: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
  },
  wrapper: {
    position: 'relative',
  },
  titleWrap: {
    paddingBottom: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  ctnTittle: {
    fontFamily: fonts.InterExtraBold,
    fontSize: moderateScale(20),
    color: colors.black,
  },
  listCardWrap: {
    paddingHorizontal: moderateScale(20),
  },
  ctnBgWrap: {
    backgroundColor: colors.tosca,
    padding: moderateScale(20),
    borderRadius: moderateScale(20 / 2),
    marginBottom: moderateScale(16),
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctnIcon: {
    width: moderateScale(60),
    height: moderateScale(60),
    resizeMode: 'contain',
  },
  ctnRowLeft: {
    flex: 1,
  },
  titleStyle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.white,
    paddingBottom: moderateScale(10),
  },
  subTitleStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.white,
  },
  separator: {
    borderTopColor: colors.gray,
    borderTopWidth: moderateScale(1),
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(15),
  },
  ctnScroll: {
    flexGrow: 1,
    paddingBottom: isIphoneXorAbove() ? moderateScale(140) : moderateScale(100),
  },
  styleList: {
    paddingVertical: moderateScale(5),
  },
  ctnFooter: {
    paddingVertical: moderateScale(20),
  },
  ctnClose: {
    paddingTop: isIphoneXorAbove() ? moderateScale(93) : moderateScale(60),
  },
  mg20: {
    marginTop: moderateScale(20),
  },
  ctnBanner: {
    paddingBottom: isIphoneXorAbove() ? 158 : 116,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: moderateScale(10),
  },
  ctnScrollFreeUser: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(210) : moderateScale(170),
  },
});
