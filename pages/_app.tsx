import { FC } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../src/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
