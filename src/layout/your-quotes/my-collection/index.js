import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Share from 'react-native-share';
import moment from 'moment';
import {Modal, Portal} from 'react-native-paper';
import CardMyCollection from '../../../components/card-my-collection';
import HeaderButton from '../../../components/header-button';
import Search from '../../../components/search';
import useDebounce from '../../../helpers/useDebounce';
import styles from './styles';
import {
  dislikeQuotes,
  getMyCollection,
  removeQuoteCollection,
  renameCollection,
} from '../../../shared/request';
import IconAddCollectionBlack from '../../../assets/svg/icon_add_collection_black_full.svg';
import IconShareBlack from '../../../assets/svg/icon_share_black_out.svg';
import IconLikeBlack from '../../../assets/svg/icon_love_outline_black.svg';
import IconTrashRed from '../../../assets/svg/icon_trash_red_out.svg';
import ModalAddCollection from '../../main-page/modal-add-collection';
import PopupDelete from '../../../components/popup-delete';
import LoadingIndicator from '../../../components/loading-indicator';
import UpdateMyCollection from '../update-my-collection';
import {refetchCollection} from '../../../helpers/user';
import {downloadText} from '../../../shared/static';

function MyCollectionDetail({
  isVisible,
  onClose,
  data = {},
  popUpLike,
  handlePopupLike,
}) {
  const [dataActive, setDataActive] = useState(null);
  const [activeQuote, setActiveQuote] = useState();
  const [instruksi, setInstruksi] = useState(false);
  const [showModalAddCollection, setShowModalAddCollection] = useState(false);
  const [showUpdateCollection, setShowUpdateCollection] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [searchText, setSearchText] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const debounceSearch = useDebounce(searchText, 500);
  const [listMyCollection, setListMyCollection] = useState({
    isLoading: false,
    listData: [],
    myData: {
      ...data,
    },
    activePage: 1,
    total: 0,
  });
  const [values, setFormValues] = useState({
    name: data.name,
  });

  const getListCollectionData = async () => {
    setListMyCollection({...listMyCollection, isLoading: true});
    const params = {
      length: 10,
      activePage: listMyCollection.activePage,
      search: debounceSearch,
    };
    const res = await getMyCollection(data.id, params);
    setListMyCollection({
      ...listMyCollection,
      listData: res.data.quotes.data,
      isLoading: false,
      myData: res.data.collection,
      total: res.data.quotes.total,
    });
  };

  useEffect(() => {
    getListCollectionData();
  }, []);

  useEffect(() => {
    if (debounceSearch || debounceSearch === '') {
      const handleSearch = async () => {
        const params = {
          length: 10,
          search: debounceSearch,
          page: 1,
        };
        const res = await getMyCollection(data.id, params);
        setListMyCollection({
          ...listMyCollection,
          listData: res.data.quotes.data,
          myData: res.data.collection,
          total: res.data.quotes.total,
          isLoading: false,
        });
      };
      handleSearch();
    }
  }, [debounceSearch]);

  const onShowHide = idActive => {
    setDataActive(idActive || null);
    setInstruksi(prevState => !prevState);
  };

  const onPressSelect = value => {
    if (instruksi === true) {
      onShowHide(value);
    } else {
      onShowHide(value);
    }
  };

  const handleDelete = async idQuote => {
    try {
      setLoading(true);
      const idCollection = data.id;
      await removeQuoteCollection({idCollection, idQuote});
      setListMyCollection({
        ...listMyCollection,
        listData: listMyCollection.listData.filter(
          item => item.quote.id !== idQuote,
        ),
        total: listMyCollection.total - 1,
      });
      setLoading(false);
      setShowDelete(false);
      setTimeout(() => {
        refetchCollection();
      }, 1000);
    } catch (err) {
      console.log('Error new collection:', err);
    }
  };

  const handleShare = async () => {
    await Share.open({
      message: `“${quoteText}”\n\n${downloadText}`,
    });
  };

  const handleLike = async (idQuote, status) => {
    try {
      if (!status) {
        popUpLike();
      }
      const payload = {
        type: status ? '2' : '1',
      };
      await dislikeQuotes(payload, idQuote);

      if (!status) {
        setTimeout(() => {
          handlePopupLike();
        }, 200);
      }
    } catch (err) {
      console.log('Error dislike:', err);
    }
  };

  const handleChangeValue = (stateName, value) => {
    setFormValues({
      ...values,
      [stateName]: value,
    });
  };

  const handleRename = async () => {
    try {
      setLoading(true);
      const payload = {
        name: values.name,
        _method: 'PATCH',
      };
      await renameCollection(payload, data.id);
      setListMyCollection({
        ...listMyCollection,
        myData: {
          name: values.name,
        },
      });
      setLoading(false);
      setShowUpdateCollection(false);
      setTimeout(() => {
        refetchCollection();
      }, 1000);
    } catch (err) {
      console.log('Error new collection:', err);
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!listMyCollection.isLoading) {
      if (listMyCollection.listData?.length > 0) {
        if (listMyCollection.listData?.length < listMyCollection.total) {
          setListMyCollection({...listMyCollection, isLoading: true});
          const listCollection = await getMyCollection(data.id, {
            length: 10,
            page: listMyCollection.activePage + 1,
          });
          setListMyCollection({
            ...listMyCollection,
            listData: [
              ...listMyCollection.listData,
              ...listCollection.data.quotes.data,
            ],
            activePage: listMyCollection.activePage + 1,
            isLoading: false,
            total: listCollection.data.quotes.total,
          });
        }
      }
    }
  };

  const handleAlertDelete = id => {
    Alert.alert('Are you sure you want to delete this quote?', '', [
      {
        text: 'Yes',
        onPress: () => {
          handleDelete(id);
        },
      },
      {text: 'Cancel', onPress: () => {}},
    ]);
  };

  function renderSearchHeader() {
    return (
      <View style={styles.ctnHeader}>
        <View style={styles.rowHeaderText}>
          <Search
            value={searchText}
            onChangeText={value => {
              setListMyCollection({
                isLoading: true,
                listData: [],
                myData: {
                  ...data,
                },
                activePage: 1,
                total: 0,
              });
              setSearchText(value);
            }}
            placeholder="Search"
            ctnRootStyle={styles.ctnSearch}
            // autoFocus
          />
        </View>
      </View>
    );
  }

  function renderContent(item, index) {
    return (
      <View style={styles.wrapContent}>
        <CardMyCollection
          item={item}
          isMyCollection
          quote={item.quote?.title}
          author={item.quote?.author}
          date={`${moment(item.created_at).format('ddd')}, ${moment(
            item.created_at,
          ).format('DD MMM YYYY')}`}
          onPressDelete={() => {
            handleAlertDelete(item.quote?.id);
          }}
          onPressAddCollection={() => {
            setActiveQuote(item.quote?.id);
            setShowModalAddCollection(true);
          }}
          onPresLiked={status => {
            handleLike(item.quote?.id, status);
          }}
        />
      </View>
    );
  }

  function renderFooter() {
    if (listMyCollection.isLoading) {
      return <LoadingIndicator />;
    }
    return null;
  }

  function renderFlatlistContent() {
    return (
      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ctnScroll}
        data={listMyCollection.listData}
        renderItem={({item, index}) => renderContent(item, index)}
        keyExtractor={item => item.id}
        ListFooterComponent={renderFooter()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
      />
    );
  }

  function renderAddCollection() {
    if (showModalAddCollection === true) {
      return (
        <ModalAddCollection
          isVisible={showModalAddCollection}
          onClose={() => {
            setShowModalAddCollection(false);
          }}
          idQuote={activeQuote}
        />
      );
    }
    return null;
  }

  function renderModalUpdateCollection() {
    if (showUpdateCollection === true) {
      return (
        <UpdateMyCollection
          isVisible={showUpdateCollection}
          closeModal={() => {
            setShowUpdateCollection(false);
          }}
          valueName={values.name}
          handleChange={value => {
            handleChangeValue('name', value);
          }}
          onPress={handleRename}
          isLoading={isLoading}
        />
      );
    }
    return null;
  }

  function renderPopuPDelete() {
    if (showDelete === true) {
      return (
        <PopupDelete
          isVisible={showDelete}
          onClose={() => {
            setShowDelete(false);
          }}
          isLoading={isLoading}
          onPress={() => {
            handleDelete(activeQuote);
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
            <HeaderButton
              title={listMyCollection.myData.name}
              onPress={onClose}
              rightPencil
              onRight={() => {
                setShowUpdateCollection(true);
              }}
            />
            {renderSearchHeader()}
            {renderFlatlistContent()}
            {renderAddCollection()}
            {renderPopuPDelete()}
            {renderModalUpdateCollection()}
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default MyCollectionDetail;
