import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  modalRoot: {
    flex: 1,
  },
  ctnModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnContent: {
    width: '80%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: moderateScale(20),
    paddingBottom: moderateScale(20),
    alignItems: 'center',
    overflow: 'hidden',
  },
  imgFreePremium: {
    width: moderateScale(182),
    height: moderateScale(167),
    marginRight: moderateScale(20),
  },
  ctnText: {
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(20),
  },
  txtTitle: {
    textAlign: 'center',
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(16),
    color: colors.black,
    lineHeight: moderateScale(24),
  },
  txtDesc: {
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    fontSize: moderateScale(14),
    color: colors.black,
    marginTop: moderateScale(8),
    lineHeight: moderateScale(22),
  },
  btnStyle: {
    marginHorizontal: 0,
    marginBottom: 0,
  },
  btnCloseStyle: {
    position: 'absolute',
    left: moderateScale(-12),
    marginTop: moderateScale(16),
  },

  btnClose: {
    height: moderateScale(20),
    resizeMode: 'contain',
  },
});
