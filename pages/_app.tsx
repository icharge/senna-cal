import 'antd/dist/antd.css';
import { AppProps } from 'next/app';
import '../styles/vars.css';
import '../styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
