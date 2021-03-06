import "../styles/global.css";

import { CustomerProvider } from "../context/CustomerContext";

function MyApp({ Component, pageProps }) {
  return (
    //全ページuseContextで{customerState,costomerSetter}参照可能
    <CustomerProvider>
      <Component {...pageProps} />
    </CustomerProvider>
  );
}

export default MyApp;
