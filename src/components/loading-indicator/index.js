import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../shared/styling';
import styles from './styles';

const LoadingIndicator = ({
  size = 'large',
  color = colors.blue,
  fullscreen,
  stylesRoot,
}) => (
  <View
    style={[
      {paddingVertical: moderateScale(20)},
      stylesRoot,
      fullscreen ? styles.fullscreen : {},
    ]}>
    <ActivityIndicator animating size={size} color={color} />
  </View>
);

export default LoadingIndicator;
