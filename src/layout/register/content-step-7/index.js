import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import _ from 'lodash';
import ButtonOutline from '../../../components/button-outline';
import styles from './styles';

const bannerImage = require('../../../assets/images/category_app.png');
const goalsBanner = require('../../../assets/images/goals_banner.png');

export default function ContentStep7({
  onSelect = () => {},
  setOffToggleCategories = () => {},
  toggleRandomCategories,
  listData,
  substep,
  onPressGoals,
  specific_goal,
  initialCategory,
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    onSelect(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (toggleRandomCategories) {
      // const valueRandom = _.sampleSize(
      //   listImprovement,
      //   Math.random() * listImprovement.length,
      // );
      setSelectedCategory(listData.map(item => item.id));
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
        <Image
          source={substep === 'a' ? goalsBanner : bannerImage}
          style={styles.iconBanner}
        />
      </View>
    );
  }

  function renderInput() {
    if (substep === 'a') {
      return (
        <View style={[styles.inputWrapper, styles.ctnInputWrapper]}>
          <View style={styles.ctnText}>
            <Text style={styles.txtInput}>
              {`Do you have specific goals\nthat you want to achieve\nin your life?`}
            </Text>
            <Text style={styles.txtDesc}>
              {
                'Over time our users get more mindful and\nfocused on achieving their goals.'
              }
            </Text>
          </View>
          <View style={styles.ctnGoalsInput}>
            {['Yes', 'No'].map(item => (
              <ButtonOutline
                // btnStyle={styles.btnStyle}
                isSelected={item === specific_goal}
                onPress={() => {
                  onPressGoals(item);
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
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>
          {'Which aspects of life would\nyou like to improve with\nMooti?'}
        </Text>
        <View style={styles.ctnRowInput}>
          {listData.map(item => (
            <ButtonOutline
              btnStyle={styles.btnStyle}
              isSelected={isDataSelected(item.id)}
              onPress={() => {
                onPressSelect(item.id);
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
