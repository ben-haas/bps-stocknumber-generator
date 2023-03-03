import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return <Btn>{children}</Btn>;
};

const Btn = styled.button`
  font: inherit;
  background-color: #0d47a1;
  border: 1px solid white;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #a1660d;
    color: white;
  }
`;

export default Button;
