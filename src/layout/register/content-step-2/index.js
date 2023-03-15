import React from 'react';
import {Image, Text, View} from 'react-native';
import ButtonOutline from '../../../components/button-outline';
import styles from './styles';

const bannerImage = require('../../../assets/images/gender_app.png');

export default function ContentStep2({selectedGender, handleSelect, name}) {
  const listGender = ['Male', 'Female', 'Others'];

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
        <Text style={styles.txtInput}>
          {`What gender do you\ncurrently identify with?`}
        </Text>
        {listGender.map(gender => (
          <ButtonOutline
            isSelected={selectedGender === gender}
            onPress={() => {
              handleSelect('gender', gender);
            }}
            label={gender}
            key={gender}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnWelcome}>
        <Text style={styles.txtWelcome}>{`${
          name ? `Hey ${name}` : 'Hey'
        }, we would like\nto personalize your content!`}</Text>
      </View>
      {renderBanner()}
      {renderInput()}
    </View>
  );
}
