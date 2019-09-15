import React from "react";
import { Container, Transition } from "semantic-ui-react";
import Layout from "../components/MyLayout";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

export const PrivatLivsPolitik = ({ pages, series }) => {
  const side = pages.find(page => page.fields.url === "privatlivspolitik");
  return (
    <Layout series={series}>
      <div>
        <Head>
          <title>Privatlivspolitik | episodeFriis</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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
              <ReactMarkdown>{side.fields.bio}</ReactMarkdown>
            </Container>
          </div>
        </Transition>
      </div>
    </Layout>
  );
};

export default PrivatLivsPolitik;
