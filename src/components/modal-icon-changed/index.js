import React from 'react';
import {Modal, Text, View, Image} from 'react-native';
import Button from '../button';
import styles from './styles';

const iconClose = require('../../assets/icons/close.png');
const bannerIcon1 = require('../../assets/icons/app_icon_1.png');
const bannerIcon2 = require('../../assets/icons/app_icon_2.png');
const bannerIcon3 = require('../../assets/icons/app_icon_3.png');

export default function ModalIconChanged({isVisible, selectedIcon, onClose}) {
  function getIcon() {
    if (selectedIcon === 2) {
      return bannerIcon2;
    }
    if (selectedIcon === 4) {
      return bannerIcon3;
    }
    return bannerIcon1;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={onClose}>
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <View style={[styles.iconWrapper]}>
            <View
              style={[
                styles.ctnIconApp,
                (selectedIcon === 3 || selectedIcon === 4) && styles.bgBlack,
              ]}>
              <Image source={getIcon()} style={styles.ctnIconStyle} />
            </View>
          </View>

          <Text style={styles.txtTitle}>Icon changed</Text>
          <Text style={styles.txtDesc}>
            You have changed the icon for "Daily Quotes"
          </Text>
          <Button label="OK" btnStyle={styles.btnStyle} onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
