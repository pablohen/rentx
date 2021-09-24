import React from 'react';
import { Container, Title } from './styles';
import { useTheme } from 'styled-components';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
}

const Button = ({ title, color, ...rest }: Props) => {
  const theme = useTheme();
  return (
    <Container {...rest} color={color ? color : theme.colors.main}>
      <Title>{title}</Title>
    </Container>
  );
};

export default Button;
