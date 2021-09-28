import React from 'react';
import { Container, Title } from './styles';
import { useTheme } from 'styled-components';
import { ActivityIndicator } from 'react-native';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

const Button = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}: Props) => {
  const theme = useTheme();
  return (
    <Container
      {...rest}
      color={color ? color : theme.colors.main}
      enabled={enabled}
      style={{
        opacity: enabled === false || loading === true ? 0.5 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator size={20} color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};

export default Button;
