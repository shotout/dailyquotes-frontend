import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    flexWrap: 'wrap',
  },
  ctnFeeling: {
    backgroundColor: colors.lightBlue,
    width: '48%',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(12),
  },
  ctnChecklist: {
    backgroundColor: colors.white,
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(28 / 2),
    padding: moderateScale(6),
  },
  iconChecklist: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ctnItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: moderateScale(12),
  },
  iconStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    resizeMode: 'contain',
  },
  txtTitle: {
    textAlign: 'center',
    color: colors.black,
    fontFamily: fonts.InterRegular,
    marginTop: moderateScale(8),
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
