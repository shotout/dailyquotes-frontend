import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Portal} from 'react-native-paper';
import {SwipeListView} from 'react-native-swipe-list-view';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import IconRight from '../../../assets/svg/icon_right.svg';
import states from './states';
import Button from '../../../components/button';
import HeaderButton from '../../../components/header-button';
import MyCollectionDetail from '../my-collection';
import IconLove from '../../../assets/svg/icon_love_tap.svg';
import ModalNewCollection from '../../main-page/modal-new-collection';
import PencilIcon from '../../../assets/svg/pencil.svg';
import IconDelete from '../../../assets/svg/ic_delete.svg';
import {setCollectionData} from '../../../helpers/user';
import {
  deleteUserCollection,
  getListCollection,
  renameCollection,
} from '../../../shared/request';
import ContentNoCollection from '../../main-page/modal-collection/ContentNoCollection';
import ModalChangCollectionName from '../update-my-collection';

const rowTranslateAnimatedValues = {};
const initialModalName = {
  visible: false,
  name: '',
  isLoading: false,
  content: {},
  rowMap: {},
};

Array(99)
  .fill('')
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

function QuoteCollections({isVisible, onClose, collections}) {
  const [activeCard, setActiveCard] = useState({});
  const [showMyCollection, setShowMyCollection] = useState(false);
  const [showModalLike, setShowModalLike] = useState(false);
  const [showModalNewCollection, setShowModalNewCollection] = useState(false);
  const [showModalChangeName, setShowModalChangeName] =
    useState(initialModalName);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }

    setShowModalChangeName(initialModalName);
  };

  const handleRename = async () => {
    try {
      setShowModalChangeName({
        ...showModalChangeName,
        isLoading: true,
      });
      const payload = {
        name: showModalChangeName.name,
        _method: 'PATCH',
      };
      await renameCollection(payload, showModalChangeName.content?.id);
      setTimeout(async () => {
        const collection = await getListCollection();
        setCollectionData(collection.data);
        closeRow(showModalChangeName.rowMap, showModalChangeName.content?.id);
      }, 1000);
    } catch (err) {
      setShowModalChangeName(initialModalName);
    }
  };

  const handleDelete = (rowMap, rowKey) => {
    const newData = [...collections];
    const prevIndex = collections.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setCollectionData(newData);
    deleteUserCollection(rowKey);
  };

  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const handleEditPress = (data, rowMap) => {
    setShowModalChangeName({
      visible: true,
      name: data.item.name,
      isLoading: false,
      content: data.item,
      rowMap,
    });
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.hiddenWrapper}>
      <TouchableOpacity
        style={[styles.ctnHidden, styles.bgBlue]}
        onPress={() => {
          handleEditPress(data, rowMap);
        }}>
        <View style={styles.ctnAction}>
          <PencilIcon width="100%" height="100%" color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ctnHidden}
        onPress={() => {
          handleDelete(rowMap, data.item.id);
        }}>
        <View style={styles.ctnAction}>
          <IconDelete width="100%" height="100%" color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );

  function renderContentCollection(item, index) {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setShowMyCollection(true);
          setActiveCard(item);
        }}>
        <View style={styles.rowContentWrap}>
          <View style={styles.rightWrap}>
            <Text style={styles.ctnTitle}>{item.name}</Text>
            <Text style={styles.stnsubTittle}>{item.quotes_count} quotes</Text>
          </View>
          <View style={styles.ctnIcon}>
            <IconRight width="100%" height="100%" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderEmpty() {
    return <ContentNoCollection />;
  }

  function renderDataCollection() {
    return (
      <SwipeListView
        style={{flex: 1}}
        disableRightSwipe
        showsVerticalScrollIndicator={false}
        data={collections}
        renderHiddenItem={renderHiddenItem}
        renderItem={({item, index}) => renderContentCollection(item, index)}
        ListEmptyComponent={renderEmpty()}
        keyExtractor={item => item.id}
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    );
  }

  function renderModalMyCollection() {
    if (showMyCollection === true) {
      return (
        <MyCollectionDetail
          isVisible={showMyCollection}
          onClose={() => {
            setShowMyCollection(false);
          }}
          data={activeCard}
          popUpLike={() => {
            setShowModalLike(true);
          }}
          handlePopupLike={() => {
            setShowModalLike(false);
          }}
        />
      );
    }
    return null;
  }

  function renderModalLike() {
    if (showModalLike === true) {
      return (
        <Portal>
          <Modal
            visible={showModalLike}
            animationType="slide"
            transparent
            contentContainerStyle={{flex: 1}}
            onDismiss={() => {
              setShowModalLike(false);
            }}>
            <View style={styles.ctnLike}>
              <View style={styles.ctnBgLike}>
                <View style={styles.iconLikeWrap}>
                  <IconLove width="100%" height="100%" />
                </View>
                <Text style={styles.txtLike}>Liked</Text>
              </View>
            </View>
          </Modal>
        </Portal>
      );
    }
    return null;
  }

  function renderButton() {
    return (
      <Button
        label={collections?.length > 0 ? 'Add collection' : 'Create collection'}
        onPress={() => {
          setShowModalNewCollection(true);
        }}
      />
    );
  }

  function renderModalNewCollection() {
    if (showModalNewCollection === true) {
      return (
        <ModalNewCollection
          isVisible={showModalNewCollection}
          closeModal={() => {
            setShowModalNewCollection(false);
          }}
        />
      );
    }
    return null;
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
            <HeaderButton title="Collections" onPress={onClose} />
            <View style={styles.ctnWrapper}>
              {renderDataCollection()}
              {renderButton()}
            </View>
            {renderModalMyCollection()}
            {renderModalLike()}
            {renderModalNewCollection()}
            <ModalChangCollectionName
              isVisible={showModalChangeName.visible}
              closeModal={() => {
                closeRow(
                  showModalChangeName.rowMap,
                  showModalChangeName.content?.id,
                );
              }}
              valueName={showModalChangeName.name}
              handleChange={value => {
                setShowModalChangeName({
                  ...showModalChangeName,
                  name: value,
                });
              }}
              onPress={handleRename}
              isLoading={showModalChangeName.isLoading}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

QuoteCollections.propTypes = {
  collections: PropTypes.array.isRequired,
};

export default connect(states)(QuoteCollections);
