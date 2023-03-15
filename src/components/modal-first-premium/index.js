import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import {
  handleModalFirstPremium,
  showModalPremium,
} from '../../shared/globalContent';
import Button from '../button';
import styles from './styles';
import states from './states';

const freePremium = require('../../assets/images/free_premium.png');
const iconClose = require('../../assets/icons/close.png');

function ModalFirstPremium({modalFirstPremium}) {
  const handleClose = () => {
    handleModalFirstPremium(false);
  };

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnCloseStyle} onPress={handleClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }
  return (
    <Portal>
      <Modal
        style={styles.modalRoot}
        contentContainerStyle={styles.ctnModal}
        visible={modalFirstPremium}>
        <View style={styles.ctnContent}>
          <Image source={freePremium} style={styles.imgFreePremium} />
          <View style={styles.ctnText}>
            <Text style={styles.txtTitle}>
              {`GET 1-MONTH MOOTI\nPREMIUM FOR FREE`}
            </Text>
            <Text style={styles.txtDesc}>
              Simply share your beloved content on your social!
            </Text>
            <Button
              btnStyle={styles.btnStyle}
              label="Got it"
              onPress={() => {
                handleClose();
              }}
            />
          </View>
          {renderIconClose()}
        </View>
      </Modal>
    </Portal>
  );
}

export default connect(states)(ModalFirstPremium);
