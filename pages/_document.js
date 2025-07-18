import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" ? "rtl" : "ltr";
    return (
      <Html dir={dir} lang={locale}>
        <Head>
          <title>AiResumeBuilder - Professional Resume Builder</title>
          <meta
            name="description"
            content="AiResumeBuilder: Build a professional resume effortlessly with our user-friendly resume builder."
          />
          <meta
            name="keywords"
            content="resume builder, professional resume, AiResumeBuilder, CV, job application"
          />
          <meta
            property="og:title"
            content="AiResumeBuilder - Professional Resume Builder"
          />
          <meta
            property="og:description"
            content="Build a professional resume effortlessly with our user-friendly resume builder."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/dqd09hqcv/image/upload/c_fill,w_1200,h_630/v1723722197/opengraph-image_kfknyc.jpg"
          />
          <link rel="icon" type="image/png" href="/logo/cg-logo.jpg"></link>

          {/* Open Graph Meta Tags */}

          {/* <meta property="og:locale" content={locale} /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
