import { Provider } from "react-redux";
import { useStore } from "../store";
import { ResumeAnalysisProvider } from "../context/ResumeAnalysisContext";
import "../styles/animate.min.css";
import "../styles/bootstrap.min.css";
import "../styles/boxicons.min.css";
import "../styles/fontawesome.min.css";
import "../styles/meanmenu.min.css";
import "react-tabs/style/react-tabs.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "swiper/css";
import "swiper/css/bundle";

// Global style
import "../styles/style.css";
// Global responsive style
import "../styles/responsive.css";
// Global rtl style
import "../styles/rtl.css";

import Layout from "../components/Layout/Layout";
import GoTop from "../components/Shared/GoTop";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <ResumeAnalysisProvider>
        <Layout>
          <Component {...pageProps} />

          {/* Go Top Button */}
          <GoTop />
        </Layout>
      </ResumeAnalysisProvider>
    </Provider>
  );
}
