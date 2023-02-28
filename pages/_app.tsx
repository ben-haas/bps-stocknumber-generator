import { SessionProvider } from 'next-auth/react';
import StockNumberContextProvider from '@/context/context';
import GlobalStyles from '@/styles/GlobalStyles';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <StockNumberContextProvider>
        <Component {...pageProps} />
      </StockNumberContextProvider>
      <GlobalStyles />
    </SessionProvider>
  );
}
