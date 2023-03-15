import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import ButtonOutline from '../../../components/button-outline';
import styles from './styles';

const brainBanner = require('../../../assets/images/commitment.png');

const listData = [
  {name: '1 year', value: '12'},
  {name: '6 months', value: '6'},
  {name: '3 months', value: '3'},
];

export default function ChooseCommitment({commit_goal, onPress}) {
  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={brainBanner} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          {`How long would you like\nto work on your goal(s)?`}
        </Text>

        <View style={styles.ctnGoalsInput}>
          {listData.map(item => (
            <ButtonOutline
              // btnStyle={styles.btnStyle}
              isSelected={item.value === commit_goal}
              onPress={() => {
                onPress(item.value);
              }}
              theme="blue"
              label={item.name}
              key={item.name}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      {renderBanner()}
      {renderInput()}
    </View>
  );
}
