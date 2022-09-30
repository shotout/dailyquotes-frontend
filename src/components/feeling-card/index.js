import React, {useState} from 'react';
import {Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './styles';

const checklistIcon = require('../../assets/icons/checklist_default.png');

export default function FeelingCard({listData = [], isMultiple}) {
  const [selectedCard, setSelectedCard] = useState([]);

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
          onPress={() => {
            onPressSelect(item.name);
          }}>
          <View style={styles.ctnFeeling} key={item.name}>
            <View style={styles.ctnChecklist}>
              {isDataSelected(item.name) && (
                <Image source={checklistIcon} style={styles.iconChecklist} />
              )}
            </View>
            <View style={styles.ctnItem}>
              <Image source={item.icon} style={styles.iconStyle} />
              <Text style={styles.txtTitle}>{item.name}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}
