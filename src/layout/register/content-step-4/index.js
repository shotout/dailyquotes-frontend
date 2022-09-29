import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const bannerImage = require('../../../assets/images/change_icon_app.png');
const bannerIcon1 = require('../../../assets/icons/app_icon_1.png');
const bannerIcon2 = require('../../../assets/icons/app_icon_2.png');
const bannerIcon3 = require('../../../assets/icons/app_icon_3.png');

export default function ContentStep4() {
  const [selectedIcon, setSelectedIcon] = useState(1);
  const listIcon = [bannerIcon1, bannerIcon2, bannerIcon1, bannerIcon3];

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
            <TouchableOpacity
              onPress={() => {
                setSelectedIcon(index + 1);
              }}
              style={[
                styles.iconWrapper,
                selectedIcon === index + 1 && styles.activeIcon,
              ]}
              key={index.toString()}>
              <View
                style={[
                  styles.ctnIconApp,
                  (index === 2 || index === 3) && styles.bgBlack,
                ]}>
                <Image source={icon} style={styles.ctnIconStyle} />
              </View>
            </TouchableOpacity>
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
