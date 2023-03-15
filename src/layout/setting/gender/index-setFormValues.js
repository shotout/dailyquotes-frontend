import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ButtonOutline from '../../../components/button-outline';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import {updateProfile} from '../../../shared/request';
import states from './states';
import dispatcher from './dispatcher';
import {reloadUserProfile} from '../../../helpers/user';

function ModalGender({isVisible, onClose, userProfile}) {
  const listGender = ['Male', 'Female', 'Others'];
  const [values, setFormValues] = useState({
    gender: userProfile.data.gender,
    _method: 'PATCH',
  });

  const handleSubmit = async () => {
    try {
      const payload = {
        gender: values.gender,
        _method: values._method,
      };
      await updateProfile(payload);
      setTimeout(() => {
        reloadUserProfile();
      }, 1000);
    } catch (err) {
      console.log('Error select:', err);
    }
  };

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>Set your current gender identity.</Text>
        {listGender.map(gender => (
          <ButtonOutline
            isSelected={values.gender === gender}
            onPress={() => {
              handleSubmit();
              setFormValues({
                ...values,
                gender,
              });
            }}
            label={gender}
            key={gender}
          />
        ))}
      </View>
    );
  }

  function renderButton() {
    return (
      <TouchableOpacity style={styles.btnSkip} onPress={onClose}>
        <Text style={styles.txtSkip}>Prefer not to say</Text>
      </TouchableOpacity>
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onDismiss={onClose}>
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <HeaderButton title="Gender identity" onPress={onClose} />
          {renderInput()}
          {renderButton()}
        </View>
      </View>
    </Modal>
  );
}

ModalGender.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object.isRequired,
};

export default connect(states, dispatcher)(ModalGender);
