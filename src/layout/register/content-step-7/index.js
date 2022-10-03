import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import _ from 'lodash';
import ButtonOutline from '../../../components/button-outline';
import styles from './styles';

const bannerImage = require('../../../assets/images/category_app.png');

export default function ContentStep7({
  onSelect = () => {},
  setOffToggleCategories = () => {},
  toggleRandomCategories,
}) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const listImprovement = [
    'Productivity',
    'Positive Thingking',
    'Inspiration',
    'Faith & Spirituality',
    'Relationships',
    'Working out',
    'Self-esteem',
    'Achieving goals',
  ];

  useEffect(() => {
    onSelect(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (toggleRandomCategories) {
      const valueRandom = _.sampleSize(
        listImprovement,
        Math.random() * listImprovement.length,
      );
      setSelectedCategory(valueRandom);
      setOffToggleCategories();
    }
  }, [toggleRandomCategories]);

  const isDataSelected = value => {
    const findItem = selectedCategory.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const onPressSelect = value => {
    const isSelected = isDataSelected(value);
    if (isSelected) {
      setSelectedCategory(selectedCategory.filter(item => item !== value));
    } else {
      const listItem = [...selectedCategory];
      listItem.push(value);
      setSelectedCategory(listItem);
    }
  };

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
          What areas of your life would you like to improve?
        </Text>
        <View style={styles.ctnRowInput}>
          {listImprovement.map(item => (
            <ButtonOutline
              btnStyle={styles.btnStyle}
              isSelected={isDataSelected(item)}
              onPress={() => {
                onPressSelect(item);
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

  return (
    <View style={styles.ctnRoot}>
      {renderBanner()}
      {renderInput()}
    </View>
  );
}
