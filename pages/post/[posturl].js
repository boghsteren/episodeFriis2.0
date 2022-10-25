import React from "react";
import {
  Divider,
  Container,
  Image,
  Header,
  Transition,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import { PostSeriesList } from "../../components/PostSeriesList.js";
import Head from "next/head";
import { getPosts } from "../../services/getData";

export const PostDetailsPage = ({ post, failed }) => {
  const { fields } = post || {};
  const { titel, cover, blurb, url, tekstOverListe, liste, tekstUnderListe } =
    fields || {};
  return (
    <div>
      <Head>
        <title>{`${titel} / episodeFriis`}</title>
        <meta property="og:title" content={titel} />
        <meta
          property="og:image:width"
          content={cover?.fields.file.details.image.width}
        />
        <meta
          property="og:image:height"
          content={cover?.fields.file.details.image.height}
        />
        <meta
          name="description"
          content={`${blurb} Læs omtalen af ${titel} på episodefriis.dk.`}
        />

        <meta
          property="og:url"
          content={`http://www.episodefriis.dk/post/${url}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`${blurb} Læs mere hos episodeFriis.`}
        />
        <meta property="og:image" content={`http:${cover?.fields.file.url}`} />
      </Head>
      <Transition transitionOnMount duration={1000}>
        <div>
          <Container text>
            {cover && (
              <Image fluid bordered src={`https:${cover?.fields.file.url}`} />
            )}
            <Header size="huge" as="h1">
              {titel}
            </Header>
            <Header size="medium" as="h2">
              {blurb}
            </Header>
            <Button as="div" labelPosition="right" size="mini">
              <Button size="mini">
                <Icon name="facebook" inverted />
                Del
              </Button>
              <Label as="a" basic pointing="left"></Label>
            </Button>
            <Divider />
            <ReactMarkdown>{tekstOverListe}</ReactMarkdown>
            {liste && (
              <div>
                <Divider horizontal>
                  <Header size="large">LISTE</Header>
                </Divider>
                <PostSeriesList shows={liste} />
                <Divider />
              </div>
            )}
            <ReactMarkdown>{tekstUnderListe}</ReactMarkdown>
          </Container>
        </div>
      </Transition>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => ({
    params: { posturl: post.fields.url },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  const post = posts.find((post) => post.fields.url === params.posturl);
  return {
    props: { post },
    revalidate: 60,
  };
};

export default PostDetailsPage;
