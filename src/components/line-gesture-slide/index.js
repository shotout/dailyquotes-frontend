import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const LineGestureSlide = ({dragHandler = {}}) => (
  <View style={[styles.containerArrow, styles.topRadius]} {...dragHandler}>
    <View style={styles.lineKnock} />
  </View>
);

export default LineGestureSlide;
