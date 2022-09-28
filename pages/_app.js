//import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css';
import { AuthProvider } from "../components/_App/AuthProvider";
import Layout from "../components/_App/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
