import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import {
  Container,
  Content,
  Options,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from './styles';
import BackButton from '../../components/BackButton';
import Input from '../../components/Input';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PasswordInput from './../../components/PasswordInput/index';
import { useAuth } from '../../hooks/auth';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import Button from '../../components/Button';
import * as yup from 'yup';

interface Props {}

const Profile = (props: Props) => {
  const { user, signOut, updateUser } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
    setOption(optionSelected);
  };

  const handleAvatarSelect = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (res.cancelled) return;

    if (!res.cancelled) {
      const { uri } = res as ImageInfo;
      setAvatar(uri);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const schema = yup.object().shape({
        driverLicense: yup.string().required('CNH é obrigatória.'),
        name: yup.string().required('O nome é obrigatório.'),
      });

      const data = { name, driverLicense };
      await schema.validate(data);

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name,
        driver_license: driverLicense,
        avatar,
        token: user.token,
      });

      Alert.alert('Perfil atualizado');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Não foi possível atualizar o perfil.');
      }
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Tem certeza?',
      'Se vc sair, irá precisar de Internet para conectar-se novamente.',
      [
        { text: 'Cancelar', onPress: () => {} },
        { text: 'Sim', onPress: signOut },
      ]
    );
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />

              <HeaderTitle>Edital Perfil</HeaderTitle>

              <LogoutButton onPress={handleSignOut}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit' && (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCapitalize="sentences"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  placeholder="Email"
                  editable={false}
                  autoCorrect={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  autoCapitalize="sentences"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                />
              </Section>
            )}

            {option === 'passwordEdit' && (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Nova senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}

            <Button title="Salvar alterações" onPress={handleProfileUpdate} />
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Profile;
