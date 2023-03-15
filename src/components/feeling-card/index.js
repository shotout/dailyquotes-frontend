import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {BACKEND_URL} from '../../shared/static';
import SVGURIRenderer from '../svg-uri-renderer';
import styles from './styles';

const checklistIcon = require('../../assets/icons/checklist_default.png');

export default function FeelingCard({
  listData = [],
  isMultiple,
  onSelect = () => {},
  initialData,
}) {
  const [selectedCard, setSelectedCard] = useState(initialData || []);

  useEffect(() => {
    onSelect(selectedCard);
  }, [selectedCard]);

  const isDataSelected = value => {
    const findItem = selectedCard.find(item => item === value);
    if (findItem) return true;
    return false;
  };

  const onPressSelect = value => {
    if (isMultiple) {
      const isSelected = isDataSelected(value);
      if (isSelected) {
        setSelectedCard(selectedCard.filter(item => item !== value));
      } else {
        const listItem = [...selectedCard];
        listItem.push(value);
        setSelectedCard(listItem);
      }
    } else {
      setSelectedCard([value]);
    }
  };

  return (
    <View style={styles.ctnRowIcon}>
      {listData.map(item => (
        <TouchableWithoutFeedback
          key={item.name}
          onPress={() => {
            onPressSelect(item.id);
          }}>
          <View style={styles.ctnFeeling}>
            <View style={styles.ctnChecklist}>
              {isDataSelected(item.id) && (
                <Image source={checklistIcon} style={styles.iconChecklist} />
              )}
            </View>
            <View style={styles.ctnItem}>
              <View style={styles.iconStyle}>
                <Image
                  style={styles.imgStyle}
                  source={{uri: `${BACKEND_URL}${item.icon.url}`}}
                />
              </View>
              <Text style={styles.txtTitle}>{item.name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
