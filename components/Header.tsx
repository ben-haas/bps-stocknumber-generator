import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import classes from './Header.module.css';

const Header = () => {
  const { data: session } = useSession();

  const user = session?.user!.name;
  const userGreeting = `Hey, ${user?.substring(0, user.indexOf(' '))}!`;

  const signOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.user}>{userGreeting}</div>
      <nav>
        <ul>
          <li>
            <Link href={'/'}>New Number</Link>
          </li>
          <li>
            <Link href={'/numbers'}>View Items</Link>
          </li>
          <li>
            <button className="btn" onClick={signOutHandler}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
