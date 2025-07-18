import Head from "next/head";
import { useRouter } from "next/router";

//top header
import TopHeader from "./TopHeader";

//navbar
import Navbar from "./Navbar";
import NavbarTwo from "./NavbarTwo";

//footer
import Footer from "./Footer";

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const hideFooterAndNavbar = pathname === "/login" || pathname === "/register";

  return (
    <>
      <Head>
        <title>Corporate Gate - Professional Resume Builder</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Corporate Gate: Your one-stop solution for building professional resumes, generating cover letters, exploring various templates, and curating skillsets."
        />
      </Head>

      {/* {!hideFooterAndNavbar  && <TopHeader />} */}
      {!hideFooterAndNavbar && pathname === "/index-2" ? (
        <NavbarTwo />
      ) : (
        !hideFooterAndNavbar && <Navbar />
      )}

      {children}

      {!hideFooterAndNavbar && <Footer />}
    </>
  );
};

export default Layout;
