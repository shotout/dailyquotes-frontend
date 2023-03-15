import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  keyboadrRoot: {
    flex: 1,
  },
  ctnScroll: {
    flexGrow: 1,
    paddingBottom: moderateScale(80),
  },
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mainWrapper: {
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
    width: moderateScale(45),
    height: moderateScale(45),
    resizeMode: 'contain',
    marginTop: moderateScale(20),
    marginBottom: moderateScale(12),
  },
  ctnTitle: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(16),
    color: colors.black,
    paddingVertical: moderateScale(5),
  },
  ctnKet: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    textAlign: 'center',
  },
  btnAdd: {
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
