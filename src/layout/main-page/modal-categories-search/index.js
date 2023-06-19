import React, {useCallback, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Modal, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import Search from '../../../components/search';
import styles from './styles';
import CardCategories from '../../../components/card-categories';
import {getListGroup} from '../../../shared/request';
import useDebounce from '../../../helpers/useDebounce';
import {
  handleBasicPaywall,
  handlePayment,
  isUserPremium,
} from '../../../helpers/user';
import LoadingIndicator from '../../../components/loading-indicator';
import states from './states';

const iconClose = require('../../../assets/icons/close.png');

function ModalCategoriesSearch({isVisible, onClose, userProfile}) {
  const [listCategories, setCategories] = useState([]);
  const [isAutoFocus, setAutoFocus] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const debounceSearch = useDebounce(searchText, 500);

  useState(() => {
    setTimeout(() => {
      setAutoFocus(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (debounceSearch) {
      const handleSearch = async () => {
        const params = {
          search: debounceSearch,
        };
        const res = await getListGroup(params);
        setCategories(res.data);
        setLoader(false);
      };
      handleSearch();
    }
    if (debounceSearch === '') {
      setCategories([]);
      setLoader(false);
    }
  }, [debounceSearch]);

  const getInitialCategory = useCallback(() => {
    if (userProfile.data.categories?.length > 0) {
      return userProfile.data.categories.map(item => item.id);
    }
    return [];
  }, [userProfile.data.categories]);

  const handleClose = () => {
    setAutoFocus(false);
    if (typeof onClose === 'function') onClose();
  };

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={handleClose}>
        <Image source={iconClose} style={styles.btnClose} />
      </TouchableOpacity>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.ctnHeader}>
        <View style={styles.rowHeaderText}>
          {renderIconClose()}
          <Search
            value={searchText}
            onChangeText={value => {
              setLoader(true);
              setSearchText(value);
            }}
            placeholder="Search"
            ctnRootStyle={styles.ctnSearch}
            autoFocus
          />
          {!isUserPremium() && (
            <TouchableOpacity
              style={styles.ctnJustifyEnd}
              onPress={handleBasicPaywall}>
              <Text style={styles.txtHeaderBtn}>Unlock all</Text>
            </TouchableOpacity>
          )}
        </View>
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
        onDismiss={handleClose}>
        <View style={styles.ctnRoot}>
          <View style={styles.ctnContent}>
            {renderHeader()}
            <ScrollView
              contentContainerStyle={styles.ctnScroll}
              style={styles.ctnRoot}>
              <CardCategories
                buttonLabel="Go Premium"
                hidePopular
                hidePremium
                isSearch
                listData={listCategories}
                initialSelect={getInitialCategory}
                additionalContent={isLoading ? <LoadingIndicator /> : null}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

ModalCategoriesSearch.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalCategoriesSearch.defaultProps = {};

export default connect(states)(ModalCategoriesSearch);
