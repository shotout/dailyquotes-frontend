import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

const bannerImage = require('../../../assets/images/widget_app.png');

export default function ContentStepWidget(props) {
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
        <Text style={styles.txtInput}>Add a widget to your home screen</Text>
        <Text style={styles.txtInput}>
          From the Home Screen, touch and hold an empty area until the apps
          jiggle.
        </Text>
        <Text style={styles.txtInput}>
          Then tap the + button in the upper corner to add the widget.
        </Text>
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
