/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  mainWrapper: {
    position: 'relative',
  },
  ctnInput: {
    height: moderateScale(48),
    backgroundColor: colors.lightBlue,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  ctnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: moderateScale(48),
  },
  inputStyle: {
    flex: 1,
    fontFamily: fonts.InterRegular,
    color: colors.blue,
    fontSize: moderateScale(14),
  },
  searchIcon: {
    width: moderateScale(20),
    resizeMode: 'contain',
    padding: moderateScale(10),
  },
});
