import React, {useState} from 'react';
import {Text, TouchableOpacity, View, Modal} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconClose from '../../../assets/svg/icon_close.svg';
import IconAddCollectionBlack from '../../../assets/svg/icon_add_collection_black.svg';
import styles from './styles';
import Button from '../../../components/button';
import Input from '../../../components/input';
import {addNewCollection} from '../../../shared/request';
import dispatcher from './dispatcher';

function ModalNewCollection({isVisible, onClose, fetchCollection, closeModal}) {
  const [isLoading, setLoading] = useState(false);
  const [values, setFormValues] = useState({
    name: '',
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        name: values.name,
      };
      await addNewCollection(payload);
      await fetchCollection();
      closeModal();
      setLoading(false);
    } catch (err) {
      console.log('Error new collection:', err);
      setLoading(false);
    }
  };

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
        <Text style={styles.ctnTitle}>New collection</Text>
        <Text style={styles.ctnKet}>
          Write a name for your new collection. You can rename it later.
        </Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Collection name"
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
        label="Add collection"
        btnStyle={styles.btnAdd}
        onPress={handleSubmit}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
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

ModalNewCollection.propTypes = {
  fetchCollection: PropTypes.func.isRequired,
};

export default connect(null, dispatcher)(ModalNewCollection);
