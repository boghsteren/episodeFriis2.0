import React from "react";
import { Container, Transition } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import client from "../services/contentful";

export const PrivatLivsPolitik = ({ page }) => {
  const { fields } = page || {};
  const { bio } = fields || {};
  return (
    <div>
      <Head>
        <title>Privatlivspolitik | episodeFriis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Privatlivspolitik" />
        <meta
          name="description"
          content="episodeFriis bruger cookies og samler visse (anonyme) data op om dig."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="episodeFriis bruger cookies og samler visse (anonyme) data op om dig."
        />
      </Head>
      <Transition transitionOnMount duration={1000}>
        <div>
          <Container text>
            <ReactMarkdown>{bio}</ReactMarkdown>
          </Container>
        </div>
      </Transition>
    </div>
  );
};

export async function getStaticProps() {
  const page = await client.getEntry("3L77MGwYlGwAKiuikc28qa");
  return {
    props: {
      page,
    },
    revalidate: 60,
  };
}
export default PrivatLivsPolitik;
