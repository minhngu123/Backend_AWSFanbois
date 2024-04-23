import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
import Footer from "../components/footer";
import "flowbite";
import "../api/globals.css";
import axios from "axios";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div className="bg-green-bg">
      <Header currentUser={currentUser} />
      <div className="container py-24">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
      <Footer />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("jwt-token");
  } else {
    console.log("Server side");
  }
  axios.defaults.headers.common["jwt-token"] = token;
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  console.log(data);
  const currentUser = data.currentUser || null;

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      currentUser
    );
  }

  return {
    pageProps,
    currentUser,
  };
};

export default AppComponent;
