import React from "react";
import { Segment, Container, Item, Transition } from "semantic-ui-react";
import Layout from "../components/MyLayout";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

export const CvPage = ({ pages, series }) => {
  const cv = pages.find(page => page.fields.url === "friis");
  return (
    <Layout series={series}>
      <div>
        <Head>
          <title>Om Friis | episodeFriis</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content="Hvem er episodeFriis?" />
          <meta
            name="description"
            content="Mit navn er Christian og jeg har set rigtig mange serier. Tjek min top 50 ud og find dit næste seriefix."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="Mit navn er Christian og jeg har set rigtig mange serier. Tjek min top 50 ud og find dit næste seriefix."
          />
        </Head>
        <Transition transitionOnMount duration={1000}>
          <div>
            <Container>
              <div>
                <Segment>
                  <div>
                    <Item.Group>
                      <Item>
                        {cv.fields.billede && (
                          <Item.Image
                            src={`https:${cv.fields.billede.fields.file.url}`}
                            size="small"
                            bordered
                            circular
                          />
                        )}
                        <Item.Content>
                          <Item.Header as={"h1"}>{cv.fields.titel}</Item.Header>
                          <ReactMarkdown>{cv.fields.bio}</ReactMarkdown>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </div>
                </Segment>
              </div>
            </Container>
          </div>
        </Transition>
      </div>
    </Layout>
  );
};

export default CvPage;
