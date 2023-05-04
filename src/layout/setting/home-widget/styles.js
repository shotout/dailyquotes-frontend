import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {isIphoneXorAbove} from '../../../shared/devices';
import {colors, fonts, sizing} from '../../../shared/styling';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  ctnContent: {
    flex: 1,
    width: '100%',
    // height: '100%',
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
    marginTop: isIphoneXorAbove() ? moderateScale(0) : moderateScale(30),

    paddingBottom: isIphoneXorAbove() ? moderateScale(20) : moderateScale(20),
    bottom: isIphoneXorAbove() ? moderateScale(-36) : undefined,
  },
  ctnDesc: {
    paddingHorizontal: moderateScale(20),
  },
  txtContent: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: '#000',
  },
  txtDesc: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: '#000',
  },
  ctnListWidget: {
    backgroundColor: '#E2F9FA',
    marginHorizontal: moderateScale(20),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(20),
    paddingVertical: moderateScale(20),
  },
  ctnWidgetText: {
    flex: 1,
    paddingRight: moderateScale(20),
  },
  ctnImg: {
    width: moderateScale(90),
    height: moderateScale(90),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  imgTheme: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTheme: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(14),
    color: '#000',
  },
  txtPlaceholder: {
    fontFamily: fonts.InterMedium,
    fontSize: moderateScale(12),
    color: '#000',
    textAlign: 'center',
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
  txtTutorial: {
    textAlign: 'center',
  },
  ctnStep: {
    backgroundColor: '#000',
    alignSelf: 'center',
    width: moderateScale(70),
    height: moderateScale(28),
    borderRadius: moderateScale(28 / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStep: {
    color: '#fff',
    fontFamily: fonts.InterExtraBold,
    textAlign: 'center',
  },
  ctWidgetTitle: {
    width: sizing.getDimensionWidth(1),
  },
  txtWidgetStep: {
    fontFamily: fonts.InterRegular,
    color: '#000',
    textAlign: 'center',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(22),
  },
  ctnTextStep: {
    marginTop: moderateScale(12),
    paddingHorizontal: moderateScale(12),
  },
  bannerImage: {
    width: moderateScale(400),
    resizeMode: 'contain',
    height: moderateScale(380),
  },
  ctnBanner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  dotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctnDot: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(16 / 2),
    backgroundColor: '#DFDFDF',
    marginHorizontal: moderateScale(3),
    marginTop: moderateScale(-80),
  },
  blackDot: {
    backgroundColor: '#000',
  },
  ctnWrapper: {
    flex: 1,
  },
  pdTopCtn: {
    paddingTop: moderateScale(20),
    borderTopWidth: 1,
    borderColor: '#ddd',
    // borderColor: 'red',
    paddingBottom: moderateScale(20),
  },
  hiddenWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  ctnHidden: {
    backgroundColor: colors.pink,
    height: moderateScale(140),
    width: moderateScale(68),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctnAction: {
    width: moderateScale(26),
    height: moderateScale(26),
  },
  bgBlue: {
    backgroundColor: colors.darkBlue,
  },
  themeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(140),
    backgroundColor: '#E2F9FA',
    paddingHorizontal: moderateScale(20),
    overflow: 'hidden',
  },
});
