import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from './styles';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
import { Alert, StatusBar } from 'react-native';
import Button from '../../components/Button';
import Calendar, {
  DayProps,
  generateInterval,
  MarkedDateProps,
} from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import getPlatformDate from '../../utils/getPlatformDate';
import { format } from 'date-fns';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

interface Props {}

const Scheduling = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );

  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const handleConfirmRental = () => {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione um periodo');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      const temp = start;
      start = end;
      end = temp;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      // start: start.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy'
      ),
      // end: end.timestamp,
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    });
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>
          Escolha uma {'\n'}data de início e {'\n'}fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};

export default Scheduling;
