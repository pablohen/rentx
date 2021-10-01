import React, { useEffect, useState } from 'react';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import Car from '../../components/Car';
import { Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from './../../services/api';
import { CarDTO } from './../../dtos/CarDTO';
import LoadAnimated from '../../components/LoadAnimated';
import { useNetInfo } from '@react-native-community/netinfo';

interface Props {}

const Home = (props: Props) => {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', {
      car,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        const res = await api.get('/cars');
        isMounted && setCars(res.data);
      } catch (error) {
        Alert.alert('Erro ao carregar os carros');
        console.error(error);
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Online');
    } else {
      Alert.alert('Offline');
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimated />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
};

export default Home;
