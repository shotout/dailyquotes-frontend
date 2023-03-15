import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  listWrap: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingVertical: moderateScale(14),
    borderColor: colors.tosca,
    borderWidth: moderateScale(1),
    marginBottom: moderateScale(20),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  iconWrap: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    marginRight: moderateScale(16),
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
