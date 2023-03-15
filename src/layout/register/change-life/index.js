import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import Lottie from 'lottie-react-native';
import ButtonOutline from '../../../components/button-outline';
import styles from './styles';

const bannerLottie = require('../../../assets/lottie/morph.gif');

export default function ChangeLife({important_change, onPress}) {
  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerLottie} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <View style={styles.ctnText}>
          <Text style={styles.txtInput}>
            {`Were there recently any\nimportant changes\nin your life?`}
          </Text>

          {renderBanner()}
          <Text style={styles.txtDesc}>
            We are personalizing your experience in Mooti.
          </Text>
        </View>
        <View style={styles.ctnGoalsInput}>
          {['Yes', 'No'].map(item => (
            <ButtonOutline
              // btnStyle={styles.btnStyle}
              isSelected={item === important_change}
              onPress={() => {
                onPress(item);
              }}
              theme="blue"
              label={item}
              key={item}
            />
          ))}
        </View>
      </View>
    );
  }

  return <View style={styles.ctnRoot}>{renderInput()}</View>;
}
