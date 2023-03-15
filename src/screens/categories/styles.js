/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts, sizing} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  ctnScroll: {
    flexGrow: 1,
    minHeight: sizing.getDimensionHeight(0.9),
  },
  rowHeaderText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldHeader: {
    color: colors.black,
    fontSize: moderateScale(20),
    fontFamily: fonts.InterBold,
  },
});
