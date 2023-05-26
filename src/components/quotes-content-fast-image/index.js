import React, {useEffect, useRef, useState} from 'react';
import {Animated, ImageBackground, Text, View, Image} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import styles from './styles';
import QuotesIcon from '../../assets/icons/quotes_icon.svg';
import {colors, sizing} from '../../shared/styling';
import {isUserPremium} from '../../helpers/user';
import {setAnimationCounter} from '../../store/defaultState/actions';
import states from './states';

function QuotesContent({
  item,
  themeUser,
  source,
  isActive,
  isAnimationStart,
  animationCounter,
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const counter = useRef(0);
  const activeStatus = useRef(false);

  useEffect(() => {
    if (isActive && isAnimationStart) {
      runAnimation();
      activeStatus.current = true;
    } else {
      stopAnimation();
    }
  }, [isActive, isAnimationStart]);

  const runAnimation = () => {
    console.log('Check counter.current:', counter.current);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      counter.current += 1;
      Animated.timing(translateX, {
        toValue: -160,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        if (isAnimationStart && activeStatus.current) {
          const isStopAnimation =
            counter.current !== 0 && counter.current % 2 === 0;
          if (isStopAnimation) {
            setAnimationCounter(false);
            Animated.timing(translateX, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {
                setTimeout(() => {
                  setAnimationCounter(true);
                }, 100);
                runAnimation();
              }, 3500);
            });
          } else {
            runAnimation();
          }
        }
      });
    });
  };

  const stopAnimation = () => {
    if (activeStatus.current) {
      activeStatus.current = false;
      setTimeout(() => {
        console.log('RESET ANIMATION');
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          console.log('SUCCESS RESET ANIMATION');

          translateX.setValue(0);
          Animated.timing(translateX).stop();
        });
      });
    }
  };

  return (
    <View style={styles.ctnWrapper}>
      <Image
        source={source}
        style={[styles.ctnBackgroundImage, styles.ctnAbsolute]}
      />
      <Animated.View
        style={{
          width: '100%',
          height: sizing.getDimensionHeight(1),
          transform: [{translateY: translateX}],
        }}>
        <ImageBackground source={source} style={styles.ctnBackgroundImage}>
          <View style={[styles.ctnIcon, !isUserPremium() && styles.ctnPdAds]}>
            <View style={styles.quotesWrapper}>
              <View style={styles.ctnQuotesIcon}>
                <QuotesIcon width="100%" height="100%" />
              </View>
              <View style={styles.txtQuotesWrapper}>
                <Text
                  style={[
                    styles.ctnQuotes,
                    {
                      fontSize: themeUser.font_size
                        ? moderateScale(Number(themeUser.font_size))
                        : moderateScale(18),
                      backgroundColor: themeUser.background_color || undefined,
                      color: themeUser.text_color || colors.white,
                      fontFamily: themeUser.font_family,
                      // fontFamily: 'Iceberg-Regular',
                      textShadowColor: themeUser.text_shadow,
                      textShadowOffset: themeUser.text_shadow_offset
                        ? JSON.parse(themeUser.text_shadow_offset)
                        : undefined,
                      textShadowRadius: themeUser.text_shadow ? 10 : undefined,
                      lineHeight: themeUser.line_height
                        ? moderateScale(Number(themeUser.line_height))
                        : moderateScale(24),
                      // textShadowOffset: {width: 1, height: 1},
                    },
                  ]}>
                  {item?.title}
                </Text>
                {item?.author && (
                  <Text
                    style={[
                      styles.ctnQuotes,
                      {
                        backgroundColor:
                          themeUser.background_color || undefined,
                        color: themeUser.text_color || colors.white,
                        fontFamily: themeUser.font_family,
                        // fontFamily: 'Iceberg-Regular',
                        textShadowColor: themeUser.text_shadow,
                        textShadowOffset: themeUser.text_shadow_offset
                          ? JSON.parse(themeUser.text_shadow_offset)
                          : undefined,
                        textShadowRadius: themeUser.text_shadow
                          ? 10
                          : undefined,
                        lineHeight: themeUser.line_height
                          ? moderateScale(Number(themeUser.line_height))
                          : moderateScale(24),
                      },
                    ]}>
                    - {item?.author}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
}

export default connect(states)(QuotesContent);
