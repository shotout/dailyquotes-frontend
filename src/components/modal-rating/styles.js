import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  itemWrapper: {
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
    paddingTop: moderateScale(28),
    borderRadius: moderateScale(20),
  },
  txtTitle: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(20),
  },
  txtDesc: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.InterRegular,
    fontSize: moderateScale(14),
    marginTop: moderateScale(6),
    lineHeight: moderateScale(20),
  },
  ctnBtnSubmit: {
    paddingTop: moderateScale(30),
    marginTop: moderateScale(30),
    paddingBottom: moderateScale(10),
    borderTopWidth: 1,
    borderTopColor: '#B7B7C5',
    width: '100%',
  },
  txtSubmit: {
    textAlign: 'center',
    fontSize: moderateScale(20),
    color: colors.red,
    fontFamily: fonts.MontserratSemiBold,
  },
  ratingStyle: {
    marginTop: moderateScale(20),
  },
  ratingImageStyle: {
    width: moderateScale(30),
    height: moderateScale(30),
    resizeMode: 'contain',
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(6),
  },
  ctnIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnClose: {
    position: 'absolute',
    top: moderateScale(24),
    right: moderateScale(20),
  },
  btnStyle: {
    position: 'absolute',
    left: moderateScale(8),
    top: moderateScale(20),
  },
  btnClose: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  ctnBanner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: moderateScale(12),
  },
  bannerStyle: {
    width: moderateScale(220),
    height: moderateScale(120),
    resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  btnSubmitStyle: {
    width: '100%',
    marginBottom: 0,
  },
});
