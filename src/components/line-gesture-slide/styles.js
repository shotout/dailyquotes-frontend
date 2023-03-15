import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors, fonts} from '../../shared/styling';

export default StyleSheet.create({
  topRadius: {
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
  },
  containerArrow: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // backgroundColor: '#fff',
    bottom: -1,
    // backgroundColor: 'red',
  },
  lineKnock: {
    width: moderateScale(40),
    height: moderateScale(6),
    marginTop: moderateScale(16),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(30),
    // backgroundColor: '#ccc',
  },
});
