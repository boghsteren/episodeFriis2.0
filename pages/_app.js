import React, { useEffect, useState } from "react";
import App from "next/app";
import Layout from "../components/MyLayout";
import { getPosts, getGenres, getPages, getShows } from "../services/getData";

export const MyApp = ({ pageProps, Component }) => {
  const [series, setSeries] = useState();
  const [posts, setPosts] = useState();
  const [pages, setPages] = useState();
  const [genres, setGenres] = useState();
  useEffect(() => {
    const getData = async () => {
      let seriesData = await getShows();
      setSeries(seriesData);
      let postsData = await getPosts();
      setPosts(postsData);
      let genreData = await getGenres();
      setGenres(genreData);
      let pagesData = await getPages();
      setPages(pagesData);
    };
    getData();
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
