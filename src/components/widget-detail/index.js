import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../shared/styling';
import styles from './styles';
import ArrowBottom from '../../assets/svg/arrow_bottom.svg';
import ArrowRight from '../../assets/svg/arrow_right.svg';

const widgetText = 'Big journeys begin with small steps.';

export default function WidgetDetail({
  activeTheme,
  createWidgetValue,
  openTheme,
  onSelectFrequency,
  openCategory,
}) {
  function getCategoryLabel() {
    if (createWidgetValue) {
      if (createWidgetValue.selectedCategory.length === 1) {
        return createWidgetValue.selectedCategory[0].name;
      }
      return 'Mix';
    }
    return '';
  }

  if (createWidgetValue) {
    return (
      <View style={styles.ctnRoot}>
        <TouchableOpacity style={styles.ctnTitle} onPress={openTheme}>
          <View style={styles.titleWrapper}>
            <Text style={[styles.txtTitle, styles.txtBlack]}>Change Theme</Text>
          </View>
          <View style={styles.ctnArrowRight}>
            <ArrowRight width="100%" height="100%" />
          </View>
        </TouchableOpacity>
        <View style={styles.ctnWidget}>
          <ImageBackground
            source={createWidgetValue.themes.imgLocal}
            style={styles.ctnFirstWidget}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={[
                styles.widgetText,

                {
                  fontFamily: createWidgetValue.themes?.font_family,
                  color: createWidgetValue.themes?.text_color || colors.white,
                },
              ]}>
              {widgetText}
            </Text>
          </ImageBackground>
          <ImageBackground
            source={createWidgetValue.themes.imgLocal}
            style={styles.ctnLargeWidget}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={[
                styles.largeTxtWidget,

                {
                  fontFamily: createWidgetValue.themes.font_family,
                  color: createWidgetValue.themes.text_color || colors.white,
                  textShadowColor: createWidgetValue.themes.text_shadow,
                  textShadowOffset: createWidgetValue.themes.text_shadow_offset
                    ? JSON.parse(createWidgetValue.themes.text_shadow_offset)
                    : undefined,
                  textShadowRadius: createWidgetValue.themes.text_shadow
                    ? 10
                    : undefined,
                  fontSize: createWidgetValue.themes.font_size
                    ? moderateScale(
                        Number(createWidgetValue.themes.font_size),
                      ) - 6
                    : moderateScale(16),
                },
              ]}>
              {widgetText}
            </Text>
          </ImageBackground>
        </View>
        <TouchableWithoutFeedback onPress={onSelectFrequency}>
          <View style={[styles.ctnWidget, styles.ctnOption]}>
            <Text style={[styles.txtTitle, styles.txtBlack]}>
              Refresh Frequency
            </Text>
            <View style={styles.subValueWrapper}>
              <Text style={[styles.txtDisableOption, styles.txtEnable]}>
                {`${createWidgetValue.refreshFrequency.label} ${
                  createWidgetValue?.refreshFrequency?.subLabel || ''
                }`}
              </Text>
              <View style={styles.ctnArrowBottom}>
                <ArrowBottom width="100%" height="100%" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={openCategory}>
          <View
            style={[styles.ctnWidget, styles.ctnOption, styles.ctnLastOption]}>
            <Text style={[styles.txtTitle, styles.txtBlack]}>
              Type of quotes
            </Text>

            <View style={styles.subValueWrapper}>
              <Text style={[styles.txtDisableOption, styles.txtEnable]}>
                {getCategoryLabel()}
              </Text>
              <View style={styles.ctnArrowBottom}>
                <ArrowBottom width="100%" height="100%" />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
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
