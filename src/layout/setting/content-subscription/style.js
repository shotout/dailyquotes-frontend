import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: isIphoneXorAbove() ? moderateScale(0) : moderateScale(30),
    bottom: isIphoneXorAbove() ? moderateScale(-34) : 0,
  },
  ctnContent: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: isIphoneXorAbove() ? moderateScale(20) : undefined,
  },
  wrapper: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
  },
  cttnNote: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  titleListContent: {
    fontFamily: fonts.InterBold,
    fontSize: moderateScale(16),
  },
  listContentWrap: {
    paddingVertical: moderateScale(15),
  },
  relativeWrap: {
    position: 'relative',
  },
  rowWrap: {
    flexDirection: 'row',
    paddingVertical: moderateScale(5),
  },
  rowLeft: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueBold: {
    fontFamily: fonts.InterSemiBold,
    fontSize: moderateScale(14),
    color: colors.black,
  },
  iconWrap: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
    marginRight: moderateScale(10),
  },
  ctnSeparator: {
    borderBottomColor: colors.gray,
    borderBottomWidth: moderateScale(1),
    marginVertical: moderateScale(25),
  },
  lineSeparator: {
    position: 'absolute',
    top: 21.5,
    bottom: 0,
    left: 7,
    right: 0,
    backgroundColor: colors.lightBlue,
    width: moderateScale(2),
    height: moderateScale(13),
  },
});
