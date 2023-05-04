import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
  },
  ctnInput: {
    flexDirection: 'row',
    height: moderateScale(44),
    backgroundColor: '#EFEFEF',
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(12),
    alignItems: 'center',
  },
  txtInput: {
    paddingHorizontal: moderateScale(12),
    fontFamily: fonts.InterSemiBold,
    color: '#000',
    flex: 1,
    height: moderateScale(44),
  },
  ctnAction: {
    width: moderateScale(20),
    height: moderateScale(20),
    // backgroundColor: 'red',
    marginRight: moderateScale(12),
  },
  ctnDescription: {
    paddingHorizontal: moderateScale(12),
    marginTop: moderateScale(20),
  },
  txtDescription: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    lineHeight: moderateScale(20),
  },
  ctnDescDetail: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  txtTitleDesc: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(18),
    color: '#000',
    marginBottom: moderateScale(20),
  },
  ctnSelectFrequency: {
    backgroundColor: '#E2F9FA',
    marginHorizontal: moderateScale(12),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(12),
    paddingBottom: moderateScale(20),
  },
  ctnIconItem: {
    height: moderateScale(20),
    width: moderateScale(20),
    resizeMode: 'contain',
    backgroundColor: '#fff',
    borderRadius: moderateScale(20 / 2),
    padding: moderateScale(4),
  },
  ctnOption: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(20),
  },
  ctnBtnBorder: {
    paddingBottom: moderateScale(20),
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  leftOption: {
    flex: 1,
    paddingRight: moderateScale(12),
    justifyContent: 'center',
  },
  txtTitOption: {
    color: colors.black,
    fontSize: moderateScale(14),
    fontFamily: fonts.InterMedium,
  },
  txtDescOption: {
    color: '#43538A',
    fontSize: moderateScale(14),
    fontFamily: fonts.InterMedium,
    marginTop: moderateScale(6),
  },
});
