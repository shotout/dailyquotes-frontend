import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnBanner: {
    position: 'relative',
    paddingTop: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBanner: {
    width: moderateScale(217),
    height: moderateScale(201),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  inputWrapper: {
    marginBottom: moderateScale(20),
    marginTop: moderateScale(16),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(24),
  },
  ctnRowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(12),
  },
  btnStyle: {
    width: '48%',
    marginHorizontal: 0,
    marginTop: moderateScale(0),
    marginBottom: moderateScale(12),
  },
});
