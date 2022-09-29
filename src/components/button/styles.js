import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    marginHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
    height: moderateScale(48),
    backgroundColor: colors.purple,
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    color: colors.white,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterBold,
  },
});
