import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconClose from '../../../assets/svg/icon_close.svg';
import IconUserColor from '../../../assets/svg/icon_user_two_color.svg';
import styles from './styles';
import Button from '../../../components/button';
import Input from '../../../components/input';
import {getUserProfile, updateProfile} from '../../../shared/request';
import states from './states';
import dispatcher from './dispatcher';
import {reloadUserProfile} from '../../../helpers/user';

function ModalUpdateName({isVisible, onClose, userProfile}) {
  const [isLoading, setLoading] = useState(false);
  const [values, setFormValues] = useState({
    name: userProfile.data.name,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        name: values.name,
        _method: 'PATCH',
      };
      await updateProfile(payload);
      reloadUserProfile();
      onClose();
      setLoading(false);
    } catch (err) {
      console.log('Error select:', err);
      setLoading(false);
    }
  };

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
          <IconUserColor width="100%" height="100%" />
        </View>
        <Text style={styles.ctnTitle}>What’s your name?</Text>
        <Text style={styles.ctnKet}>
          Save your name to obtain an improved personalization.
        </Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Your Name"
          ctnRootStyle={styles.ctnRootInput}
          value={values.name}
          onChangeText={name => {
            setFormValues({
              ...values,
              name,
            });
          }}
        />
      </View>
    );
  }

  function renderButton() {
    return (
      <Button
        label="Update"
        btnStyle={styles.btnAdd}
        onPress={() => {
          handleSubmit();
        }}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={onClose}>
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

ModalUpdateName.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

export default connect(states, dispatcher)(ModalUpdateName);
