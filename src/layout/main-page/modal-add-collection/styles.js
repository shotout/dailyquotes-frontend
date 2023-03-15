import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphone14Pro, isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingBottom: isIphoneXorAbove() ? moderateScale(0) : moderateScale(20),
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
    paddingBottom: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginTop: isIphoneXorAbove() ? moderateScale(40) : moderateScale(25),
  },
  ctnButtton: {
    paddingBottom: isIphoneXorAbove()
      ? moderateScale(isIphone14Pro ? 20 : 0)
      : moderateScale(10),
  },
  ctnWrapper: {
    position: 'relative',
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(30),
    flex: 1,
  },
  ctnTxtDone: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(16),
    color: colors.black,
  },
  ctnIcon: {
    width: moderateScale(17),
    height: moderateScale(17),
    resizeMode: 'contain',
  },
  rowWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtBtnAdd: {
    fontSize: moderateScale(16),
    fontFamily: fonts.InterMedium,
    color: colors.tosca,
  },
  rowContentWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    borderBottomColor: colors.gray,
    borderBottomWidth: moderateScale(0.7),
  },
  rightWrap: {
    position: 'relative',
    flex: 1,
    paddingRight: moderateScale(20),
  },
  ctnTitle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(16),
    color: colors.black,
  },
  stnsubTittle: {
    fontFamily: fonts.InterRegular,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  ctnEmpty: {
    paddingHorizontal: 0,
  },
});
