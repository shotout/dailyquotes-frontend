import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import styles from './styles';
import Button from '../../../components/button';
import ImgCollection from '../../../assets/svg/img_collection.svg';
import ModalNewCollection from '../modal-new-collection';
import IconClose from '../../../assets/svg/icon_close.svg';
import ContentNoCollection from './ContentNoCollection';

export default function ModalCollection({isVisible, onClose, onFinish}) {
  const [showModalNewCollection, setShowModalNewCollection] = useState(false);

  function renderButton() {
    return (
      <View style={styles.ctnButtton}>
        <Button
          label="Create collection"
          onPress={() => {
            setShowModalNewCollection(true);
          }}
        />
      </View>
    );
  }

  function renderContent() {
    return <ContentNoCollection />;
  }

  return (
    <Portal>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent
        contentContainerStyle={{flex: 1}}
        onDismiss={onClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            {renderContent()}
            {renderButton()}

            <View style={styles.btnStyle}>
              <TouchableOpacity onPress={onClose}>
                <View style={styles.btnClose}>
                  <IconClose width="100%" height="100%" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <ModalNewCollection
            isVisible={showModalNewCollection}
            closeModal={() => {
              setShowModalNewCollection(false);
              if (typeof onFinish === 'function') onFinish();
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
}
