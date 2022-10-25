import Header from "./Header";
import MobileHeader from "./MobileHeader";
import { Footer } from "./Footer";
import Head from "next/head";
import Cookiebanner from "./Cookiebanner";

export const Layout = ({ series, children }) => {
  return (
    <div>
      <div>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NQXC97M');`,
            }}
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="google-site-verification"
            content="DJb3r52INT6_wlSJrbPOgvUAyghsw2q16Aaqlsf79LA"
          />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQXC97M" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`,
          }}
        />
        <div className="desktop">
          <Header series={series} />
          <div style={{ marginTop: "100px" }} />
        </div>
        <div className="mobile">
          <MobileHeader series={series} />
          <div style={{ marginTop: "25px" }} />
        </div>
        {children}
        <Cookiebanner />
        <Footer />
      </div>
      <style jsx>{`
        .mobile {
          display: none !important;
        }
        @media (max-width: 600px) {
          .desktop {
            display: none !important;
          }
          .mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
