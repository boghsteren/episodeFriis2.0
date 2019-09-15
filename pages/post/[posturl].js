import React from "react";
import {
  Divider,
  Container,
  Image,
  Header,
  Transition
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/MyLayout.js";
import { useRouter } from "next/router";
import { PostSeriesList } from "../../components/PostSeriesList.js";
import Head from "next/head";

export const PostDetailsPage = ({ posts, series }) => {
  const router = useRouter();
  const { posturl } = router.query;
  const post = posts && posts.find(item => item.fields.url === posturl);
  return (
    <Layout series={series}>
      <div>
        <Head>
          <title>{post.fields.titel} | episodeFriis</title>
          <meta property="og:title" content={post.fields.titel} />
          <meta
            property="og:image:width"
            content={post.fields.cover.fields.file.details.image.width}
          />
          <meta
            property="og:image:height"
            content={post.fields.cover.fields.file.details.image.height}
          />
          <meta
            name="description"
            content={`${post.fields.blurb} Læs omtalen af ${post.fields.titel} på episodefriis.dk.`}
          />

          <meta
            property="og:url"
            content={`http://www.episodefriis.dk/post/${post.fields.url}`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content={`${post.fields.blurb} Læs mere hos episodeFriis.`}
          />
          <meta
            property="og:image"
            content={`http:${post.fields.cover.fields.file.url}`}
          />
        </Head>
        <Transition transitionOnMount duration={1000}>
          <div>
            <Container text>
              {post.fields.cover && (
                <Image
                  fluid
                  bordered
                  src={`https:${post.fields.cover.fields.file.url}`}
                />
              )}
              <Header size="huge" as="h1">
                {post.fields.titel}
              </Header>
              <Header size="medium" as="h2">
                {post.fields.blurb}
              </Header>

              <Divider />
              <ReactMarkdown>{post.fields.tekstOverListe}</ReactMarkdown>
              {post.fields.liste && (
                <div>
                  <Divider horizontal>
                    <Header size="large">LISTE</Header>
                  </Divider>
                  <PostSeriesList shows={post.fields.liste} />
                  <Divider />
                </div>
              )}
              <ReactMarkdown>{post.fields.tekstUnderListe}</ReactMarkdown>
            </Container>
          </div>
        </Transition>
      </div>
    </Layout>
  );
};

export default PostDetailsPage;
