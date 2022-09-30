import React from 'react';
import {Text, View} from 'react-native';
import FeelingCard from '../../../components/feeling-card';
import styles from './styles';

const familyIcon = require('../../../assets/icons/cause_feeling/family.png');
const friendIcon = require('../../../assets/icons/cause_feeling/friends.png');
const workIcon = require('../../../assets/icons/cause_feeling/work.png');
const healthIcon = require('../../../assets/icons/cause_feeling/health.png');
const relationshipIcon = require('../../../assets/icons/cause_feeling/relationship.png');
const otherIcon = require('../../../assets/icons/cause_feeling/other.png');

export default function ContentStep6() {
  const listFeeling = [
    {name: 'Family', icon: familyIcon},
    {name: 'Friends', icon: friendIcon},
    {name: 'Work', icon: workIcon},
    {name: 'Health', icon: healthIcon},
    {name: 'Relationship', icon: relationshipIcon},
    {name: 'Other', icon: otherIcon},
  ];

  function renderSelect() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>What is making you feel that way?</Text>
        <Text style={styles.txtFeelingdesc}>
          You can select more than one option
        </Text>
        <FeelingCard isMultiple listData={listFeeling} />
      </View>
    );
  }

  return <View style={styles.ctnRoot}>{renderSelect()}</View>;
}
