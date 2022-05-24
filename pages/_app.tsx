import "../styles/globals.css";
import type { AppProps } from "next/app";
import "foundation-sites/dist/css/foundation-float.min.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
