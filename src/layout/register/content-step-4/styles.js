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
    marginTop: moderateScale(30),
  },
  txtInput: {
    marginHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
    fontFamily: fonts.InterSemiBold,
    color: colors.black,
    textAlign: 'center',
    fontSize: moderateScale(16),
  },
  ctnRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: moderateScale(20),
  },
  iconWrapper: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(4),
    aspectRatio: 1 / 1,
    borderRadius: moderateScale(12),
    borderColor: 'transparent',
    borderWidth: moderateScale(1),
  },
  activeIcon: {
    borderColor: colors.blue,
    borderWidth: moderateScale(1),
  },
  ctnIconApp: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
  },
  ctnIconStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bgBlack: {
    backgroundColor: colors.black,
  },
});
