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
import IconLockWhite from '../../assets/svg/icon_lock_color_white.svg';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import {selectTheme} from '../../shared/request';
import states from './states';
import dispatcher from './dispatcher';
import {handlePayment, isUserPremium} from '../../helpers/user';
import LoadingIndicator from '../loading-indicator';
import {themesData} from '../../shared/static/themes';
import {listTheme} from '../../shared/useBackgroundQuotes';

const iconSuffle = require('../../assets/icons/random_theme.png');

function CardTheme({listData, userProfile, handleSetProfile, onClose}) {
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

  useEffect(() => {
    if (userProfile.data.themes?.length) {
      const listTheme = userProfile.data.themes.map(item => item.id);
      setSelectedCard(listTheme);
    }
  }, [userProfile]);

  const isDataSelected = value => {
    const findItem = selectedCard.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const handleSubmit = async item => {
    console.log('Check submit item:', item);
    try {
      const objData =
        item[0] === 6
          ? shuffleData
          : listData.find(content => content.id === item[0]);
      console.log('Check obj:', objData);
      selectTheme({
        _method: 'PATCH',
        themes: item,
      });
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
    const arrSelected = [value];
    if (value !== selectedCard[0]) {
      setLoading(value);
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
      handlePayment('in_app_paywall');
    }
    return true;
    // onPressSelect(item.id);
  };

  const getLocalImage = id => {
    const findItem = listTheme.find(content => content.id === id);
    if (id && findItem.imgLocal) {
      return findItem.imgLocal;
    }
    return null;
  };

  function renderLogo(item, isGetSelect) {
    if (item.is_free === 0 && !isUserPremium()) {
      return (
        <View style={styles.ctnIcon}>
          <View style={styles.ctnIconItem}>
            <IconLockWhite width="100%" height="100%" />
          </View>
        </View>
      );
    }
    if (!isGetSelect) {
      return <View style={styles.whiteBg} />;
    }
    if (isGetSelect) {
      return (
        <View style={styles.whiteBg}>
          <View style={styles.ctnIconItemCheklist}>
            <IconChecklist width="100%" height="100%" />
          </View>
        </View>
      );
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
                handleItem(item);
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
            handleItem(shuffleData);
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
