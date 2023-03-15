import {NativeModules, Platform} from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const {SharedStorage, QuoteWidgetModule} = NativeModules;

const group = 'group.widget.quotes';

let widgetData = {
  text: 'God tirelessly plays dice under laws which he has himself prescribed.',
  fontFamily: 'EBGaramond-Medium',
  fontSize: 16,
  themeBackground: '1',
};

export const handleWidgetQuote = async (themeUser, activeQuote) => {
  try {
    // iOS
    const quoteText = activeQuote?.title || null;
    widgetData = {
      text:
        quoteText ||
        'God tirelessly plays dice under laws which he has himself prescribed.',
      fontFamily: themeUser?.font_family || 'EBGaramond-Medium',
      fontSize: themeUser?.font_size || 16,
      themeBackground: (themeUser?.id || '1').toString(),
      fontColor: themeUser?.text_color || '#000',
      quoteId: `mooti://filterQuote/${(activeQuote?.id || '').toString()}`,
    };
    console.log('Check widget data:', widgetData);
    await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    if (QuoteWidgetModule && QuoteWidgetModule.refreshAllWidgets) {
      console.log('Refresh widget');
      QuoteWidgetModule.refreshAllWidgets();
    }
  } catch (error) {
    console.log('Err set widget quote:', error);
  }
  // Android
  if (Platform.OS === 'android') {
    SharedStorage.set(
      JSON.stringify({
        text: widgetData.text,
        fontSize: widgetData.fontSize,
        fontFamily: widgetData.fontFamily,
        themeBackground: widgetData.themeBackground,
      }),
    );
  }
};
