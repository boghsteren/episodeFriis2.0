import React, { useEffect, useState } from "react";
import Layout from "../components/MyLayout";
import { getShows } from "../services/getData";
import "semantic-ui-css/semantic.min.css";
import "../nprogress.css";

export const MyApp = ({ pageProps, Component }) => {
  const [series, setSeries] = useState();
  useEffect(() => {
    const getData = async () => {
      let seriesData = await getShows();
      setSeries(seriesData);
    };
    getData();
  }, []);
  return (
    <div>
      <Layout series={series}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
};

export default MyApp;
