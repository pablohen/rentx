import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import Bullet from './../../../components/Bullet/index';
import {
  Container,
  Form,
  FormTitle,
  Header,
  Steps,
  SubTitle,
  Title,
} from './styles';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';

interface Props {}

const SignUpFirstStep = (props: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required('CNH é obrigatória.'),
        email: yup
          .string()
          .email('Email inválido.')
          .required('Nome é obrigatório.'),
        name: yup.string().required('Nome é obrigatório.'),
      });

      const data = { name, email, driverLicense };

      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error) {
      console.error(error);
      if (error instanceof yup.ValidationError) {
        Alert.alert('Ocorreu um erro', error.message);
      } else {
        Alert.alert('Ocorreu um outro tipo de erro', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <SubTitle>Faça seu cadastro de{'\n'}forma rápida e fácil</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUpFirstStep;
