import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

export default StyleSheet.create({
  ctnRoot: {
    flex: 1,
    position: 'relative',
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
});
