import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import Visualiser from '../components/Visualizer'
import Welcome from 'components/Welcome';
import Loader from 'components/Loader';

const useCookie = (cookieName: string) => {
  const [loaded, setLoaded] = useState(false);
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setValue(Cookies.get(cookieName));
    setLoaded(true);
  }, [cookieName]);
  
  return {
    loaded,
    value
  };
}

const Home: NextPage = () => {
  const { loaded: tokenLoaded, value: accessToken } = useCookie('spotify');
  const { value: canRefresh } = useCookie('spotify.refresh');

  if (tokenLoaded && !accessToken && canRefresh === 'true') {
    window.location.href = '/api/spotify/authorize/refresh';
  }

  const child = !tokenLoaded
    ? <Loader />
    : accessToken
    ? <Visualiser accessToken={accessToken as string}  />
    : <Welcome />;

  return (
    <>
      <Head>
        <title>MusicVerse</title>
        <meta name="description" content="MusicVerse" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {child}
    </>
  )
}

export default Home
