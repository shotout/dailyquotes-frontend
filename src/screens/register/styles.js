import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  ctnBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ctnIcon: {
    flex: 1,
  },
  ctnLogoIcon: {
    width: moderateScale(217),
    height: moderateScale(201),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: '30%',
  },
  btnSkip: {
    marginHorizontal: moderateScale(20),
    height: moderateScale(44),
    // backgroundColor: 'red',
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  txtSkip: {
    color: colors.black,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterBold,
  },
  btnContinue: {
    marginTop: 0,
  },
  ctnScroll: {
    flexGrow: 1,
  },
  txtSubscription: {
    color: colors.black,
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontFamily: fonts.InterRegular,
    marginBottom: moderateScale(16),
  },
});
