import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../../shared/static';
import styles from './styles';
import IconLockWhite from '../../assets/svg/icon_lock.svg';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import {selectTheme, unlockByAdmob} from '../../shared/request';
import states from './states';
import dispatcher from './dispatcher';
import {handlePayment, isUserPremium} from '../../helpers/user';
import LoadingIndicator from '../loading-indicator';
import {themesData} from '../../shared/static/themes';
import {handleShuffleTheme, listTheme} from '../../shared/useBackgroundQuotes';
import ModalUnlockCategory from '../modal-unlock-ads';

const iconSuffle = require('../../assets/icons/random_theme.png');
const adsIcon = require('../../assets/icons/ads_icon.png');
const themesBanner = require('../../assets/icons/themes_banner.png');

function CardTheme({
  listData,
  userProfile,
  handleSetProfile,
  onClose,
  onCustomSelectTheme,
  customSelected,
}) {
  const shuffleData = {
    background: null,
    background_color: null,
    id: 6,
    is_free: 1,
    name: 'Random',
    status: 2,
  };
  const [selectedCard, setSelectedCard] = useState([]);
  const [isLoading, setLoading] = useState(null);
  const [showUnlockCardAds, setUnlockCards] = useState(false);
  const [selectedTheme, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (userProfile.data.themes?.length) {
      const listTheme = userProfile.data.themes.map(item => item.id);
      setSelectedCard(listTheme);
    }
  }, [userProfile]);

  const isDataSelected = value => {
    const findItem = customSelected
      ? value === customSelected
      : selectedCard.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const handleSubmit = async item => {
    try {
      const objData =
        item[0] === 6
          ? shuffleData
          : listData.find(content => content.id === item[0]);
      selectTheme({
        _method: 'PATCH',
        themes: item,
      });
      if (!isUserPremium()) {
        unlockByAdmob({
          custom_data: `theme_${item[0]}`,
          user_id: userProfile?.data?.id || '',
        });
      }
      // fetchListQuote();
      handleSetProfile({
        ...userProfile,
        data: {
          ...userProfile.data,
          themes: [objData],
        },
      });
      setLoading(null);
      if (typeof onClose === 'function') onClose();
    } catch (err) {
      console.log('Error select:', err);
    }
  };

  const onPressSelect = value => {
    // const isSelected = isDataSelected(value);
    // if (isSelected) {
    //   setSelectedCard(selectedCard.filter(item => item !== value));
    // } else {
    //   const mainData = [...selectedCard];
    //   mainData.push(value);
    //   setSelectedCard(mainData);
    //   handleSubmit(value);
    // }
    const getItemId = value === 'theme_selected' ? selectedTheme.id : value;
    const arrSelected = [getItemId];
    if (value !== selectedCard[0]) {
      setLoading(getItemId);
      setSelectedCard(arrSelected);
      handleSubmit(arrSelected);
    }
  };

  const handleItem = item => {
    if (item.is_free === 1 || isUserPremium()) {
      onPressSelect(item.id);
      if (item.id === 6) {
        AsyncStorage.removeItem('randomThemes');
      }
      return true;
    }
    if (!isUserPremium()) {
      setSelectedCategory(item);
      setTimeout(() => {
        setUnlockCards(true);
      });
    }
    return true;
    // onPressSelect(item.id);
  };

  const getLocalImage = id => {
    const findItem = listTheme.find(content => content.id === id);
    if (id && findItem && findItem.imgLocal) {
      return findItem.imgLocal;
    }
    return null;
  };

  const checkSelectedTheme = async item => {
    if (typeof onCustomSelectTheme === 'function') {
      if (item.id === 6) {
        const res = await handleShuffleTheme();
        const localImg = getLocalImage(res.id);
        onCustomSelectTheme({
          ...res,
          imgLocal: localImg,
        });
      } else {
        const imgLocal = getLocalImage(item.id);
        onCustomSelectTheme({
          ...item,
          imgLocal,
        });
      }
      onClose();
    } else {
      handleItem(item);
    }
  };

  function renderLogo(item, isGetSelect) {
    if (isGetSelect) {
      return (
        <View style={styles.whiteBg}>
          <View style={styles.ctnIconItemCheklist}>
            <IconChecklist width="100%" height="100%" />
          </View>
        </View>
      );
    }
    if (item.is_free === 0 && !isUserPremium()) {
      return (
        <View style={styles.ctnLock}>
          <View style={styles.ctnIcon}>
            <View style={styles.ctnIconItem}>
              <IconLockWhite color="#000" width="100%" height="100%" />
            </View>
          </View>
          <View style={styles.ctnAdsIcon}>
            <Image source={adsIcon} style={styles.iconAds} />
            <Text style={styles.txtAds}>Free</Text>
          </View>
        </View>
      );
    }
    if (!isGetSelect) {
      return <View style={styles.whiteBg} />;
    }
    return null;
  }

  function renderImageTheme(item) {
    const localImg = getLocalImage(item.id);
    if (localImg) {
      return (
        <ImageBackground source={localImg} style={styles.ctnImgItem}>
          {renderLogo(item, isDataSelected(item.id))}

          {isLoading === item.id && (
            <View style={styles.ctnLoader}>
              <LoadingIndicator />
            </View>
          )}
        </ImageBackground>
      );
    }
    return (
      <FastImage
        source={{
          uri: `${BACKEND_URL}${item.background.url}`,
        }}
        style={styles.ctnImgItem}>
        {renderLogo(item, isDataSelected(item.id))}

        {isLoading === item.id && (
          <View style={styles.ctnLoader}>
            <LoadingIndicator />
          </View>
        )}
      </FastImage>
    );
  }

  function renderListTheme() {
    return themesData.map(content => (
      <View style={styles.ctnTheme} key={content.name}>
        <View style={styles.ctnTitle}>
          <Text style={styles.txtTitle}>{content.name}</Text>
        </View>
        <FlatList
          data={content.themes}
          style={styles.ctnFlatlist}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={isLoading}
          renderItem={({item, index}) => (
            <TouchableWithoutFeedback
              key={item.id}
              onPress={() => {
                checkSelectedTheme(item);
              }}>
              <View
                style={[
                  styles.ctnCard,
                  index === 0 && styles.firstItem,
                  index === content.themes.length - 1 && styles.lastItem,
                ]}>
                <View style={styles.ctnRowCard}>
                  {renderImageTheme(item)}
                  {/* {renderRandom()} */}
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    ));
  }

  return (
    <View style={styles.themeWrapper}>
      <View style={styles.shuffleWrapper}>
        <TouchableWithoutFeedback
          onPress={() => {
            checkSelectedTheme(shuffleData);
          }}>
          <View style={[styles.ctnCard, styles.firstItem]}>
            <View style={styles.ctnRowCard}>
              <ImageBackground source={iconSuffle} style={styles.ctnImgItem}>
                {renderLogo(shuffleData, isDataSelected(shuffleData.id))}

                {isLoading === shuffleData.id && (
                  <View style={styles.ctnLoader}>
                    <LoadingIndicator />
                  </View>
                )}
              </ImageBackground>
              {/* {renderRandom()} */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderListTheme()}
      {/* <View style={[styles.ctnRowIcon]}>{renderContent()}</View> */}

      {showUnlockCardAds && (
        <ModalUnlockCategory
          visible={showUnlockCardAds}
          handleClose={() => {
            setUnlockCards(false);
          }}
          successMessage="Congrats! You have unlocked the selected Premium Theme."
          title={'Unlock\nthis Theme for free now'}
          label="Watch a Video to unlock this Theme for Free or go Premium for full access!"
          imgSource={themesBanner}
          selectedCategory={selectedTheme}
          handleUnlock={() => {
            onPressSelect('theme_selected');
          }}
        />
      )}
    </View>
  );
}

CardTheme.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  fetchListQuote: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
};

CardTheme.defaultProps = {
  userProfile: {},
};

export default connect(states, dispatcher)(CardTheme);
