import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    height: moderateScale(48),
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.blue,
    borderWidth: moderateScale(1),
  },
  txtButton: {
    color: '#000',
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
  },
});
