import React from 'react';
import {Text, TouchableOpacity, View, Modal} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconClose from '../../../assets/svg/icon_close.svg';
import IconAddCollectionBlack from '../../../assets/svg/ic_edit_name.svg';
import styles from './styles';
import Button from '../../../components/button';
import Input from '../../../components/input';

function UpdateMyCollection({
  isVisible,
  closeModal,
  handleChange,
  isLoading,
  onPress,
  valueName,
}) {
  function renderIconClose() {
    return (
      <View style={styles.btnStyle}>
        <TouchableOpacity onPress={closeModal}>
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
          <IconAddCollectionBlack width="100%" height="100%" />
        </View>
        <Text style={styles.ctnTitle}>Rename collection</Text>
        <Text style={styles.ctnKet}>Change the name of your collection.</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Word"
          ctnRootStyle={styles.ctnRootInput}
          value={valueName}
          onChangeText={handleChange}
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <Button
        label="Rename"
        btnStyle={styles.btnAdd}
        onPress={onPress}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      contentContainerStyle={{flex: 1}}
      onDismiss={closeModal}>
      <View style={styles.ctnRoot}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.ctnScroll}
          style={styles.keyboadrRoot}>
          <View style={styles.mainWrapper}>
            <View style={styles.ctnContent}>
              {renderTitle()}
              {renderForm()}
              {renderButton()}
              {renderIconClose()}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}

export default UpdateMyCollection;
