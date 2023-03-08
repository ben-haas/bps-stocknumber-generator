import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;
  margin: 20px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  max-width: 760px;
`;

export default Card;
