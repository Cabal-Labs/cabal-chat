import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Adjust the path if your globals.css is located elsewhere
import { Provider } from '@/providers/provider';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider><Component {...pageProps} /></Provider>;
}

export default MyApp;
