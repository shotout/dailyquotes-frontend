import React, {createRef, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import {
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import moment from 'moment';
import RNFS from 'react-native-fs';

import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import ButtonIcon from '../../components/button-icon';
import ModalCategories from '../../layout/main-page/modal-categories';
import ModalShare from '../../layout/main-page/modal-share';
import ModalTheme from '../../layout/main-page/modal-theme';
import {sizing} from '../../shared/styling';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';
import IconCategories from '../../assets/svg/icon_categories.svg';
import IconShare from '../../assets/svg/icon_share.svg';
import IconSetting from '../../assets/svg/icon_setting.svg';
import ContentTutorial from '../../layout/main-page/content-tutorial';
import ModalSetting from '../../layout/main-page/modal-setting';
import {
  addPastQuotes,
  dislikeQuotes,
  getRatingStatus,
  getSetting,
} from '../../shared/request';
import IconLove from '../../assets/svg/icon_love_tap.svg';
import IconLike from '../../assets/svg/icon_like.svg';
import ThemeIcon from '../../assets/svg/theme_icon.svg';
import Crown from '../../assets/svg/crown.svg';
import QuotesContent from '../../components/quotes-content-fast-image';
import {handleModalFirstPremium} from '../../shared/globalContent';
import {
  getFutureDate,
  handlePayment,
  isPremiumToday,
  isUserPremium,
} from '../../helpers/user';
import ContentSubscription from '../../layout/setting/content-subscription';
import {
  changeQuoteLikeStatus,
  handleEndQuote,
  setNewQuoteData,
  setQuoteRef,
} from '../../store/defaultState/actions';
import ModalRating from '../../components/modal-rating';
import {useBackgroundQuotes} from '../../shared/useBackgroundQuotes';
import useLocalNotif from '../../shared/useLocalNotif';
import {handleWidgetQuote} from '../../helpers/widgetHelper';
import {changeStandardWidget} from '../../store/widgetState/actions';
import {
  getAdaptiveBannerID,
  getRewardedOutOfQuotesID,
} from '../../shared/static/adsId';
import {
  scrollToFifthQuote,
  scrollToIndexQuote,
} from '../../store/defaultState/selector';
import ModalCountDown from '../../components/modal-countdown';
import PageCountDown from '../../layout/main-page/page-countdown';

const UnionImage = require('../../assets/images/union.png');

const adUnitId = getRewardedOutOfQuotesID();

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function MainPage({
  defaultData,
  quotes,
  userProfile,
  haveBeenAskRating,
  changeAskRatingParameter,
  route,
  todayAdsLimit,
  restPassLength,
  listBasicQuote,
}) {
  const isFromOnboarding = route.params?.isFromOnboarding;
  const paywallObj = route.params?.paywallObj;
  const appOpenAd = route.params?.appOpenAd;
  const interstitial = route.params?.interstitial;
  const initialIndexContent = isUserPremium()
    ? restPassLength
    : (restPassLength || 0) + 1;
  const [showModalSubscribe, setShowModalSubscribe] = useState(false);
  const [activeSlide, setActiveSlide] = useState(initialIndexContent);
  const [currentSlide, setCurrentSlide] = useState(initialIndexContent);
  const [isEnableFreePremium, setEnableFreePremium] = useState(false);
  const [showModalLike, setShowModalLike] = useState(false);
  const [showTutorial, setShowTutorial] = useState(isFromOnboarding || false);
  const [captureUri, setCaptureUri] = useState(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isPremiumBefore, setPremiumBefore] = useState(isUserPremium());
  const [modalRatingVisible, setModalRating] = useState(false);
  const [quoteLikeStatus, setQuoteLikeStatus] = useState(false);
  const [themeUser] = useBackgroundQuotes(userProfile.data.themes[0]);
  const [scheduleTime] = useLocalNotif(userProfile);

  const [showModalCountdown, setModalCountdown] = useState(false);
  const [finishInitialLoader, setInitialLoader] = useState(false);

  const captureRef = useRef();
  const doubleTapRef = createRef();
  const refCategory = createRef();
  const refThemes = createRef();
  const refShare = createRef();
  const refSetting = createRef();

  const handleShowPopupShare = () => {
    setShowSharePopup(true);
    setTimeout(() => {
      setShowSharePopup(false);
    }, 10000);
  };

  const handleRatingModal = async () => {
    // await AsyncStorage.removeItem('openAppsCounter');
    // await AsyncStorage.removeItem('skipRatingCount');
    const openAppsCounter = await AsyncStorage.getItem('openAppsCounter');
    const skipCounter = await AsyncStorage.getItem('skipRatingCount');
    if (openAppsCounter) {
      const currentTotalOpenApps = Number(openAppsCounter);
      const skipCounterToNumber = skipCounter ? Number(skipCounter) : 0;
      const currentDate = moment().format('YYYY-MM-DD');
      if (currentTotalOpenApps % 3 === 0) {
        if (
          !skipCounterToNumber ||
          skipCounterToNumber < 3 ||
          (skipCounter >= 3 &&
            currentDate === getFutureDate(haveBeenAskRating, 12))
        ) {
          setModalRating(true);
          if (
            skipCounter >= 3 &&
            currentDate === getFutureDate(new Date(), 12)
          ) {
            await AsyncStorage.removeItem('skipRatingCount');
          }
        }
      }
      const counterToString = (currentTotalOpenApps + 1).toString();
      await AsyncStorage.setItem('openAppsCounter', counterToString);
    } else {
      await AsyncStorage.setItem('openAppsCounter', '2');
    }
  };

  const handleRatingStatus = async () => {
    const res = await getRatingStatus();
    if (res.data === false) {
      handleRatingModal();
    }
  };

  const handleShowPaywall = async () => {
    const res = await getSetting();

    if (!isUserPremium()) {
      handleShowPopupShare();
    }
    setEnableFreePremium(res.data.value !== 'true');
    if (res.data.value === 'true' && !isUserPremium() && !isFromOnboarding) {
      // Paywall open apps
      if (paywallObj) {
        handlePayment(paywallObj?.placement);
      } else {
        handlePayment('offer_no_purchase_after_onboarding_paywall');
      }
    } else {
      handleRatingStatus();
    }
  };

  const handleWidgetData = async activeQuote => {
    if (Platform.OS === 'ios') {
      handleWidgetQuote(themeUser, activeQuote);
    }
  };

  const handleShowInterstialAds = (index, activeQuote) => {
    if (activeQuote?.item_type === 'countdown_page' && index !== 0) {
      rewarded.load();
      setModalCountdown(true);
    }

    const showInterstialAds = () => {
      interstitial.load();
      if (interstitial.loaded) {
        interstitial.show();
      }
    };
    switch (index) {
      case 0:
        if (!isPremiumToday()) {
          if (activeQuote?.item_type === 'countdown_page') {
            rewarded.load();
            setModalCountdown(true);
          }
        }
        break;
      case 1:
        break;
      case 2:
        showInterstialAds();
        break;
      case 3:
        break;
      case 4:
        if (!isPremiumToday()) {
          setModalCountdown(true);
        }
        break;
      case 5:
        showInterstialAds();
        break;
      case 6:
        break;
      case 7:
        if (!isPremiumToday()) {
          setModalCountdown(true);
        }
        break;
      case 8:
        break;
      case 9:
        showInterstialAds();
        break;
      case 10:
        if (!isPremiumToday()) {
          setModalCountdown(true);
        }
        break;
      case 11:
        break;
      case 12:
        showInterstialAds();
        break;
      case 13:
        if (!isPremiumToday()) {
          setModalCountdown(true);
        }
        break;
      case 14:
        break;
      case 15:
        showInterstialAds();
        break;
      case 16:
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (themeUser.id !== 6) {
      changeStandardWidget(themeUser);
      const activeQuote = getActiveQuote();
      if (activeQuote) {
        handleWidgetData(activeQuote);
      }
    }
  }, [themeUser]);

  useEffect(() => {
    // refThemes.current.show();
    // setSubcription({
    //   subscription_type: 1,
    // });

    const checkTutorial = async () => {
      const isFinishTutorial = await AsyncStorage.getItem('isFinishTutorial');
      if (isFinishTutorial !== 'yes') {
        setShowTutorial(true);
      }
    };
    checkTutorial();

    setTimeout(() => {
      const activeQuote = getActiveQuote();
      if (activeQuote) {
        handleWidgetData(activeQuote);
      }
    });
    // setSubcription({
    //   subscription_type: 4,
    // });
    const backAction = () => {
      console.log('Back press');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    // Handle interstial reward quote ads

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('LOAD ADS FROM MAIN PAGE REWARD');
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );
    rewarded.load();

    // setTimeout(() => {
    //   scrollToFifthQuote();
    // }, 500);

    const listenerIAPAds = appOpenAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInitialLoader(true);
      },
    );
    setTimeout(() => {
      if (!appOpenAd.loaded) {
        handleShowPaywall();
      }
    }, 1000);

    return () => {
      backHandler.remove();
      unsubscribeLoaded();
      unsubscribeEarned();
      listenerIAPAds();
    };
  }, []);

  useEffect(() => {
    if (finishInitialLoader) {
      handleShowPaywall();
    }
  }, [finishInitialLoader]);

  useEffect(() => {
    if (isFromOnboarding) {
      if (!showTutorial) {
        setTimeout(() => {
          scrollToIndexQuote(restPassLength + 1);
        }, 500);
      }
    }
  }, [showTutorial]);

  useEffect(() => {
    if (!isPremiumBefore && isUserPremium()) {
      setPremiumBefore(true);
      setShowModalSubscribe(true);
    }
  }, [userProfile, isPremiumBefore]);

  useEffect(() => {
    setTimeout(() => {
      rewarded.load();
    }, 2000);
  }, [todayAdsLimit]);

  useEffect(() => {
    const handleAddPastQuotes = async currentSlideId => {
      try {
        await addPastQuotes(quotes.listData[currentSlideId].id);
      } catch (err) {
        console.log('Error add past quotes:', err);
      }
    };
    const activeQuote = getActiveQuote();
    if (activeSlide > currentSlide) {
      setCurrentSlide(activeSlide);
      handleAddPastQuotes(currentSlide);
      if (!showSharePopup && !isUserPremium()) {
        handleShowPopupShare();
      }
    }
    let isLiked = false;
    if (activeQuote) {
      if (!activeQuote.like) {
        isLiked = false;
      }
      if (activeQuote.like) {
        if (activeQuote.like?.type) {
          if (activeQuote.like?.type === '1' || activeQuote.like?.type === 1) {
            isLiked = true;
          }
        }
      }
    }

    setQuoteLikeStatus(isLiked);
    if (activeSlide !== currentSlide) {
      if (activeQuote) {
        handleWidgetData(activeQuote);
      }
      if (!interstitial.loaded) {
        interstitial.load();
      }
      if (!isUserPremium()) {
        handleShowInterstialAds(activeSlide, activeQuote);
      }
    }
  }, [activeSlide]);

  const handleScreenshot = () => {
    captureRef.current.capture().then(uri => {
      // setCaptureUri(`data:image/png;base64,${uri}`);
      const uriArray = uri.split('/');
      const nameToChange = uriArray[uriArray.length - 1];
      const renamedURI = uri.replace(
        nameToChange,
        `Mooti - ${(quotes.listData[activeSlide].title || '').substring(
          0,
          10,
        )}.png`,
      );
      RNFS.copyFile(uri, renamedURI)
        .then(async () => {
          console.log('Check basic uri:', uri);
          // await CameraRoll.save(renamedURI, {album: 'mooty', type: 'photo'});
          setCaptureUri(renamedURI);
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  const handleEndReach = () => {
    if (!isPremiumToday() && listBasicQuote?.length > 5) {
      const listOverallQuote = [...quotes.listData, ...listBasicQuote];
      listOverallQuote.push({item_type: 'countdown_page'});
      setNewQuoteData(listOverallQuote);
    }
  };

  const setFinishTutorial = async () => {
    await AsyncStorage.setItem('isFinishTutorial', 'yes');
  };

  const onMomentoumScrollEnd = e => {
    const height = sizing.getDimensionHeight(1);
    const pageNumber = Math.min(
      Math.max(Math.floor(e.nativeEvent.contentOffset.y / height + 0.5) + 1, 0),
      quotes.listData?.length || 0,
    );
    setActiveSlide(pageNumber - 1);
  };

  const handleGesture = evt => {
    const {nativeEvent} = evt;
    if (nativeEvent.velocityX < -614) {
      refThemes.current.show();
    }
  };

  const handleShare = () => {
    refShare.current.show();
    handleScreenshot();
  };

  const handleIdQuoteActive = () => {
    if (quotes.listData.length > 0 && quotes.listData[activeSlide]) {
      return quotes.listData[activeSlide].id;
    }
    return null;
  };

  const getActiveQuote = () => {
    if (quotes.listData.length > 0 && quotes.listData[activeSlide]) {
      return quotes.listData[activeSlide];
    }
    return null;
  };

  const handleQuoteActive = () => {
    if (quotes.listData.length > 0) {
      return quotes.listData[activeSlide]?.title;
    }
    return null;
  };

  const handleLike = async () => {
    try {
      setShowModalLike(true);
      setQuoteLikeStatus(!quoteLikeStatus);
      setTimeout(() => {
        setShowModalLike(false);
      }, 500);
      const activeQuote = getActiveQuote();
      let isLiked = false;
      if (activeQuote) {
        if (!activeQuote.like) {
          isLiked = false;
        }
        if (activeQuote.like) {
          if (activeQuote.like?.type) {
            if (
              activeQuote.like?.type === '1' ||
              activeQuote.like?.type === 1
            ) {
              isLiked = true;
            }
          }
        }
      }
      const payload = {
        type: isLiked ? '2' : '1',
      };
      await dislikeQuotes(payload, activeQuote.id);
      changeQuoteLikeStatus(activeQuote.id);
    } catch (err) {
      console.log('Error liked:', err);
    }
  };

  const onDoubleTap = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      handleLike();
    }
  };

  function renderSharePopup() {
    if (showSharePopup && !isUserPremium()) {
      return (
        <View source={UnionImage} style={styles.ctnPopupShare}>
          <ImageBackground source={UnionImage} style={styles.ctnUnion}>
            <Text style={styles.txtPopupMedium}>Share 3 quotes to get</Text>
            <Text style={styles.txtPopupBold}>
              {`1 month premium for\nfree!`}
            </Text>
          </ImageBackground>
        </View>
      );
    }
    return null;
  }

  function renderButton() {
    if (getActiveQuote()?.item_type === 'countdown_page') {
      return null;
    }
    const bgStyle = {
      backgroundColor:
        themeUser.id === 4 || themeUser.id === 2
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.7)',
    };
    return (
      <View style={[styles.btnWrapper, !isUserPremium() && styles.ctnPdAds]}>
        <View style={styles.subBottomWrapper}>
          <TouchableWithoutFeedback onPress={handleShare}>
            <View style={[styles.ctnRounded, bgStyle]}>
              {renderSharePopup()}
              <IconShare width="90%" height="90%" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleLike}>
            <View style={[styles.ctnRounded, bgStyle]}>
              {quoteLikeStatus ? (
                <IconLove width="80%" height="80%" />
              ) : (
                <IconLike width="80%" height="80%" />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.ctnRow}>
          <View style={styles.rowLef}>
            <ButtonIcon
              source={<IconCategories width="100%" height="100%" />}
              ctnIcon={styles.ctnIconCategories}
              label="Categories"
              btnStyle={styles.btnCategories}
              txtStyle={styles.txtCategory}
              onPress={() => {
                refCategory.current.show();
              }}
            />
          </View>
          <View style={styles.rowRight}>
            <View style={styles.ctnShare}>
              <ButtonIcon
                source={<ThemeIcon width="100%" height="100%" />}
                btnStyle={styles.btnRight}
                onPress={() => {
                  refThemes.current.show();
                }}
              />
            </View>
            <ButtonIcon
              source={<IconSetting width="100%" height="100%" />}
              btnStyle={[styles.btnRight, styles.mgLeft]}
              onPress={() => {
                refSetting.current.show();
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderFreeBadge() {
    if (
      showTutorial ||
      isUserPremium() ||
      getActiveQuote()?.item_type === 'countdown_page'
    ) {
      return null;
    }
    return (
      <TouchableOpacity
        style={styles.ctnFreeBadge}
        onPress={() => {
          handlePayment('in_app_paywall');
        }}>
        <View style={styles.ctnIconCrown}>
          <Crown width="100%" height="100%" />
        </View>
        <Text style={styles.txtFreeBadge}>Go Premium!</Text>
      </TouchableOpacity>
    );
  }

  function renderWaterMark() {
    if (isUserPremium()) {
      return null;
    }
    return (
      <View style={styles.ctnWatermark}>
        <Text style={styles.txtWatermark}>Mooti App</Text>
      </View>
    );
  }

  function renderContent(item, index) {
    const getImageContent = themeUser.imgLocal;
    if (item.item_type === 'countdown_page') {
      return <PageCountDown />;
    }
    return (
      <QuotesContent
        item={item}
        themeUser={themeUser}
        source={getImageContent}
        // source={require(themeUser.urlLocal)}
      />
    );
  }

  function renderFlatlistContent() {
    return (
      <PanGestureHandler
        onGestureEvent={handleGesture}
        activeOffsetX={[-40, 40]}>
        <TapGestureHandler
          ref={doubleTapRef}
          onHandlerStateChange={onDoubleTap}
          numberOfTaps={2}>
          <FlatList
            ref={setQuoteRef}
            style={styles.ctnRoot}
            initialScrollIndex={restPassLength + 1}
            getItemLayout={(data, index) => ({
              length: sizing.getDimensionHeight(1),
              offset: sizing.getDimensionHeight(1) * index,
              index,
            })}
            onScrollToIndexFailed={() => {
              console.log('FAILED SCROLL TO INDEX', restPassLength.length);
            }}
            data={quotes?.listData || []}
            extraData={quotes?.listData || []}
            pagingEnabled
            onMomentumScrollEnd={onMomentoumScrollEnd}
            scrollsToTop={false}
            showsVerticalScrollIndicator={false}
            // onEndReached={handleEndReach}
            onEndReachedThreshold={0.9}
            renderItem={({item, index}) => renderContent(item, index)}
            keyExtractor={(item, index) => `${item?.id || ''} ${index}`}
          />
        </TapGestureHandler>
      </PanGestureHandler>
    );
  }

  function renderScreenshot() {
    if (quotes.listData?.length > 0) {
      return (
        <ViewShot
          style={styles.ctnViewShot}
          ref={captureRef}
          options={{
            fileName: `Mooti${Date.now()}`,
            format: 'png',
            quality: 1.0,
          }}>
          {renderContent(quotes.listData[activeSlide], activeSlide)}
          {renderWaterMark()}
        </ViewShot>
      );
    }
    return null;
  }

  function renderMainContent() {
    if (showTutorial) {
      return (
        <ContentTutorial
          onPressFinish={() => {
            setShowTutorial(false);
            setFinishTutorial();
            if (!isUserPremium() && isEnableFreePremium) {
              handleModalFirstPremium(true);
            }
          }}
        />
      );
    }
    return (
      <View style={styles.ctnRoot}>
        {renderScreenshot()}
        {renderFlatlistContent()}
        {renderButton()}
        {!isUserPremium() && getActiveQuote()?.item_type !== 'countdown_page' && (
          <View style={styles.ctnBannerAds}>
            <BannerAd
              unitId={getAdaptiveBannerID()}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      </View>
    );
  }

  function renderModalLike() {
    if (showModalLike === true) {
      return (
        <Modal
          animationType="fade"
          visible={showModalLike}
          transparent
          onDismiss={() => {
            setShowModalLike(false);
          }}>
          <View style={styles.ctnLike}>
            <View style={styles.iconLikeWrap}>
              {quoteLikeStatus ? (
                <IconLove width="100%" height="100%" />
              ) : (
                <IconLike width="100%" height="100%" />
              )}
            </View>
          </View>
        </Modal>
      );
    }
    return null;
  }

  const isDarkTheme = userProfile.data?.themes[0]?.id === 4;

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? '#000' : '#fff'}
      />
      <View style={styles.ctnRoot}>
        {renderMainContent()}
        {renderFreeBadge()}
        <ModalCategories
          refPanel={refCategory}
          contentRef={c => {
            if (c) {
              refCategory.current = {
                ...c,
              };
            }
          }}
          onClose={() => {
            refCategory.current.hide();
          }}
        />
        <ModalTheme
          contentRef={c => {
            if (c) {
              refThemes.current = {
                ...c,
              };
            }
          }}
          onClose={() => {
            refThemes.current.hide();
          }}
          listData={defaultData.themes}
        />
        <ModalShare
          contentRef={c => {
            if (c) {
              refShare.current = {
                ...c,
              };
            }
          }}
          onClose={() => {
            refShare.current.hide();
          }}
          captureUri={captureUri}
          onPremium={() => {
            refShare.current.hide();
          }}
          idQuote={handleIdQuoteActive()} // mengambil data id active
          quoteText={handleQuoteActive()} // mengambil data title active
        />

        <ContentSubscription
          isVisible={showModalSubscribe}
          onClose={() => {
            setShowModalSubscribe(false);
          }}
        />
        <ModalSetting
          contentRef={c => {
            if (c) {
              refSetting.current = {
                ...c,
              };
            }
          }}
          onClose={() => {
            refSetting.current.hide();
          }}
        />
        {renderModalLike()}
        <ModalRating
          visible={modalRatingVisible}
          handleClose={() => {
            setModalRating(false);
            changeAskRatingParameter();
          }}
        />
        <ModalCountDown
          visible={showModalCountdown}
          handleClose={() => {
            setModalCountdown(false);
          }}
        />
      </View>
    </>
  );
}

MainPage.propTypes = {
  defaultData: PropTypes.object,
  quotes: PropTypes.object,
  userProfile: PropTypes.object,
};

MainPage.defaultProps = {
  userProfile: {},
  defaultData: {
    categories: {},
    themes: [],
  },
  quotes: {
    listData: [],
    currentPage: 1,
    isLoading: false,
    totalQuotes: null,
  },
};

export default connect(states, dispatcher)(MainPage);
