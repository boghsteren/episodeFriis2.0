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
import {
  FacebookShareButton,
  FacebookShareCount,
} from "../../services/react-share-master";
import { PostSeriesList } from "../../components/PostSeriesList.js";
import Head from "next/head";
import client from "../../services/contentful";
import { useRouter } from "next/router";

export const PostDetailsPage = ({ post, failed }) => {
  const router = useRouter();
  const { fields } = post || {};
  const { titel, cover, blurb, url, tekstOverListe, liste, tekstUnderListe } =
    fields || {};
  return (
    <div>
      <Head>
        <title>{titel} | episodeFriis</title>
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
            <FacebookShareButton
              url={`http://www.episodefriis.dk/serie/${url}`}
            >
              <Button as="div" labelPosition="right" size="mini">
                <Button size="mini">
                  <Icon name="facebook" inverted />
                  Del
                </Button>
                <Label as="a" basic pointing="left">
                  <FacebookShareCount
                    accessToken="483653635794173|SPI5OTz5Xrso9dkXsRTc2usgk8I"
                    url={`http://www.episodefriis.dk/post/${url}`}
                    style={{ color: "grey" }}
                  />
                </Label>
              </Button>
            </FacebookShareButton>
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

export const getServerSideProps = async ({ params }) => {
  const data = await client.getEntries({
    "fields.url": params.posturl,
    content_type: "post",
  });
  return {
    props: { post: data.items[0] },
  };
};

export default PostDetailsPage;
