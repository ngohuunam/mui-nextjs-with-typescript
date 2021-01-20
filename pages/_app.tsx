import { useEffect, useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import theme from '../src/theme';
import '../vendors/hamburger-menu.css';
// import Layout from "../components/layout";
import { AuthProvider } from "../provider/auth/auth-provider-hook";
import { useRouter } from 'next/router';
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
import MySnackbars from '../components/Feedback/MySnackbars'

export const cache = createCache({ key: 'css', prepend: true });

const pageName = {
  '/': 'Main Page',
  '/login': 'Login page',
  '/profile': 'Dashboard page',
  '/about': 'About page'
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  const [pathName, setPathName] = useState('/');
  const router = useRouter()
  useEffect(() => {
    const start = () => {
      const path = router.pathname
      // @ts-ignore
      setPathName(pageName[path])
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
          <MySnackbars open={loading} message={`Navigating to ${pathName} page, please wait...`} />
          {/* <Backdrop style={{ zIndex: 2000, color: '#fff' }} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop> */}
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
