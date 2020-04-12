import React, { useEffect, useState } from "react";
import App from "next/app";
import client from "../services/contentful";
import Layout from "../components/MyLayout";

export const MyApp = ({ pageProps, Component }) => {
  const [series, setSeries] = useState();
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState();
  const [genres, setGenres] = useState();
  useEffect(() => {
    client
      .getEntries({
        order: "-sys.createdAt",
        content_type: "serie",
        limit: 500,
      })
      .then((data) => setSeries(data.items));

    client
      .getEntries({
        order: "-sys.createdAt",
        content_type: "post",
        limit: 500,
      })
      .then((data) => setPosts(data.items));
    client
      .getEntries({
        content_type: "side",
        include: 2,
      })
      .then((data) => setPages(data.items));
    client
      .getEntries({
        content_type: "serieKategori",
        order: "fields.kategori",
      })
      .then((data) => setGenres(data.items));
  }, []);
  return (
    <div>
      <Layout series={series}>
        <Component
          {...pageProps}
          posts={posts}
          pages={pages}
          series={series}
          genres={genres}
        />
      </Layout>
    </div>
  );
};

export default MyApp;
