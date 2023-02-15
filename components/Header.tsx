import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const signInHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn();
  };

  return (
    <header>
      <div>
        <button onClick={signInHandler}>Sign In</button>
      </div>
    </header>
  );
};

export default Header;
