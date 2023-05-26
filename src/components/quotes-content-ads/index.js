import React from 'react';
import {Image, ImageBackground, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {createAnimatableComponent} from 'react-native-animatable';
import styles from './styles';
import QuotesIcon from '../../assets/icons/quotes_icon.svg';
import {colors} from '../../shared/styling';
import {isUserPremium} from '../../helpers/user';
import {getAdaptiveBannerID} from '../../shared/static/adsId';

const arrowBottom = require('../../assets/icons/arrow-bottom.png');

const AnimatableView = createAnimatableComponent(View);

export default function QuotesContentAds({source, isActive}) {
  return (
    <ImageBackground source={source} style={styles.ctnBackgroundImage}>
      <View style={styles.quotesWrapper}>
        <View style={styles.ctnAds}>
          <BannerAd
            unitId={getAdaptiveBannerID()}
            size={BannerAdSize.MEDIUM_RECTANGLE}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </View>
        {isActive && (
          <AnimatableView
            animation="bounceIn"
            delay={500}
            duration={1300}
            style={styles.ctnSwipe}>
            <Text style={styles.txtSwipe}>Swipe to see next Quote</Text>
            <Image source={arrowBottom} style={styles.icnSwipe} />
          </AnimatableView>
        )}
      </View>
    </ImageBackground>
  );
}
