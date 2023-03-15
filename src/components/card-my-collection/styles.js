import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnCard: {
    backgroundColor: colors.ligthTosca,
    borderRadius: moderateScale(20 / 2),
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: moderateScale(20),
  },
  ctnRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeft: {
    position: 'relative',
    flex: 0.9,
  },
  quoteStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    lineHeight: moderateScale(22),
  },
  ctnIcon: {
    width: moderateScale(10),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  ctnRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: moderateScale(10),
    alignItems: 'center',
  },
  wrapIcon: {
    position: 'relative',
  },
  ctnIconAction: {
    width: moderateScale(17),
    height: moderateScale(17),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  iconActionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctnDateStyle: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(13),
    color: colors.tosca,
  },
  ctnRowMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
  },
  label: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: colors.black,
    marginRight: moderateScale(10),
  },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: moderateScale(10),
  },
  ctnIconActionPopover: {
    width: moderateScale(18),
    height: moderateScale(15),
    resizeMode: 'contain',
  },
});
