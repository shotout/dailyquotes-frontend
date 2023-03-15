/* eslint-disable prettier/prettier */
import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

const screenWidth = Math.round(Dimensions.get('window').width) / 4 - 33;

export default StyleSheet.create({
  ctnRowSection: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
    marginVertical: 3,
  },
  ctnIcon: {
    width: moderateScale(28),
    height: moderateScale(28),
    resizeMode: 'contain',
    marginBottom: moderateScale(5),
  },
  ctnLabel: {
    color: colors.white,
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    lineHeight: moderateScale(20)
  },
  ctnBox: {
    width: screenWidth,
    alignContent: 'center',
    alignItems: 'center',
  },
});
