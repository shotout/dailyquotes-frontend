import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Portal} from 'react-native-paper';
import CardMyCollection from '../../../components/card-my-collection';
import HeaderButton from '../../../components/header-button';
import styles from './styles';
import IconAddCollectionBlack from '../../../assets/svg/icon_add_collection_black_full.svg';
import IconShareBlack from '../../../assets/svg/icon_share_black_out.svg';
import IconLikeBlack from '../../../assets/svg/icon_love_outline_black.svg';
import IconTrashRed from '../../../assets/svg/icon_trash_red_out.svg';
import Button from '../../../components/button';
import {showModalPremium} from '../../../shared/globalContent';
import states from './states';
import {
  dislikeQuotes,
  getListPastQuotes,
  removePastCollection,
  getListQuotes,
} from '../../../shared/request';
import ModalAddCollection from '../../main-page/modal-add-collection';
import dispatcher from './dispatcher';
import IconLove from '../../../assets/svg/icon_love_tap.svg';
import PopupDelete from '../../../components/popup-delete';
import LoadingIndicator from '../../../components/loading-indicator';
import {
  handleBasicPaywall,
  handlePayment,
  isUserPremium,
} from '../../../helpers/user';
import {downloadText} from '../../../shared/static';

function PastQuotes({isVisible, onClose, userProfile, fetchPastQuotes}) {
  const [dataActive, setDataActive] = useState({});
  const [instruksi, setInstruksi] = useState(false);
  const [quoteText, setQuoteText] = useState('');
  const [showModalAddCollection, setShowModalAddCollection] = useState(false);
  const [showModalLike, setShowModalLike] = useState(false);
  const [activeQuote, setActiveQuote] = useState();
  const [isLoading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [listDataPast, setListDataPast] = useState({
    listData: [],
    total: '',
    page: 0,
    isLoading: false,
  });

  const getListDataPast = async () => {
    setListDataPast({...listDataPast, isLoading: true});
    const res = await getListPastQuotes({length: 10, page: 1});
    if (res.data.data.length > 0) {
      if (Array.isArray(res.data)) {
        setListDataPast({
          listData: res.data || [],
          isLoading: false,
          total: 0,
          page: 1,
        });
      } else {
        setListDataPast({
          listData: res.data?.data || [],
          isLoading: false,
          total: res.data.total,
          page: 1,
        });
      }
    } else {
      const resp = await getListQuotes({
        length: 15,
        page: 1,
      });
      if (Array.isArray(resp.data)) {
        setListDataPast({
          listData: res.data || [],
          isLoading: false,
          total: 0,
          page: 1,
        });
      } else {
        setListDataPast({
          listData: resp.data?.data || [],
          isLoading: false,
          total: resp.data.total,
          page: 1,
        });
      }
    }
  };

  useEffect(() => {
    // fetchPastQuotes();
    getListDataPast();
  }, []);

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

  const handleLike = async (idQuote, status) => {
    try {
      if (!status) {
        setShowModalLike(true);
      }
      const payload = {
        type: status ? '2' : '1',
      };
      await dislikeQuotes(payload, idQuote);
      if (!status) {
        setTimeout(() => {
          setShowModalLike(false);
        }, 200);
      }
    } catch (err) {
      console.log('Error dislike:', err);
    }
  };

  const handleShare = async text => {
    await Share.open({
      message: `“${text}”\n\n${downloadText}`,
    });
  };

  const handleDelete = async idQuote => {
    try {
      setListDataPast({
        ...listDataPast,
        listData: listDataPast.listData.filter(item => item.id !== idQuote),
      });
      await removePastCollection({idQuote});
      setTimeout(async () => {
        const res = await getListPastQuotes({length: 10, page: 1});
        if (res.data.data.length > 0) {
          if (Array.isArray(res.data)) {
            setListDataPast({
              listData: res.data || [],
              isLoading: false,
              total: 0,
              page: 1,
            });
          } else {
            setListDataPast({
              listData: res.data?.data || [],
              isLoading: false,
              total: res.data.total,
              page: 1,
            });
          }
        } else {
          // const resp = await getListQuotes({
          //   length: 15,
          //   page: 1,
          // });
          // if (Array.isArray(resp.data)) {
          //   setListDataPast({
          //     listData: res.data || [],
          //     isLoading: false,
          //     total: 0,
          //     page: 1,
          //   });
          // } else {
          //   setListDataPast({
          //     listData: resp.data?.data || [],
          //     isLoading: false,
          //     total: resp.data.total,
          //     page: 1,
          //   });
          // }
        }
      }, 200);
    } catch (err) {
      console.log('Error new collection:', err);
    }
  };

  const handleLoadMore = async () => {
    if (!listDataPast.loading && isUserPremium()) {
      if (listDataPast.total > 0) {
        if (listDataPast.listData?.length < listDataPast.total) {
          setListDataPast({...listDataPast, isloading: true});
          const listPastDb = await getListPastQuotes({
            length: 10,
            page: listDataPast.page + 1,
          });
          if (listPastDb.data.data.length > 0) {
            setListDataPast({
              ...listDataPast,
              listData: [...listDataPast.listData, ...listPastDb.data],
              isloading: false,
              page: listDataPast.page + 1,
            });
          } else {
            // const resp = await getListQuotes({
            //   length: 15,
            //   page: 1,
            // });
            // setListDataPast({
            //   ...listDataPast,
            //   listData: [...listDataPast.listData, ...resp.data],
            //   isloading: false,
            //   page: listDataPast.page + 1,
            // });
          }
        }
      }
    }
  };

  function renderHeader() {
    return (
      <HeaderButton
        title="Past Quotes"
        onPress={onClose}
        rightText={!isUserPremium()}
        labelRight="View all"
        onRightText={handleBasicPaywall}
      />
    );
  }

  function renderModalMore(id) {
    if (dataActive === id && instruksi) {
      return (
        <Portal>
          <View style={styles.ctnMoreWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                setActiveQuote(id);
                setShowModalAddCollection(true);
              }}>
              <View style={styles.ctnRow}>
                <Text style={styles.label}>Add to collection</Text>
                <View style={styles.ctnIconAction}>
                  <IconAddCollectionBlack width="100%" height="100%" />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.separator} />
            <TouchableWithoutFeedback
              onPress={() => {
                handleShare();
              }}>
              <View style={styles.ctnRow}>
                <Text style={styles.label}>Share this Quote</Text>
                <View style={styles.ctnIconAction}>
                  <IconShareBlack width="100%" height="100%" />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.separator} />
            <TouchableWithoutFeedback
              onPress={() => {
                handleLike(id);
              }}>
              <View style={styles.ctnRow}>
                <Text style={styles.label}>Save to liked quotes</Text>
                <View style={styles.ctnIconAction}>
                  <IconLikeBlack width="100%" height="100%" />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.separator} />
            <TouchableWithoutFeedback
              onPress={() => {
                setShowDelete(true);
                setActiveQuote(id);
              }}>
              <View style={styles.ctnRow}>
                <Text style={styles.label}>Remove</Text>
                <View style={styles.ctnIconAction}>
                  <IconTrashRed width="100%" height="100%" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Portal>
      );
    }
    return null;
  }

  function renderContent(item, index) {
    return (
      <View style={styles.wrapContent}>
        <CardMyCollection
          item={item}
          quote={item.title}
          author={item.author}
          onPresShare={() => {
            handleShare(item.title);
          }}
          onPressMore={() => {
            onPressSelect(item.id);
            setQuoteText(item.title);
          }}
          onPresLiked={status => {
            handleLike(item.id, status);
          }}
          onPressAddCollection={() => {
            setActiveQuote(item.id);
            setShowModalAddCollection(true);
          }}
          onPressDelete={() => {
            Alert.alert('Are you sure you want to delete this quote?', '', [
              {
                text: 'Yes',
                onPress: () => {
                  handleDelete(item.id);
                },
              },
              {text: 'Cancel', onPress: () => {}},
            ]);
          }}
        />
        {renderModalMore(item.id)}
      </View>
    );
  }

  function renderNoList() {
    if (listDataPast.listData?.length === 0 && !listDataPast.isLoading) {
      return (
        <View style={styles.noListWrap}>
          <Text style={styles.label}>Tidak ada data</Text>
        </View>
      );
    }
    return null;
  }

  function renderButtonMore() {
    if (listDataPast.listData.length >= 4 && !isUserPremium()) {
      return (
        <Button
          label="See older quotes"
          btnStyle={styles.btnMoreStyle}
          onPress={handleBasicPaywall}
        />
      );
    }
    return null;
  }

  function renderFooter() {
    if (listDataPast.isLoading) {
      return <LoadingIndicator />;
    }
    return null;
  }

  function renderFlatlistContent() {
    return (
      <View style={styles.flexOne}>
        <FlatList
          style={styles.flexOne}
          contentContainerStyle={styles.ctnScroll}
          data={listDataPast.listData}
          renderItem={({item, index}) => renderContent(item, index)}
          keyExtractor={item => item.id}
          ListFooterComponent={renderFooter()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.09}
          // ListEmptyComponent={renderNoList()}
        />
        {renderButtonMore()}
        {/* // <FlatList
        //   style={styles.flexOne}
        //   contentContainerStyle={{flexGrow: 1}}
        //   showsVerticalScrollIndicator={false}
        //   data={listDataPast.listData}
        //   renderItem={({item, index}) => null}
        //   keyExtractor={item => item.id}
        //   ListFooterComponent={renderFooter()}
        //   onEndReached={handleLoadMore}
        //   onEndReachedThreshold={0.8}
        //   ListEmptyComponent={renderNoList()}
        // /> */}
      </View>
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

  function renderModalLike() {
    if (showModalLike === true) {
      return (
        <Modal
          visible={showModalLike}
          animationType="fade"
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
            {renderHeader()}
            {renderFlatlistContent()}
            {renderAddCollection()}
            {renderModalLike()}
            {renderPopuPDelete()}
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

PastQuotes.propTypes = {
  userProfile: PropTypes.object.isRequired,
};

PastQuotes.defaultProps = {};

export default connect(states, dispatcher)(PastQuotes);
