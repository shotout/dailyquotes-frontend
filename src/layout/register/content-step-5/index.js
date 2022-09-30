import React from 'react';
import {Text, View} from 'react-native';
import FeelingCard from '../../../components/feeling-card';
import styles from './styles';

const feelingAwesome = require('../../../assets/icons/recent_feeling/awesome.png');
const feelingGood = require('../../../assets/icons/recent_feeling/good.png');
const feelingOk = require('../../../assets/icons/recent_feeling/ok.png');
const feelingBad = require('../../../assets/icons/recent_feeling/bad.png');
const feelingTerrible = require('../../../assets/icons/recent_feeling/terrible.png');
const feelingOther = require('../../../assets/icons/recent_feeling/other.png');

export default function ContentStep5() {
  const listFeeling = [
    {name: 'Awesome', icon: feelingAwesome},
    {name: 'Good', icon: feelingGood},
    {name: 'Ok', icon: feelingOk},
    {name: 'Bad', icon: feelingBad},
    {name: 'Terrible', icon: feelingTerrible},
    {name: 'Other', icon: feelingOther},
  ];

  function renderSelect() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          Hey
          <Text style={styles.txtBold}>{` John! `}</Text>
          {'\n'}
          How are you feeling recently?
        </Text>
        <FeelingCard listData={listFeeling} />
        <Text style={styles.txtFeelingdesc}>
          Tell us about your mood to get individual quotes that are most
          suitable for you.
        </Text>
      </View>
    );
  }

  return <View style={styles.ctnRoot}>{renderSelect()}</View>;
}
