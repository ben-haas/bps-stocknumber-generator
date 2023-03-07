import { ReactNode } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/styles/constants';

interface ButtonProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

const Btn = styled.button`
  font: inherit;
  background-color: ${COLORS.primary};
  border: 1px solid white;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.secondary};
  }
`;

export default Button;
