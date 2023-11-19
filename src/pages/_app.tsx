import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Adjust the path if your globals.css is located elsewhere

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
