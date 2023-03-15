/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

export default function TutorialStep({currentStep}) {
  function renderStepNext() {
    switch (currentStep) {
      case 2:
        return '2 of 3';
      case 3:
        return '3 of 3';
      case 4:
        return '3 of 3';
      default:
        return '1 of 3';
    }
  }

  return (
    <View style={styles.stepWrapper}>
      <View style={styles.bgTextTop}>
        <Text style={styles.textStep}>Step {renderStepNext()}</Text>
      </View>
    </View>
  );
}
