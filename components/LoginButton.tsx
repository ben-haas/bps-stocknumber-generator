import { signIn } from 'next-auth/react';

const LoginButton = () => {
  const signInHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signIn();
  };

  return <button onClick={signInHandler}>Sign In</button>;
};

export default LoginButton;
