import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

import { COLORS } from '@/styles/constants';
import Button from './UI/Button';

const Header = () => {
  const signOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <Wrapper>
      <div>
        <StyledLink href={'/'}>
          <Image src="/logo_large.png" alt="logo" width="210" height="75" />
        </StyledLink>
      </div>
      <nav>
        <ul>
          <li>
            <StyledLink href={'/'}>New Number</StyledLink>
          </li>
          <li>
            <StyledLink href={'/numbers'}>View Items</StyledLink>
          </li>
          <li>
            <Button onClick={signOutHandler}>Logout</Button>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: auto;
  height: 5rem;
  background-color: ${COLORS.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: baseline;
  }

  li {
    margin: 0 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &:hover {
    border-bottom: 2px solid white;
  }
`;

export default Header;
