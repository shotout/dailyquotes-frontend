import React, {createRef, useState} from 'react';
import {
  Animated,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import styles from './styles';
import IconClose from '../../../assets/svg/icon_close.svg';
import ListContent from '../../../components/list-content';
import IconStart from '../../../assets/svg/icon_start.svg';
import IconUser from '../../../assets/svg/icon_user.svg';
import IconBell from '../../../assets/svg/icon_bell.svg';
import IconStartWhite from '../../../assets/svg/icon_star_white.svg';
import IconBookMark from '../../../assets/svg/icon_bookmark_collection.svg';
import IconHourglass from '../../../assets/svg/icon_hourglass.svg';
import IconLoveBlack from '../../../assets/svg/love_black.svg';
import IconTwitterBlack from '../../../assets/svg/icon_twitter_black.svg';
import IconFbBlack from '../../../assets/svg/icon_fb_black.svg';
import IconIgBlack from '../../../assets/svg/icon_ig_outline_black.svg';
import WidgetIcon from '../../../assets/svg/WidgetIcon.svg';
import WidgetLockScreenIcon from '../../../assets/svg/lock_screen_widget_icon.svg';
import Subscription from '../../setting/content-subscription';
import Reminder from '../../setting/reminder';
import states from './states';
import ModalCollection from '../modal-collection';
import QuoteCollections from '../../your-quotes/collection';
import PastQuotes from '../../your-quotes/past-quotes';
import LikeQuotes from '../../your-quotes/liked-quotes';
import AccountPreference from '../../setting/account-preference';
import {
  handleBasicPaywall,
  handlePayment,
  isUserPremium,
  openPrivacyPolicy,
  openTermsofUse,
} from '../../../helpers/user';
import {sizing} from '../../../shared/styling';
import LineGestureSlide from '../../../components/line-gesture-slide';
import HomeWidget from '../../setting/home-widget';
import LockScreenWidget from '../../setting/lock-screen-widget ';
import {getAdaptiveBannerID} from '../../../shared/static/adsId';

function ModalSetting({contentRef, onClose, collections}) {
  const [showModalSubscribe, setShowModalSubscribe] = useState(false);
  const [showModalAccount, setShowModalAccount] = useState(false);
  const [showModalReminder, setShowModalReminder] = useState(false);
  const [showModalCollection, setShowModalCollection] = useState(false);
  const [showModalQuotes, setShowModalQuotes] = useState(false);
  const [showModalLiked, setShowModalLiked] = useState(false);
  const [showModalNoCollection, setShowModalNoCollection] = useState(false);
  const [showModalHomeWidget, setModalHomeWidget] = useState(false);
  const [showModalLockScreenWidget, setModalLockScreenWidget] = useState(false);

  const renderCollection = () => {
    if (collections.length > 0) {
      setShowModalCollection(true);
    } else {
      setShowModalNoCollection(true);
    }
    // setShowModalNoCollection(true);
  };

  function renderIconClose() {
    return (
      <View style={styles.btnStyle}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.btnClose}>
            <IconClose width="100%" height="100%" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderSubscription() {
    if (isUserPremium()) {
      return (
        <ListContent
          title="Manage subscription"
          icon={<IconStart width="100%" height="100%" />}
          onPress={() => {
            setShowModalSubscribe(true);
          }}
        />
      );
    }
    return (
      <View style={styles.ctnBgWrap}>
        <TouchableWithoutFeedback onPress={handleBasicPaywall}>
          <View style={styles.ctnRow}>
            <View style={styles.ctnRowLeft}>
              <Text style={styles.titleStyle}>Go Premium</Text>
              <Text style={styles.subTitleStyle}>
                Access unlimited categories, quotes, themes and remove ads!
              </Text>
            </View>
            <View style={styles.ctnIcon}>
              <IconStartWhite width="100%" height="100%" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function renderSetting() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.listCardWrap}>
          {/* {renderSubscription()} */}
          <ListContent
            title="Account & preferences"
            icon={<IconUser width="100%" height="100%" />}
            onPress={() => {
              setShowModalAccount(true);
            }}
          />
          <ListContent
            title="Edit reminders"
            icon={<IconBell width="100%" height="100%" />}
            onPress={() => {
              setShowModalReminder(true);
            }}
          />
          {/* {Platform.OS === 'ios' && (
            <ListContent
              title="Home Screen Widgets"
              icon={<WidgetIcon width="90%" height="90%" />}
              onPress={() => {
                setModalHomeWidget(true);
              }}
            />
          )}
          {Platform.OS === 'ios' && (
            <ListContent
              title="Lock Screen Widgets"
              icon={<WidgetLockScreenIcon width="90%" height="90%" />}
              onPress={() => {
                setModalLockScreenWidget(true);
              }}
            />
          )} */}
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  function renderQuote() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.titleWrap, styles.mg20]}>
          <Text style={styles.ctnTittle}>Your quotes</Text>
        </View>
        <View style={styles.listCardWrap}>
          <ListContent
            title="Collections"
            icon={<IconBookMark width="100%" height="100%" />}
            onPress={() => {
              renderCollection();
            }}
          />
          <ListContent
            title="Past quotes"
            icon={<IconHourglass width="100%" height="100%" />}
            onPress={() => {
              setShowModalQuotes(true);
            }}
          />
          <ListContent
            title="Liked quotes"
            icon={<IconLoveBlack width="100%" height="100%" />}
            onPress={() => {
              // refLikedQuotes.current.show();
              setShowModalLiked(true);
            }}
          />
        </View>
        <View style={styles.separator} />
      </View>
    );
  }

  function renderFollow() {
    return (
      <View style={styles.wrapper}>
        <View style={[styles.titleWrap, styles.mg20]}>
          <Text style={styles.ctnTittle}>Follow us</Text>
        </View>
        <View style={styles.listCardWrap}>
          <ListContent
            title="Instagram"
            icon={<IconIgBlack width="100%" height="100%" />}
            onPress={() => {
              Linking.openURL('https://www.instagram.com/mooti.app');
            }}
          />
          <ListContent
            title="Twitter"
            icon={<IconTwitterBlack width="100%" height="100%" />}
            onPress={() => {
              Linking.openURL('https://twitter.com/MootiApp');
            }}
          />
          <ListContent
            title="Facebook"
            icon={<IconFbBlack width="100%" height="100%" />}
            onPress={() => {
              Linking.openURL('https://www.facebook.com/MootiApp');
            }}
          />
          <View style={styles.ctnFooter}>
            {/* <ListContent title="Imprint" styleList={styles.styleList} /> */}
            <ListContent
              title="Privacy Policy"
              styleList={styles.styleList}
              onPress={openPrivacyPolicy}
            />
            <ListContent
              title="Terms & Conditions"
              styleList={styles.styleList}
              onPress={openTermsofUse}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={[
            styles.ctnScroll,
            !isUserPremium() && styles.ctnScrollFreeUser,
          ]}>
          <View style={styles.titleWrap}>
            <Text style={styles.ctnTittle}>Settings</Text>
          </View>
          {renderSetting()}
          {renderQuote()}
          {renderFollow()}
        </ScrollView>

        {!isUserPremium() && (
          <View style={styles.ctnBanner}>
            <BannerAd
              unitId={getAdaptiveBannerID()}
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </View>
        )}
      </View>
    );
  }

  function renderModalSubscription() {
    if (showModalSubscribe === true) {
      return (
        <Subscription
          isVisible={showModalSubscribe}
          onClose={() => {
            setShowModalSubscribe(false);
          }}
        />
      );
    }
    return null;
  }

  function renderModalAccount() {
    if (showModalAccount === true) {
      return (
        <AccountPreference
          isVisible={showModalAccount}
          onClose={() => {
            setShowModalAccount(false);
          }}
        />
      );
    }
    return null;
  }

  function renderModalReminder() {
    if (showModalReminder === true) {
      return (
        <Reminder
          isVisible={showModalReminder}
          onClose={() => {
            setShowModalReminder(false);
          }}
        />
      );
    }
    return null;
  }

  function renderModalCollection() {
    if (showModalCollection === true) {
      return (
        <QuoteCollections
          isVisible={showModalCollection}
          onClose={() => {
            setShowModalCollection(false);
          }}
        />
      );
    }
    return null;
  }

  function renderModalNoCollection() {
    if (showModalNoCollection === true) {
      return (
        <ModalCollection
          isVisible={showModalNoCollection}
          onClose={() => {
            setShowModalNoCollection(false);
          }}
          onFinish={() => {
            setShowModalNoCollection(false);
            setTimeout(() => {
              setShowModalCollection(true);
            }, 200);
          }}
        />
      );
    }
    return null;
  }

  function renderModalPastQuotes() {
    if (showModalQuotes === true) {
      return (
        <PastQuotes
          isVisible={showModalQuotes}
          onClose={() => {
            setShowModalQuotes(false);
          }}
        />
      );
    }
    return null;
  }

  return (
    <SlidingUpPanel
      ref={contentRef}
      animatedValue={new Animated.Value(0)}
      height={sizing.getDimensionHeight(1)}
      snappingPoints={[0, 0]}
      draggableRange={{
        top: sizing.getDimensionHeight(1),
        bottom: 0,
      }}>
      {dragHandler => (
        <View style={styles.ctnRoot}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.ctnClose} />
          </TouchableWithoutFeedback>
          <View style={styles.ctnContent}>
            <LineGestureSlide dragHandler={dragHandler} />
            {renderContent()}
            {renderIconClose()}
            {renderModalSubscription()}
            {renderModalAccount()}
            {renderModalReminder()}
            {renderModalCollection()}
            {renderModalNoCollection()}
            {renderModalPastQuotes()}
            <LikeQuotes
              isVisible={showModalLiked}
              // contentRef={c => (refLikedQuotes.current = c)}
              onClose={() => {
                // refLikedQuotes.current.hide();
                setShowModalLiked(false);
              }}
            />
            <HomeWidget
              isVisible={showModalHomeWidget}
              onClose={() => {
                setModalHomeWidget(false);
              }}
            />
            <LockScreenWidget
              isVisible={showModalLockScreenWidget}
              onClose={() => {
                setModalLockScreenWidget(false);
              }}
            />
          </View>
        </View>
      )}
    </SlidingUpPanel>
  );
}

ModalSetting.propTypes = {
  userProfile: PropTypes.object.isRequired,
  collections: PropTypes.array.isRequired,
};

export default connect(states)(ModalSetting);
