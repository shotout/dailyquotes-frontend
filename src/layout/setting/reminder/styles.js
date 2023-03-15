import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ctnContent: {
    flex: 1,
    width: '100%',
    // height: '100%',
    backgroundColor: colors.white,
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
    marginTop: isIphoneXorAbove() ? moderateScale(0) : moderateScale(30),

    paddingBottom: isIphoneXorAbove() ? moderateScale(20) : moderateScale(20),
    bottom: isIphoneXorAbove() ? moderateScale(-36) : undefined,
  },
  ctnInput: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    height: moderateScale(48),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(18),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20),
  },
  leftInput: {
    flex: 1,
  },
  txtLeftInput: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  rightInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctnValue: {
    width: moderateScale(94),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtValue: {
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    fontSize: moderateScale(14),
  },
  ctnSelect: {
    width: moderateScale(26),
    height: moderateScale(26),
    borderRadius: moderateScale(26 / 2),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDecrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.red,
    fontSize: moderateScale(18),
  },
  txtIncrease: {
    fontFamily: fonts.InterSemiBold,
    color: colors.blue,
    fontSize: moderateScale(18),
    marginTop: moderateScale(-3),
  },
  ctnFlex: {
    flex: 1,
    justifyContent: 'center',
  },
  titleNoteReminder: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(18),
    color: colors.black,
    paddingHorizontal: moderateScale(20),
    textAlign: 'left',
    lineHeight: moderateScale(24),
  },
  ctnBanner: {
    position: 'relative',
    paddingBottom: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(177),
    height: moderateScale(161),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
