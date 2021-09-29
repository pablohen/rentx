import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, StatusBar } from 'react-native';
import Button from '../../components/Button';
import {
  Container,
  Footer,
  FooterContainer,
  Form,
  Header,
  SubTitle,
  Title,
} from './styles';
import { useTheme } from 'styled-components';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

interface Props {}

const SignIn = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const theme = useTheme();
  const navigation = useNavigation<any>();

  const handleSignIn = async () => {
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('O email é obrigatório.')
          .email('Digite um email válido.'),
        password: yup.string().required('A senha é obrigatória.'),
      });

      await schema.validate({ email, password });
      Alert.alert('Tudo certo!', 'asdhasjkhdjksahdjkshad');
    } catch (error) {
      console.error(error);
      if (error instanceof yup.ValidationError) {
        Alert.alert('Ocorreu um erro', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login. Verifique seu login e senha.'
        );
      }
    }
  };

  const handleNewAccount = () => {
    navigation.navigate('SignUpFirstStep');
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
            <Title>Estamos{'\n'}quase lá.</Title>
            <SubTitle>
              Faça seu login para começar{'\n'}uma experiência incrível.
            </SubTitle>
          </Header>

          <Form>
            <Input
              iconName="mail"
              placeholder="user@mail.com"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="password"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <FooterContainer>
              <Button
                title="Login"
                onPress={handleSignIn}
                enabled={true}
                loading={false}
              />
            </FooterContainer>
            <FooterContainer>
              <Button
                title="Criar conta gratuita"
                onPress={handleNewAccount}
                enabled={true}
                loading={false}
                color={theme.colors.background_secondary}
                light
              />
            </FooterContainer>
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
