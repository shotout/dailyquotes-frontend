import React, {useEffect} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ImgStarLock from '../../../assets/svg/img_star_lock.svg';
import Button from '../../../components/button';
import states from './states';
import {hideModalPremium} from '../../../shared/globalContent';
import {openTermsofUse} from '../../../helpers/user';
import {APP_INSTALLED, eventTracking} from '../../../helpers/eventTracking';

const iconChecklist = require('../../../assets/icons/checklist.png');

function ModalLock({showModalPremium, userProfile}) {
  useEffect(() => {
    const handleAppInstalled = async () => {
      const res = await AsyncStorage.getItem('isAppInstalled');
      if (!res) {
        eventTracking(APP_INSTALLED);
        AsyncStorage.setItem('isAppInstalled', 'yap');
      }
    };
    handleAppInstalled();
  }, []);

  const listItem = [
    'Enjoy the full experience',
    'Quotes you can’t find anywhere else',
    'Categories for any situation',
    'Original themes, customizable',
    'Only USD 1.67/month, billed annually',
    'No ads, no watermarks',
  ];

  function renderIcon() {
    return (
      <View style={styles.ctnImgWrap}>
        <View style={styles.ctnImg}>
          <ImgStarLock width="100%" height="100%" />
        </View>
        <Text style={styles.ctnTxtImg}>Try Mooti Premium</Text>
      </View>
    );
  }

  function renderInputOften() {
    return listItem.map(item => (
      <View style={styles.ctnInput} key={item}>
        <View style={[styles.ctnSeparator, styles.ctnRadius]}>
          <Image style={styles.iconStyle} source={iconChecklist} />
        </View>
        <Text style={styles.txtItem}>{item}</Text>
        <View style={styles.ctnSeparator} />
      </View>
    ));
  }

  function renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Text style={styles.txtInput}>Unlock everything</Text>
        {renderInputOften()}
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={styles.wrapper}>
        {/* <Text style={styles.txtTopButton}>USD 19.99/year</Text> */}
        <Text style={styles.txtTopButton}>
          3 days free, then just USD 19.99/year
        </Text>
        <Button
          label="Continue"
          btnStyle={styles.buttonStyle}
          onPress={hideModalPremium}
        />
      </View>
    );
  }

  function renderFooter() {
    if (userProfile.token) {
      return (
        <View style={styles.wrapperFooter}>
          <TouchableOpacity style={styles.touchWrap} onPress={openTermsofUse}>
            <Text style={styles.txtFooter}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.wrapperFooter}>
        {/* <TouchableOpacity style={styles.touchWrap} onPress={openPrivacyPolicy}>
          <Text style={styles.txtFooter}>Already a member?</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.touchWrap} onPress={openTermsofUse}>
          <Text style={styles.txtFooter}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchWrap}>
          <Text style={styles.txtFooter}>Other options</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Modal
      visible={showModalPremium}
      animationType="slide"
      transparent
      onDismiss={hideModalPremium}>
      <View style={styles.ctnRoot}>
        <View style={styles.ctnContent}>
          <View style={styles.ctnWrapper}>
            <TouchableOpacity onPress={hideModalPremium}>
              <Text style={styles.ctnTxtDone}>Done</Text>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderIcon()}
              {renderInput()}
              {renderButton()}
              {renderFooter()}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

ModalLock.propTypes = {
  showModalPremium: PropTypes.bool,
  userProfile: PropTypes.object,
};

ModalLock.defaultProps = {
  showModalPremium: false,
  userProfile: {},
};

export default connect(states)(ModalLock);
