import React from 'react';
import { CarList, Container, Header, HeaderContent, TotalCars } from './styles';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import Car, { CarData } from '../../components/Car';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const Home = (props: Props) => {
  const navigation = useNavigation<any>();

  const handleCarDetails = () => {
    navigation.navigate('CarDetails');
  };

  const carData: CarData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
  };

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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carData} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
};

export default Home;
