import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';

const bannerImage = require('../../../assets/images/change_icon_app.png');
const bannerIcon1 = require('../../../assets/icons/app_icon_1.png');
const bannerIcon2 = require('../../../assets/icons/app_icon_2.png');
const bannerIcon3 = require('../../../assets/icons/app_icon_3.png');

export default function ContentStep4({onSelect}) {
  const [selectedIcon, setSelectedIcon] = useState('first');

  useEffect(() => {
    const getInitialIcon = async () => {
      const isSetBefore = await AsyncStorage.getItem('customIcon');
      if (isSetBefore) {
        setSelectedIcon(isSetBefore);
      }
    };
    getInitialIcon();
  }, []);

  const listIcon = [
    {
      name: 'first',
      icon: bannerIcon1,
    },
    {
      name: 'second',
      icon: bannerIcon2,
    },
    {
      name: 'third',
      icon: bannerIcon1,
    },
    {
      name: 'fourth',
      icon: bannerIcon3,
    },
  ];

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
          Which App Icon would you like to use?
        </Text>
        <View style={styles.ctnRowIcon}>
          {listIcon.map((icon, index) => (
            <TouchableWithoutFeedback
              key={icon.name}
              onPress={() => {
                if (icon.name !== selectedIcon) {
                  setSelectedIcon(icon.name);
                  onSelect(index + 1);
                }
              }}>
              <View
                style={[
                  styles.iconWrapper,
                  selectedIcon === icon.name && styles.activeIcon,
                ]}>
                <View
                  style={[
                    styles.ctnIconApp,
                    (index === 2 || index === 3) && styles.bgBlack,
                  ]}>
                  <Image source={icon.icon} style={styles.ctnIconStyle} />
                </View>
              </View>
            </TouchableWithoutFeedback>
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
