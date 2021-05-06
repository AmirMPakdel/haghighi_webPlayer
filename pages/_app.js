import { setStatics } from '../statics';
import '../styles/global.css';


function MyApp({ Component, pageProps }) {
  setStatics();
  return <Component {...pageProps} />
}

export default MyApp
