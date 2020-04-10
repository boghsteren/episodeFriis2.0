import React from "react";
import App from "next/app";
import client from "../services/contentful";

class MyApp extends App {
  render() {
    const { Component, pageProps, series, posts, genres, pages } = this.props;
    return (
      <Component
        {...pageProps}
        series={series}
        posts={posts}
        genres={genres}
        pages={pages}
      />
    );
  }
}

MyApp.getInitialProps = async () => {
  const series = await client.getEntries({
    order: "-sys.createdAt",
    content_type: "serie",
    limit: 500,
  });
  const posts = await client.getEntries({
    order: "-sys.createdAt",
    content_type: "post",
    limit: 500,
  });
  const genres = await client.getEntries({
    content_type: "serieKategori",
    order: "fields.kategori",
  });
  const pages = await client.getEntries({
    content_type: "side",
    include: 2,
  });
  return {
    series: series.items,
    posts: posts.items,
    genres: genres.items,
    pages: pages.items,
  };
};

export default MyApp;
