import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import Footer from '../components/footer';
import 'flowbite';
import '../api/globals.css'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="bg-green-bg">
      <Header currentUser={currentUser} />
      <div className="container py-24">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
      <Footer/>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
