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
import { synchronize } from '@nozbe/watermelondb/sync';
import database from './../../database';
import Button from '../../components/Button';
import { Car as ModelCar } from '../../database/model/Car';

interface Props {}

const Home = (props: Props) => {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const navigation = useNavigation<any>();

  const handleCarDetails = (car: any) => {
    navigation.navigate('CarDetails', {
      car,
    });
  };

  const offlineSynchronize = async () => {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const res = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = res.data;
        console.log('### SINCRONIZACAO ###');
        console.log(changes);
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      },
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCars = async () => {
      try {
        // const res = await api.get('/cars');
        // const cars = res.data;
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
        }
      } catch (error) {
        Alert.alert('Erro ao carregar os carros');
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
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

      {/* <Button title="Sincronizar" onPress={offlineSynchronize} /> */}

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
