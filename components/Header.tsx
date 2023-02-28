import { signOut } from 'next-auth/react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

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
        <UL>
          <LI>
            <StyledLink href={'/'}>New Number</StyledLink>
          </LI>
          <LI>
            <StyledLink href={'/numbers'}>View Items</StyledLink>
          </LI>
          <LI>
            <button className="btn" onClick={signOutHandler}>
              Logout
            </button>
          </LI>
        </UL>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: auto;
  height: 5rem;
  background-color: #0d47a1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
`;

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;
`;

const LI = styled.li`
  margin: 0 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;

  &:hover {
    color: #d6943f;
  }
`;

export default Header;
