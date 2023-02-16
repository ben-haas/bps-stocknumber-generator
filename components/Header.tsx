import { signOut, useSession } from 'next-auth/react';

import LoginButton from './LoginButton';

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const signOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <header>
      <div>
        <h1>STOCK NUM GEN</h1>
        {status === 'authenticated' ? (
          <button onClick={signOutHandler}>Sign Out</button>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
};

export default Header;
