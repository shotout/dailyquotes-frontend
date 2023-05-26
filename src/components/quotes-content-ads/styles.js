/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { isIphoneXorAbove } from '../../shared/devices';
import { colors, fonts, sizing } from '../../shared/styling';

export default StyleSheet.create({
  ctnBackgroundImage: {
    resizeMode: 'cover',
    width: sizing.getWindowWidth(1),
    height: sizing.getDimensionHeight(1),
  },
  quotesWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  ctnSwipe:{
    position: 'absolute',
    bottom: moderateScale(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtSwipe:{
    color: '#838383',
    fontSize: moderateScale(14),
    fontFamily: fonts.InterMedium,
    textAlign: 'center'
  },
  icnSwipe:{
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    marginTop: moderateScale(8)
  },
  ctnAds:{
    width: 303,
    height: 253,
    backgroundColor: '#fff',shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
    margin: 10,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
