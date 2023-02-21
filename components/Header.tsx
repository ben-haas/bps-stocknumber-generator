import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import classes from './Header.module.css';

const Header = () => {
  const signOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  return (
    <header className={classes.header}>
      <div className={classes.user}>
        <Image src="/logo_large.png" alt="logo" width="210" height="75" />
      </div>
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
