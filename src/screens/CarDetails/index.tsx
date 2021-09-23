import React from 'react';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import {
  CarImages,
  Container,
  Header,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles';
import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import Button from '../../components/Button';
import { StatusBar } from 'react-native';

interface Props {}

const CarDetails = (props: Props) => {
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png',
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lambo</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 120,00</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={accelerationSvg} />
          <Accessory name="800HP" icon={forceSvg} />
          <Accessory name="Gasoline" icon={gasolineSvg} />
          <Accessory name="auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </Accessories>

        <About>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis ex
          libero. Sed luctus ligula vitae nibh fermentum, eget mattis ligula
          sodales. Cras ac dui lectus. Pellentesque vitae massa eu enim semper
          interdum. Vivamus a venenatis risus. Aliquam porta risus sed urna
          aliquet, sed sollicitudin dolor accumsan. Aenean mollis sodales
          cursus. Nunc pulvinar lectus vel eleifend aliquet.
        </About>
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Footer>
    </Container>
  );
};

export default CarDetails;
