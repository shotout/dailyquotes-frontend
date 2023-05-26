import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {BACKEND_URL} from '../../shared/static';
import Button from '../button';
import ImgGoPremium from '../../assets/svg/img_unlock_text.svg';
import IconLock from '../../assets/svg/icon_lock.svg';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import IconChecklistWhite from '../../assets/svg/checklist_white.svg';
import states from './states';
import dispatcher from './dispatcher';
import {updateCategory} from '../../shared/request';
import {handlePayment, isUserPremium} from '../../helpers/user';
import {scrollToTopQuote} from '../../store/defaultState/selector';
import ModalUnlockCategory from '../modal-unlock-ads';

const emptyImage = require('../../assets/icons/not_found.png');
const adsIcon = require('../../assets/icons/ads_icon.png');

function CardCategories({
  listData,
  userProfile,
  handleSetProfile,
  hidePopular,
  buttonLabel,
  initialSelect,
  hidePremium,
  additionalContent,
  fetchListQuote,
  isSearch,
  onCustomSelectCategory,
  customSelected,
}) {
  const [selectedCard, setSelectedCard] = useState(initialSelect);
  const [objCard, setObjCard] = useState(customSelected);
  const [showUnlockByAds, setUnlockByAds] = useState(false);
  const [selectedCatory, setSelectedCategory] = useState(null);
  useEffect(() => {
    const initialItem = selectedCard;
    if (!isUserPremium()) {
      const findGeneral = initialItem.find(item => item === 1);
      if (!findGeneral) {
        onPressSelect(1);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (initialSelect !== selectedCard && !onCustomSelectCategory) {
  //     console.log('RESET BY initialSelect:', initialSelect);
  //     setSelectedCard(initialSelect);
  //   }
  // }, [initialSelect]);

  const updateFieldCategory = async updateData => {
    try {
      const categoryArr = updateData || [];
      scrollToTopQuote();
      // const findId =
      //   updateData?.length === 1 && updateData.find(id => id === 2);
      // if (findId) {
      //   const res = await getListLiked();
      //   if (res.data?.data?.length === 0) {
      //     categoryArr.push(1);
      //   }
      // }
      const payload = {
        categories: categoryArr,
        _method: 'PATCH',
      };
      const res = await updateCategory(payload);
      const updateObj = {
        ...userProfile,
        data: {
          ...userProfile.data,
          categories: res.data.categories,
        },
      };
      handleSetProfile(updateObj);
      fetchListQuote();
    } catch (err) {
      console.log('Error select:', err);
    }
  };

  const isDataSelected = value => {
    const findItem = selectedCard.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const onPressSelect = (value, objFull) => {
    const isSelected = isDataSelected(value);
    const resObjCard = objCard || [];
    let mainData = [...selectedCard];
    let objData = [...resObjCard];
    if (isSelected) {
      mainData = selectedCard.filter(card => card !== value);
      objData = objCard.filter(card => card.id !== value);
      setSelectedCard(mainData);
    } else {
      objData.push(objFull);
      if (isUserPremium()) {
        mainData.push(value);
        setSelectedCard(mainData);
      } else {
        const filterListContent =
          value === 1 || value === 2
            ? mainData
            : mainData.filter(item => item === 1 || item === 2);
        filterListContent.push(value);
        mainData = filterListContent;
        setSelectedCard(filterListContent);
      }
    }
    setObjCard(objData);
    if (!onCustomSelectCategory) {
      updateFieldCategory(mainData);
    } else {
      onCustomSelectCategory(objData);
    }
  };

  const handleOnpress = card => {
    if (card.is_free === 1 || isUserPremium()) {
      onPressSelect(card.id, card);
    }
    if (card.is_free === 0 && !isUserPremium()) {
      setSelectedCategory(card);
      if (isDataSelected(card.id)) {
        onPressSelect(card.id, card);
      } else {
        setUnlockByAds(true);
      }
    }
  };

  function renderLogo(item, isGetSelect, isFreeGeneralCategory) {
    if (isGetSelect) {
      return (
        <View style={[styles.ctnIcon, isFreeGeneralCategory && styles.grayBg]}>
          <View style={styles.ctnIconItem}>
            {isFreeGeneralCategory ? (
              <IconChecklistWhite width="100%" height="100%" />
            ) : (
              <IconChecklist width="100%" height="100%" />
            )}
          </View>
        </View>
      );
    }
    if (item.is_free === 0 && !isUserPremium()) {
      return (
        <View style={styles.ctnPremiumIcon}>
          <View style={styles.ctnAdsIcon}>
            <Image source={adsIcon} style={styles.iconAds} />
            <Text style={styles.txtAds}>Free</Text>
          </View>
          <View
            style={[styles.ctnIcon, isFreeGeneralCategory && styles.grayBg]}>
            <View style={styles.ctnIconItem}>
              <IconLock width="100%" height="100%" />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={[styles.ctnIcon, isFreeGeneralCategory && styles.grayBg]} />
    );
  }

  function renderHeaderPopular() {
    return (
      <View style={styles.marginTop}>
        <Text style={styles.boldHeader}>Most Popular</Text>
      </View>
    );
  }

  function renderDataPopular() {
    if (listData.popular?.length > 0 && !hidePopular) {
      return (
        <View style={styles.itemWrapper}>
          {renderHeaderPopular()}
          <View style={styles.ctnRowMain}>
            {listData.popular.map((item, index) => {
              const isFreeGeneralCategory = item.id === 1 && !isUserPremium();
              return (
                <TouchableWithoutFeedback
                  key={index}
                  disabled={item.id === 1 && !isUserPremium()}
                  onPress={() => {
                    handleOnpress(item);
                  }}>
                  <View
                    style={[
                      styles.ctnCard,
                      index % 2 === 0 && styles.mgRight12,
                    ]}>
                    <View style={styles.ctnRowCard}>
                      <View
                        style={[
                          styles.ctnItemCategories,
                          (item.name || '').length > 13 && {
                            marginRight: moderateScale(50),
                          },
                        ]}>
                        <Text style={styles.txtItem} numberOfLines={2}>
                          {item.name}
                        </Text>
                        <View style={styles.lockWrapper}>
                          {renderLogo(
                            item,
                            isDataSelected(item.id),
                            isFreeGeneralCategory,
                          )}
                        </View>
                      </View>
                      <View style={styles.ctnItemRigh}>
                        <View style={styles.ctnImgItem}>
                          <FastImage
                            resizeMode="contain"
                            style={styles.imgStyle}
                            source={{uri: `${BACKEND_URL}${item.icon.url}`}}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      );
    }
    return null;
  }

  function renderAdvert(index) {
    if (hidePremium) {
      return null;
    }
    if (index === 2 && !isUserPremium()) {
      return (
        <View style={styles.shadowWrapper}>
          <View style={[styles.ctnRelative, styles.ctnShadow]}>
            <View style={styles.ctnAdvert}>
              <View style={styles.ctnImgAdv}>
                <ImgGoPremium width="100%" height="100%" />
              </View>
            </View>
            <Button
              onPress={() => {
                handlePayment('in_app_paywall');
              }}
              btnStyle={styles.btnGoPremiun}
              label="Go Premium"
            />
          </View>
          <View style={styles.ctnUlockFree}>
            <Text style={styles.txtUnlockFree}>Unlock all Categories</Text>
          </View>
        </View>
      );
    }
    return null;
  }

  function renderHeaderContent(item, index, hideTitle) {
    if (!hideTitle) {
      return (
        <>
          {renderAdvert(index)}
          <View style={styles.marginTop}>
            <Text style={styles.boldHeader}>{item.name}</Text>
          </View>
        </>
      );
    }
    return null;
  }

  function renderContent(content, altIndex, hideTitle) {
    return (
      <View style={styles.itemWrapper} key={altIndex}>
        {renderHeaderContent(content, altIndex, hideTitle)}
        <View style={styles.ctnRowMain}>
          {content.categories.map((item, index) => {
            const isFreeGeneralCategory = item.id === 1 && !isUserPremium();
            return (
              <TouchableWithoutFeedback
                key={item.id}
                disabled={isFreeGeneralCategory}
                onPress={() => {
                  handleOnpress(item);
                }}>
                <View
                  style={[
                    styles.ctnCard,
                    index % 2 === 0 && styles.mgRight12,
                    hideTitle ? styles.mgTop20 : {},
                  ]}>
                  <View style={styles.ctnRowCard}>
                    <View style={styles.ctnItemRigh}>
                      <View style={styles.ctnImgItem}>
                        <FastImage
                          style={styles.imgStyle}
                          resizeMode="contain"
                          source={{uri: `${BACKEND_URL}${item.icon.url}`}}
                        />
                      </View>
                    </View>
                    <View
                      style={[
                        styles.ctnItemCategories,
                        (item.name || '').length > 13 && {
                          marginRight: moderateScale(50),
                        },
                      ]}>
                      <Text style={styles.txtItem} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <View style={styles.lockWrapper}>
                        {renderLogo(
                          item,
                          isDataSelected(item.id),
                          isFreeGeneralCategory,
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    );
  }

  function renderEmpty() {
    return (
      <View style={styles.ctnEmpty}>
        <Image source={emptyImage} style={styles.emptyBanner} />
        <View style={styles.ctnTextDream}>
          <Text style={styles.txtDream}>
            {`No categories found for that\nsearch term.`}
          </Text>
        </View>
        <View style={styles.ctnAlt}>
          <Text style={styles.txtAlt}>
            Try one of our other categories now:
          </Text>
        </View>
      </View>
    );
  }

  function renderDataCategory() {
    if (isSearch && listData.alternative) {
      if (listData.alternative.length > 0) {
        if (listData.category.length === 0) {
          return (
            <>
              {renderEmpty()}
              {listData.alternative.map((item, index) =>
                renderContent(item, index),
              )}
            </>
          );
        }
        return listData.alternative.map((item, index) =>
          renderContent(item, index),
        );
      }
      return renderEmpty();
    }
    if (listData.category?.length > 0) {
      const parseCategory = !hidePopular
        ? listData.category.filter(item => item.id !== 1)
        : listData.category;
      return parseCategory.map((item, index) => renderContent(item, index));
    }
    return null;
  }

  function renderBasic() {
    if (listData.category?.length > 0 && !hidePopular) {
      const parseCategory = listData.category.filter(item => item.id === 1);
      return parseCategory.map((item, index) =>
        renderContent(item, index, true),
      );
    }
    return null;
  }

  return (
    <View style={styles.ctnRelative}>
      <View style={styles.ctnRoot}>
        {renderBasic()}
        {renderDataPopular()}
        {renderDataCategory()}
        {additionalContent}
      </View>
      {!isUserPremium() && (
        <Button
          btnStyle={styles.btnGoPremiun}
          onPress={() => {
            handlePayment('in_app_paywall');
          }}
          label={buttonLabel || 'Unlock all'}
        />
      )}
      {showUnlockByAds && (
        <ModalUnlockCategory
          visible={showUnlockByAds}
          handleClose={() => {
            setUnlockByAds(false);
          }}
          selectedCategory={selectedCatory}
          handleUnlock={selectedCategory => {
            onPressSelect(selectedCategory.id, selectedCategory);
          }}
        />
      )}
    </View>
  );
}

CardCategories.propTypes = {
  handleSetProfile: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  hidePopular: PropTypes.bool,
  initialSelect: PropTypes.any,
};

CardCategories.defaultProps = {
  initialSelect: [],
  userProfile: {},
  hidePopular: false,
};

export default connect(states, dispatcher)(CardCategories);
