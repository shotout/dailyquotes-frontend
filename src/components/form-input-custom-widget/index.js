import React, {createRef, useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';
import WidgetDetail from '../widget-detail';
import styles from './styles';
import IconChecklist from '../../assets/svg/icon_checklist.svg';
import PencilIcon from '../../assets/svg/pencil_black.svg';
import ModalTheme from '../../layout/main-page/modal-theme';
import ModalCategories from '../../layout/main-page/modal-categories';
import {
  setNewWidget,
  setRenewWidgetData,
} from '../../store/widgetState/actions';
import {makeid} from '../../helpers/user';

const basicCategory = [{id: 1, name: 'General'}];

const listRefreshRate = [
  {label: 'Never', value: 0},
  {label: 'Not very often', subLabel: '(1-2 times per day)', value: 1},
  {label: 'Often', subLabel: '(Every 2-3 hours)', value: 2},
  {label: 'Very often', subLabel: '(1-2 times per hour)', value: 3},
  {label: 'All the time', subLabel: '(Every couple of minutes)', value: 4},
];

export default function FormInputCustomWidget({
  defaultTheme,
  defaultName,
  editTheme,
}) {
  const refChangeTheme = createRef();
  const refChangeCategory = createRef();
  const [values, setValues] = useState({
    widgetName: defaultName || '',
    themes: defaultTheme,
    refreshFrequency: {label: 'Often', subLabel: '(Every 2-3 hours)', value: 2},
    selectedCategory: basicCategory,
    id: makeid(20),
  });
  const [activeView, setActiveView] = useState('default');
  // const [activeView, setActiveView] = useState('refresh-frequency');

  useEffect(() => {
    if (editTheme?.id) {
      setValues(editTheme);
    } else {
      setNewWidget(values);
    }
    return () => {
      setRenewWidgetData(values);
    };
  }, []);

  useEffect(() => {
    if (values.id) {
      setRenewWidgetData(values);
    }
  }, [values]);

  const handleChangeValue = (value, stateName) => {
    setValues({
      ...values,
      [stateName]: value,
    });
  };

  if (activeView === 'refresh-frequency') {
    return (
      <View style={styles.ctnRoot}>
        <View style={styles.ctnDescDetail}>
          <Text style={styles.txtTitleDesc}>Refresh Frequency</Text>
          <Text style={styles.txtDescription}>
            Set how often the Widget will update the shown Quote.
          </Text>
        </View>
        <View style={styles.ctnSelectFrequency}>
          {listRefreshRate.map((option, index) => (
            <TouchableWithoutFeedback
              key={option.label}
              onPress={() => {
                handleChangeValue(option, 'refreshFrequency');
                setActiveView('default');
              }}>
              <View
                style={[
                  styles.ctnOption,
                  index !== listRefreshRate.length - 1 && styles.ctnBtnBorder,
                ]}>
                <View style={styles.leftOption}>
                  <Text style={styles.txtTitOption}>{option.label}</Text>
                  {!!option?.subLabel && (
                    <Text style={styles.txtDescOption}>{option.subLabel}</Text>
                  )}
                </View>

                <View style={styles.ctnIconItem}>
                  {option.value === values.refreshFrequency.value && (
                    <IconChecklist fill="#000" width="100%" height="100%" />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnInput}>
        <TextInput
          style={styles.txtInput}
          value={values.widgetName}
          onChangeText={widgetName => {
            handleChangeValue(widgetName, 'widgetName');
          }}
        />
        <View style={styles.ctnAction}>
          <PencilIcon width="100%" height="100%" />
        </View>
      </View>
      <View style={styles.ctnDescription}>
        <Text style={styles.txtDescription}>
          Add a Custom Widget by long pressing the Mooti Widget on your Home
          Screen and changing to this style.
        </Text>
      </View>
      <WidgetDetail
        openTheme={() => {
          refChangeTheme.current.show();
          console.log('OPEN THEME:');
        }}
        openCategory={() => {
          refChangeCategory.current.show();
        }}
        onSelectFrequency={() => {
          setActiveView('refresh-frequency');
        }}
        createWidgetValue={values}
      />

      <ModalTheme
        contentRef={c => {
          if (c) {
            refChangeTheme.current = {
              ...c,
            };
          }
        }}
        onCustomSelectTheme={selectedTheme => {
          handleChangeValue(selectedTheme, 'themes');
        }}
        customSelected={values.themes.id}
        onClose={() => {
          refChangeTheme.current.hide();
        }}
      />

      <ModalCategories
        refPanel={refChangeCategory}
        contentRef={c => {
          if (c) {
            refChangeCategory.current = {
              ...c,
            };
          }
        }}
        onClose={() => {
          refChangeCategory.current.hide();
        }}
        onCustomSelectCategory={selectedCategory => {
          console.log('Check selected category:', selectedCategory);
          handleChangeValue(selectedCategory, 'selectedCategory');
        }}
        customSelected={values.selectedCategory}
      />
    </View>
  );
}
