import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(30),
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
  },
  categoryImg: {
    width: moderateScale(120),
    height: moderateScale(120),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  ctnText: {},
  txtTitle: {
    color: colors.black,
    fontSize: moderateScale(18),
    fontFamily: fonts.InterBold,
    textAlign: 'center',
    lineHeight: moderateScale(26),
  },
  txtDesc: {
    color: colors.black,
    fontSize: moderateScale(14),
    fontFamily: fonts.InterMedium,
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginTop: 12,
  },
  ctnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(12),
  },
  btnIcon: {
    flexDirection: 'row',
    marginHorizontal: 0,
    flex: 1,
    marginBottom: 12,
  },
  mgRight: {
    marginRight: moderateScale(16),
  },
  btnImgStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(6),
  },
  txtBtnStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12),
  },
  icnPlay: {
    width: moderateScale(18),
    height: moderateScale(18),
  },
  btnClose: {
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  btnStyle: {
    position: 'absolute',
    right: 0,
    top: moderateScale(20),
  },
  ctnFree: {
    backgroundColor: '#ED5267',
    height: moderateScale(20),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(20 / 2),
    position: 'absolute',
    top: moderateScale(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFree: {
    color: colors.white,
    fontSize: moderateScale(12),
    fontFamily: fonts.InterMedium,
  },
  ctnWatch: {
    flex: 1,
  },
});
