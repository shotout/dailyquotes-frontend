import React from 'react';
import {Text, View} from 'react-native';
import FeelingCard from '../../../components/feeling-card';
import styles from './styles';

export default function ContentStep6(props) {
  function renderSelect() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          {'What is making you feel\nthat way?'}
        </Text>
        <Text style={styles.txtFeelingdesc}>
          You can select more than one option.
        </Text>
        <FeelingCard isMultiple {...props} />
      </View>
    );
  }

  return <View style={styles.ctnRoot}>{renderSelect()}</View>;
}
