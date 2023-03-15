import React from 'react';
import {ImageBackground, Text, View} from 'react-native';
import styles from './styles';
import QuotesIcon from '../../assets/icons/quotes_icon.svg';
import {colors} from '../../shared/styling';

export default function QuotesContent({item, source}) {
  return (
    <ImageBackground source={source} style={styles.ctnBackgroundImage}>
      <View style={styles.ctnIcon}>
        <View style={styles.quotesWrapper}>
          <View style={styles.ctnQuotesIcon}>
            <QuotesIcon width="100%" height="100%" />
          </View>
          <View style={styles.txtQuotesWrapper}>
            <Text
              style={[
                styles.ctnQuotes,
                {
                  backgroundColor: item.theme.background_color || undefined,
                  color: item.theme.text_color || colors.white,
                  fontFamily: item.theme.font_family,
                  textShadowColor: item.theme.text_shadow,
                  textShadowOffset: item.theme.text_shadow_offset
                    ? JSON.parse(item.theme.text_shadow_offset)
                    : undefined,
                  textShadowRadius: item.theme.text_shadow ? 10 : undefined,
                },
              ]}>
              {item.title}
            </Text>
            {item.author && (
              <Text
                style={[
                  styles.ctnQuotes,
                  {
                    color: item.theme.text_color || colors.white,
                    fontFamily: item.theme.font_family,
                  },
                ]}>
                - {item.author}
              </Text>
            )}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
