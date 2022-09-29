import React from 'react';
import {Image, Text, View} from 'react-native';
import Input from '../../../components/input';
import styles from './styles';

const bannerImage = require('../../../assets/images/name_app.png');

export default function ContentStep1() {
  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>What sould we call you?</Text>
        <Input placeholder="Your name" />
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
