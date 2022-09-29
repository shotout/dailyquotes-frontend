import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

const step1 = require('../../../assets/icons/welcome_step/1.png');
const step2 = require('../../../assets/icons/welcome_step/2.png');
const step3 = require('../../../assets/icons/welcome_step/3.png');
const step4 = require('../../../assets/icons/welcome_step/4.png');
const step5 = require('../../../assets/icons/welcome_step/5.png');
const step6 = require('../../../assets/icons/welcome_step/6.png');
const step7 = require('../../../assets/icons/welcome_step/7.png');
const step8 = require('../../../assets/icons/welcome_step/8.png');

export default function HeaderStep({currentStep}) {
  function renderImageStep() {
    switch (currentStep) {
      case 2:
        return step2;
      case 3:
        return step3;
      case 4:
        return step4;
      case 5:
        return step5;
      case 6:
        return step6;
      case 7:
        return step7;
      case 8:
        return step8;
      default:
        return step1;
    }
  }

  return (
    <View style={styles.ctnRoot}>
      <Image source={renderImageStep()} style={styles.imgStep} />
    </View>
  );
}
