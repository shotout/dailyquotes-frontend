import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  mainModalStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  ctnRoot: {
    flex: 1,
  },
  rowHeaderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(12),
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
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
    paddingVertical: moderateScale(20),
    paddingTop: 0,
    borderRadius: moderateScale(20),
  },
  ctnClose: {
    paddingTop: isIphoneXorAbove() ? moderateScale(78) : moderateScale(60),
  },
  txtHeaderBtn: {
    fontSize: moderateScale(14),
    color: colors.tosca,
  },
  btnClose: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  btnStyle: {
    // position: 'absolute',
    // right: moderateScale(20),
    // marginTop: moderateScale(40),
  },
  ctnScroll: {
    paddingBottom: isIphoneXorAbove() ? moderateScale(80) : moderateScale(60),
    flexGrow: 1,
  },
  ctnBanner: {
    paddingBottom: isIphoneXorAbove() ? 80 : 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: moderateScale(10),
  },
});
