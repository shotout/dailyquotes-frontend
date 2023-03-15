import React, {useState, createRef} from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import HeaderButton from '../../../components/header-button';
import ListContent from '../../../components/list-content-border';
import styles from './styles';
import IconEdit from '../../../assets/svg/icon_edit.svg';
import IconCategoriesBlack from '../../../assets/svg/icon_categories_black.svg';
import IconGender from '../../../assets/svg/icon_gender.svg';
import IconChangeLogo from '../../../assets/svg/icon_change_logo.svg';
import ModalUpdateName from '../modal-update-name';
import ModalCategories from '../../main-page/modal-categories';
import ModalGender from '../gender';
import ModalChangeIcon from '../change-icon';

const bannerIcon1 = require('../../../assets/icons/app_icon_1.png');
const mainBannerIcon = require('../../../assets/icons/setting_banner.png');

export default function AccountPreference({isVisible, onClose}) {
  const [showChangeName, setShowChangeName] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showChangeGender, setShowChangeGender] = useState(false);
  const [showChangeIcon, setShowChangeIcon] = useState(false);
  const [showModalChanged, setShowModalChanged] = useState(false);

  const refPrefCategory = createRef();

  function renderModalChangeName() {
    if (showChangeName === true) {
      return (
        <ModalUpdateName
          visible={showChangeName}
          onClose={() => {
            setShowChangeName(false);
          }}
        />
      );
    }
    return null;
  }

  function renderGender() {
    if (showChangeGender === true) {
      return (
        <ModalGender
          visible={showChangeGender}
          onClose={() => {
            setShowChangeGender(false);
          }}
        />
      );
    }
    return null;
  }

  function renderChangeIcon() {
    if (showChangeIcon === true) {
      return (
        <ModalChangeIcon
          visible={showChangeIcon}
          onClose={() => {
            setShowChangeIcon(false);
          }}
          selectModal={() => {
            setShowModalChanged(true);
          }}
        />
      );
    }
    return null;
  }

  function renderModalIconChanged() {
    if (showModalChanged === true) {
      return (
        <Modal
          visible={showModalChanged}
          animationType="fade"
          transparent
          onDismiss={() => {
            setShowModalChanged(false);
          }}>
          <View style={styles.ctnChanged}>
            <View style={styles.ctnBgChanged}>
              <View style={styles.rowChanged}>
                <Image source={bannerIcon1} style={styles.iconChangedWrap} />
                <Text style={styles.txtChanged}>
                  You have changed the {'\n'} icon for “Mooti”
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnWrap}
                onPress={() => {
                  setShowModalChanged(false);
                }}>
                <Text style={styles.btnOke}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  function renderBanner() {
    return (
      <View style={styles.ctnBanner}>
        <Image source={mainBannerIcon} style={styles.iconBanner} />
      </View>
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
            <HeaderButton title="Account & preferences" onPress={onClose} />
            {renderBanner()}
            <View style={styles.ctnWrap}>
              <ListContent
                title="Change name"
                icon={<IconEdit width="100%" height="100%" />}
                onPress={() => {
                  setShowChangeName(true);
                }}
              />
              <ListContent
                title="Categories"
                icon={<IconCategoriesBlack width="100%" height="100%" />}
                onPress={() => {
                  refPrefCategory.current.show();
                }}
              />
              <ListContent
                title="Gender identity"
                icon={<IconGender width="100%" height="100%" />}
                onPress={() => {
                  setShowChangeGender(true);
                }}
              />
              {/* <ListContent
                title="Forbidden words"
                icon={<IconMute width="100%" height="100%" />}
              /> */}
              <ListContent
                title="Change icon"
                icon={<IconChangeLogo width="100%" height="100%" />}
                onPress={() => {
                  setShowChangeIcon(true);
                }}
              />
              <ModalCategories
                fullSize={Platform.OS === 'android'}
                contentRef={c => (refPrefCategory.current = c)}
                onClose={() => {
                  refPrefCategory.current.hide();
                }}
              />
              {renderModalChangeName()}
              {renderGender()}
              {renderChangeIcon()}
              {renderModalIconChanged()}
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
