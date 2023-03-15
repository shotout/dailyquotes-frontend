import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../shared/styling';
import styles from './styles';

const widgetText = 'Big journeys begin with small steps.';

export default function WidgetDetail({activeTheme}) {
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTitle}>
        <Text style={styles.txtTitle}>Theme</Text>
      </View>
      <View style={styles.ctnWidget}>
        <ImageBackground
          source={activeTheme.imgLocal}
          style={styles.ctnFirstWidget}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[
              styles.widgetText,

              {
                fontFamily: activeTheme?.font_family,
                color: activeTheme?.text_color || colors.white,
              },
            ]}>
            {widgetText}
          </Text>
        </ImageBackground>
        <ImageBackground
          source={activeTheme.imgLocal}
          style={styles.ctnLargeWidget}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={[
              styles.largeTxtWidget,

              {
                fontFamily: activeTheme.font_family,
                color: activeTheme.text_color || colors.white,
                textShadowColor: activeTheme.text_shadow,
                textShadowOffset: activeTheme.text_shadow_offset
                  ? JSON.parse(activeTheme.text_shadow_offset)
                  : undefined,
                textShadowRadius: activeTheme.text_shadow ? 10 : undefined,
                fontSize: activeTheme.font_size
                  ? moderateScale(Number(activeTheme.font_size)) - 6
                  : moderateScale(16),
              },
            ]}>
            {widgetText}
          </Text>
        </ImageBackground>
      </View>
      <View style={[styles.ctnWidget, styles.ctnOption]}>
        <Text style={styles.txtTitle}>Refresh Frequency</Text>
        <Text style={styles.txtDisableOption}>Often (8-12x /day)</Text>
      </View>
      <View style={[styles.ctnWidget, styles.ctnOption, styles.ctnLastOption]}>
        <Text style={styles.txtTitle}>Type of quotes</Text>
        <Text style={styles.txtDisableOption}>General</Text>
      </View>
    </View>
  );
}
