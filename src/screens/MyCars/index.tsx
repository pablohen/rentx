import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import api from '../../services/api';
import { StatusBar, FlatList, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import Car from '../../components/Car';
import { AntDesign } from '@expo/vector-icons';
import LoadAnimated from '../../components/LoadAnimated';
import { Car as ModelCar } from '../../database/model/Car';
import { format, parseISO } from 'date-fns';
interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

interface Props {}

const MyCars = (props: Props) => {
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused();

  const navigation = useNavigation();

  const theme = useTheme();

  const handleBack = () => {
    navigation.goBack();
  };

  const fetchCars = async () => {
    try {
      const res = await api.get('/rentals');
      const dataFormatted = res.data.map((data: DataProps) => {
        return {
          id: data.id,
          car: data.car,
          start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        };
      });
      setCars(dataFormatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <Title>Meus agendamentos</Title>
        <SubTitle>RENTX</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car
                  data={item.car}
                  onPress={() => Alert.alert(item.car.name)}
                />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

export default MyCars;
