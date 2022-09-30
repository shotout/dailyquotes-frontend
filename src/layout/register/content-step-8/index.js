import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const bannerImage = require('../../../assets/images/subscription_app.png');
const iconChecklist = require('../../../assets/icons/checklist.png');

export default function ContentStep8() {
  const listItem = [
    'Enjoy your first 3 days for free',
    'Cancel from the app or your iCloud account',
    'Quotes you can’t find anywhere else',
    'Categories for any situation',
    '3 days Free Trial',
    'Only USD 2/month, billed annually',
  ];

  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
    );
  }

  function renderInputOften() {
    return listItem.map(item => (
      <View style={styles.ctnInput} key={item}>
        <View style={[styles.ctnSeparator, styles.ctnRadius]}>
          <Image style={styles.iconStyle} source={iconChecklist} />
        </View>
        <Text style={styles.txtItem}>{item}</Text>
        <View style={styles.ctnSeparator} />
      </View>
    ));
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          Enjoy full freedom with a subscription
        </Text>
        {renderInputOften()}
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
