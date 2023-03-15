import React, {Fragment} from 'react';
import {Text, View} from 'react-native';
import FeelingCard from '../../../components/feeling-card';
import styles from './styles';

export default function ContentStep5(props) {
  function renderSelect() {
    const userName = props?.userName;
    // const userName = 'Mynamei spa';
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          {userName !== ''
            ? `${userName}, how are you feeling recently?`
            : 'How are you feeling recently?'}
        </Text>
        <Text style={styles.txtFeelingdesc}>
          {`Tell us about your mood\nto personalize your experience.`}
        </Text>
        <FeelingCard {...props} />
      </View>
    );
  }

  return <View style={styles.ctnRoot}>{renderSelect()}</View>;
}
