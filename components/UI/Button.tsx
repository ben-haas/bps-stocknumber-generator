import { ReactNode } from 'react';
import styled from 'styled-components';

import { COLORS } from '@/styles/constants';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <Btn onClick={onClick} className={className}>
      {children}
    </Btn>
  );
};

const Btn = styled.button`
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
