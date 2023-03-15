import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import IconClose from '../../assets/svg/icon_close.svg';
import IconTrashRed from '../../assets/svg/icon_trash_red_out.svg';
import styles from './styles';
import Button from '../button';

function PopupDelete({isVisible, onClose, onPress, isLoading}) {
  function renderIconClose() {
    return (
      <View style={styles.btnStyle}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.btnClose}>
            <IconClose width="100%" height="100%" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderTitle() {
    return (
      <View style={styles.titleWrapper}>
        <View style={styles.iconCollection}>
          <IconTrashRed width="100%" height="100%" />
        </View>
        <Text style={styles.ctnTitle}>
          Are you sure you want to delete this item?
        </Text>
      </View>
    );
  }

  function renderButton() {
    return (
      <Button
        label="Yes"
        btnStyle={styles.btnYes}
        onPress={onPress}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="fade"
        transparent
        contentContainerStyle={{flex: 1}}
        onDismiss={onClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            {renderTitle()}
            {renderButton()}
            {renderIconClose()}
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default PopupDelete;
