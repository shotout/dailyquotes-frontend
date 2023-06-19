import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnWrap: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  titleWrap: {
    position: 'relative',
    paddingLeft: moderateScale(10),
    flex: 1,
  },
  ctnTitle: {
    fontFamily: fonts.InterExtraBold,
    fontSize: moderateScale(20),
    color: colors.black,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconRight: {
    width: moderateScale(18),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
  rightText: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.tosca,
  },
});
