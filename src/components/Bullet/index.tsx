import React from 'react';
import { Container } from './styled';

interface Props {
  active?: boolean;
}

const Bullet = ({ active = false }: Props) => {
  return <Container active={active} />;
};

export default Bullet;
