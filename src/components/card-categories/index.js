import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
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

const emptyImage = require('../../assets/icons/not_found.png');

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
}) {
  const [selectedCard, setSelectedCard] = useState(initialSelect);

  // console.log('Check selectedCard:', selectedCard);

  useEffect(() => {
    const initialItem = selectedCard;
    if (!isUserPremium()) {
      const findGeneral = initialItem.find(item => item === 1);
      if (!findGeneral) {
        onPressSelect(1);
      }
    }
  }, []);

  useEffect(() => {
    if (initialSelect !== selectedCard) {
      setSelectedCard(initialSelect);
    }
  }, [initialSelect]);

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

  const onPressSelect = value => {
    const isSelected = isDataSelected(value);
    let mainData = [...selectedCard];
    if (isSelected) {
      mainData = selectedCard.filter(card => card !== value);
      setSelectedCard(mainData);
    } else {
      mainData.push(value);
      setSelectedCard(mainData);
    }
    updateFieldCategory(mainData);
  };

  const handleOnpress = card => {
    if (card.is_free === 1 || isUserPremium()) {
      onPressSelect(card.id);
    }
    if (card.is_free === 0 && !isUserPremium()) {
      handlePayment('in_app_paywall');
    }
  };

  function renderLogo(item, isGetSelect, isFreeGeneralCategory) {
    if (item.is_free === 0 && !isUserPremium()) {
      return (
        <View style={styles.ctnIconItem}>
          <IconLock width="100%" height="100%" />
        </View>
      );
    }
    if (isGetSelect) {
      return (
        <View style={styles.ctnIconItem}>
          {isFreeGeneralCategory ? (
            <IconChecklistWhite width="100%" height="100%" />
          ) : (
            <IconChecklist width="100%" height="100%" />
          )}
        </View>
      );
    }
    return null;
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
                        <View
                          style={[
                            styles.ctnIcon,
                            isFreeGeneralCategory && styles.grayBg,
                          ]}>
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
      // return (
      //   <FlatList
      //     data={listData.popular}
      //     numColumns={2}
      //     scrollEnabled={false}
      //     showsVerticalScrollIndicator={false}
      //     ListHeaderComponent={renderHeaderPopular()}
      //     renderItem={({item, index}) => {
      //       const isFreeGeneralCategory = item.id === 1 && !isUserPremium();
      //       return (
      //         <TouchableWithoutFeedback
      //           disabled={item.id === 1 && !isUserPremium()}
      //           onPress={() => {
      //             handleOnpress(item);
      //           }}>
      //           <View
      //             style={[styles.ctnCard, index % 2 === 0 && styles.mgRight12]}>
      //             <View style={styles.ctnRowCard}>
      //               <View
      //                 style={[
      //                   styles.ctnItemCategories,
      //                   (item.name || '').length > 13 && {
      //                     marginRight: moderateScale(50),
      //                   },
      //                 ]}>
      //                 <Text style={styles.txtItem} numberOfLines={2}>
      //                   {item.name}
      //                 </Text>
      //                 <View
      //                   style={[
      //                     styles.ctnIcon,
      //                     isFreeGeneralCategory && styles.grayBg,
      //                   ]}>
      //                   {renderLogo(
      //                     item,
      //                     isDataSelected(item.id),
      //                     isFreeGeneralCategory,
      //                   )}
      //                 </View>
      //               </View>
      //               <View style={styles.ctnItemRigh}>
      //                 <View style={styles.ctnImgItem}>
      //                   <FastImage
      //                     resizeMode="contain"
      //                     style={styles.imgStyle}
      //                     source={{uri: `${BACKEND_URL}${item.icon.url}`}}
      //                   />
      //                 </View>
      //               </View>
      //             </View>
      //           </View>
      //         </TouchableWithoutFeedback>
      //       );
      //     }}
      //     keyExtractor={item => item.id}
      //   />
      // );
    }
    return null;
  }

  function renderAdvert(index) {
    if (hidePremium) {
      return null;
    }
    if (index === 2 && !isUserPremium()) {
      return (
        <View style={styles.ctnRelative}>
          <View style={styles.ctnAdvert}>
            <Text style={styles.ctnUnlockText}>Unlock all</Text>
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
      <View style={styles.itemWrapper}>
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
                      <View
                        style={[
                          styles.ctnIcon,
                          isFreeGeneralCategory && styles.grayBg,
                        ]}>
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
    // return (
    //   <FlatList
    //     data={content.categories}
    //     numColumns={2}
    //     scrollEnabled={false}
    //     showsVerticalScrollIndicator={false}
    //     ListHeaderComponent={renderHeaderContent(content, altIndex, hideTitle)}
    //     renderItem={({item, index}) => {
    //       const isFreeGeneralCategory = item.id === 1 && !isUserPremium();
    //       return (
    //         <TouchableWithoutFeedback
    //           key={item.id}
    //           disabled={isFreeGeneralCategory}
    //           onPress={() => {
    //             handleOnpress(item);
    //           }}>
    //           <View
    //             style={[
    //               styles.ctnCard,
    //               index % 2 === 0 && styles.mgRight12,
    //               hideTitle ? styles.mgTop20 : {},
    //             ]}>
    //             <View style={styles.ctnRowCard}>
    //               <View style={styles.ctnItemRigh}>
    //                 <View style={styles.ctnImgItem}>
    //                   <FastImage
    //                     style={styles.imgStyle}
    //                     resizeMode="contain"
    //                     source={{uri: `${BACKEND_URL}${item.icon.url}`}}
    //                   />
    //                 </View>
    //               </View>
    //               <View
    //                 style={[
    //                   styles.ctnItemCategories,
    //                   (item.name || '').length > 13 && {
    //                     marginRight: moderateScale(50),
    //                   },
    //                 ]}>
    //                 <Text style={styles.txtItem} numberOfLines={2}>
    //                   {item.name}
    //                 </Text>
    //                 <View
    //                   style={[
    //                     styles.ctnIcon,
    //                     isFreeGeneralCategory && styles.grayBg,
    //                   ]}>
    //                   {renderLogo(
    //                     item,
    //                     isDataSelected(item.id),
    //                     isFreeGeneralCategory,
    //                   )}
    //                 </View>
    //               </View>
    //             </View>
    //           </View>
    //         </TouchableWithoutFeedback>
    //       );
    //     }}
    //     keyExtractor={item => item.id}
    //   />
    // );
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
      // return (
      //   <FlatList
      //     scrollEnabled={false}
      //     showsVerticalScrollIndicator={false}
      //     data={listData.alternative}
      //     ListHeaderComponent={renderEmpty()}
      //     renderItem={({item, index}) => renderContent(item, index)}
      //     keyExtractor={item => item.id}
      //   />
      // );
    }
    if (listData.category?.length > 0) {
      const parseCategory = !hidePopular
        ? listData.category.filter(item => item.id !== 1)
        : listData.category;
      return parseCategory.map((item, index) => renderContent(item, index));
      // return (
      //   <FlatList
      //     scrollEnabled={false}
      //     showsVerticalScrollIndicator={false}
      //     data={parseCategory}
      //     renderItem={({item, index}) => renderContent(item, index)}
      //     keyExtractor={item => item.id}
      //   />
      // );
    }
    return null;
  }

  function renderBasic() {
    if (listData.category?.length > 0 && !hidePopular) {
      const parseCategory = listData.category.filter(item => item.id === 1);
      return parseCategory.map((item, index) =>
        renderContent(item, index, true),
      );
      // return (
      //   <FlatList
      //     showsVerticalScrollIndicator={false}
      //     data={parseCategory}
      //     scrollEnabled={false}
      //     renderItem={({item, index}) => renderContent(item, index, true)}
      //     keyExtractor={item => item.id}
      //   />
      // );
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
