import Head from 'next/head';
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from 'utils/theme';
import MessageProvider from 'components/Provider/Message';
import UserProvider from 'components/Provider/User';

function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <UserProvider>
      <MessageProvider>
        <ThemeProvider theme={theme}>
          <Head>
            <title>mjd</title>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
          </Head>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
