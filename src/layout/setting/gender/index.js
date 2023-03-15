import React, {useEffect, useState} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ButtonOutline from '../../../components/button-outline';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import {getUserProfile, updateProfile} from '../../../shared/request';
import states from './states';
import dispatcher from './dispatcher';
import Button from '../../../components/button';
import {reloadUserProfile} from '../../../helpers/user';

const bannerImage = require('../../../assets/images/gender_app.png');

function ModalGender({isVisible, onClose, handleSetProfile, userProfile}) {
  const listGender = ['Male', 'Female', 'Others'];
  const [selectedCard, setSelectedCard] = useState(userProfile.data.gender);

  const handleSubmit = async item => {
    try {
      const payload = {
        gender: item,
        _method: 'PATCH',
      };
      await updateProfile(payload);
      reloadUserProfile();
    } catch (err) {
      console.log('Error select:', err);
    }
  };

  const onPressSelect = value => {
    setSelectedCard(value); // hanya di pilih satu
  };

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>Set your current gender identity.</Text>
        {listGender.map(gender => (
          <ButtonOutline
            isSelected={selectedCard === gender}
            onPress={() => {
              onPressSelect(gender);
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
      <TouchableOpacity
        style={styles.btnSkip}
        onPress={() => {
          onPressSelect('');
        }}>
        <Text style={styles.txtSkip}>Prefer not to say</Text>
      </TouchableOpacity>
    );
  }

  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={bannerImage} style={styles.iconBanner} />
      </View>
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
          <View style={styles.mainWrapper}>
            {renderBanner()}
            {renderInput()}
            {renderButton()}
          </View>
          <Button
            label="Save"
            onPress={() => {
              handleSubmit(selectedCard);
              setTimeout(() => {
                onClose();
              }, 300);
            }}
          />
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
