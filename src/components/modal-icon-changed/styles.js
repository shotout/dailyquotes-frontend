import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnContent: {
    maxWidth: moderateScale(280),
    width: '90%',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    width: '28%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(4),
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(12),
    borderColor: 'transparent',
    borderWidth: moderateScale(1),
  },
  ctnIconApp: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
  },
  ctnIconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bgBlack: {
    backgroundColor: colors.black,
  },
  txtTitle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(18),
    color: colors.black,
    marginTop: moderateScale(12),
    textAlign: 'center',
  },
  txtDesc: {
    fontFamily: fonts.InterRegular,
    fontSize: moderateScale(14),
    color: colors.black,
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginTop: moderateScale(4),
  },
  btnStyle: {
    marginBottom: 0,
    width: '100%',
  },
});
