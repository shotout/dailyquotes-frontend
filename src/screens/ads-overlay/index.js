import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import states from './states';

function AdsOverlay() {
  return <View style={[styles.ctnRoot, styles.absoluteContent]} />;
}

export default connect(states)(AdsOverlay);
