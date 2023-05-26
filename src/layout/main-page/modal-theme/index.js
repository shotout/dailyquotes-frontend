import React from 'react';
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import CardTheme from '../../../components/card-theme';
import styles from './styles';
import IconClose from '../../../assets/svg/icon_close.svg';
import {isIphoneXorAbove} from '../../../shared/devices';
import {sizing} from '../../../shared/styling';
import LineGestureSlide from '../../../components/line-gesture-slide';
import {listTheme} from '../../../shared/useBackgroundQuotes';
import {getAdaptiveBannerID} from '../../../shared/static/adsId';
import {isUserPremium} from '../../../helpers/user';

export default function ModalTheme(props) {
  const {contentRef, onClose, onCustomSelectTheme, customSelected} = props;

  function renderIconClose() {
    return (
      <TouchableOpacity style={styles.btnStyle} onPress={onClose}>
        <View style={styles.btnClose}>
          <IconClose width="100%" height="100%" />
        </View>
      </TouchableOpacity>
    );
  }

  function renderHeader(dragHandler) {
    return (
      <View style={styles.rowHeaderText} {...dragHandler}>
        <Text style={styles.boldHeader}>Themes</Text>
        {renderIconClose()}
      </View>
    );
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
            {renderHeader(dragHandler)}
            <ScrollView
              style={styles.ctnRoot}
              contentContainerStyle={styles.ctnScroll}
              showsVerticalScrollIndicator={false}>
              <CardTheme
                onCustomSelectTheme={onCustomSelectTheme}
                onClose={onClose}
                listData={listTheme}
                customSelected={customSelected}
              />
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
        </View>
      )}
    </SlidingUpPanel>
  );
}
