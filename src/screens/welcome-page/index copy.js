import React, {useEffect, useRef} from 'react';
import {FlatList, Dimensions, View} from 'react-native';

const ScrollAnimation = () => {
  const flatListRef = useRef(null);
  const itemHeight = Dimensions.get('window').height;
  const scrollDuration = 2000;

  useEffect(() => {
    const scrollNextItem = () => {
      flatListRef.current?.scrollToOffset({
        offset: itemHeight * 0.2,
        animated: true,
      });
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: 0,
          animated: true,
        });
      }, scrollDuration);
    };

    const timeout = setTimeout(() => {
      scrollNextItem();
    }, scrollDuration);

    return () => {
      clearTimeout(timeout);
    };
  }, [itemHeight]);

  const data = Array.from({length: 2});

  const renderItem = ({index}) => {
    const backgroundColor = index === 0 ? 'red' : 'blue';
    return (
      <View
        style={{
          width: '100%',
          height: itemHeight,
          backgroundColor,
        }}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      style={{flex: 1}}
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      pagingEnabled
    />
  );
};

export default ScrollAnimation;
