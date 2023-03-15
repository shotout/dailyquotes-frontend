import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnContent: {
    width: '70%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  btnStyle: {
    position: 'absolute',
    left: moderateScale(8),
    marginTop: moderateScale(12),
  },
  btnClose: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
  },
  titleWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCollection: {
    width: moderateScale(30),
    height: moderateScale(35),
    resizeMode: 'contain',
    marginTop: moderateScale(20),
  },
  ctnTitle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(16),
    color: colors.black,
    paddingVertical: moderateScale(5),
  },
  btnYes: {
    marginHorizontal: moderateScale(0),
    marginVertical: moderateScale(0),
  },
  inputWrapper: {
    position: 'relative',
  },
  ctnRootInput: {
    marginHorizontal: moderateScale(0),
    marginVertical: moderateScale(10),
  },
});
