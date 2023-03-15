import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    backgroundColor: '#E2F9FA',
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(20),
    padding: moderateScale(20),
  },
  ctnTitle: {
    paddingBottom: moderateScale(16),
    borderColor: '#ccc',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  txtTitle: {
    fontFamily: fonts.InterRegular,
    color: '#666666',
    fontSize: moderateScale(13),
  },
  txtDisableOption: {
    fontFamily: fonts.InterRegular,
    color: '#B7B7B7',
    fontSize: moderateScale(13),
  },
  ctnFirstWidget: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
    alignSelf: 'center',
    padding: moderateScale(10),
  },
  widgetText: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12),
    color: '#000',
    textAlign: 'center',
  },
  largeTxtWidget: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(16),
    color: '#000',
    textAlign: 'center',
    margin: moderateScale(12),
  },
  ctnLargeWidget: {
    height: moderateScale(100),
    width: '100%',
    aspectRatio: 21 / 9,
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    marginTop: moderateScale(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnWidget: {
    paddingBottom: moderateScale(20),
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  ctnOption: {
    paddingTop: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctnLastOption: {
    borderBottomWidth: 0,
    paddingBottom: moderateScale(8),
  },
});
