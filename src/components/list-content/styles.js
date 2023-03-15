import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  listWrap: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: moderateScale(10),
  },
  iconWrap: {
    width: moderateScale(22),
    height: moderateScale(22),
    resizeMode: 'contain',

    marginRight: moderateScale(10),
  },
  txtWrap: {},
  ctnTxt: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(18),
    color: colors.black,
  },
  noIcon: {
    position: 'relative',
  },
});
