import React, { useState } from 'react';
import { Container, IconContainer, InputText } from './styles';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

const PasswordInput = ({ iconName, ...rest }: Props) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVivibilityChange = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <BorderlessButton onPress={handlePasswordVivibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
};

export default PasswordInput;
