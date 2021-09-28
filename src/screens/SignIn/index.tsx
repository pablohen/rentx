import React from 'react';
import { StatusBar } from 'react-native';
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

interface Props {}

const SignIn = (props: Props) => {
  const theme = useTheme();

  return (
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
        />
        <PasswordInput iconName="lock" placeholder="password" />
      </Form>

      <Footer>
        <FooterContainer>
          <Button
            title="Login"
            onPress={() => {}}
            enabled={false}
            loading={false}
          />
        </FooterContainer>
        <FooterContainer>
          <Button
            title="Criar conta gratuita"
            onPress={() => {}}
            enabled={false}
            loading={false}
            color={theme.colors.background_secondary}
            light
          />
        </FooterContainer>
      </Footer>
    </Container>
  );
};

export default SignIn;
