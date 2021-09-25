import React from 'react';
import {
  Calendar as CustomCalendar,
  DateCallbackHandler,
  LocaleConfig,
} from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import ptBr from './localeConfig';
import generateInterval from './generateInterval';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface Props {
  markedDates: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}

LocaleConfig.locales['pt-br'] = ptBr;
LocaleConfig.defaultLocale = 'pt-br';

const Calendar = ({ markedDates, onDayPress }: Props) => {
  const theme = useTheme();
  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
          size={24}
          color={theme.colors.shape}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
};

export { MarkedDateProps, DayProps, generateInterval };

export default Calendar;
