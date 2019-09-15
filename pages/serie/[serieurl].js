import React from "react";
import { Segment, Container, Item, Label, Transition } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/MyLayout.js";
import { ribbonColor } from "../../services/ribboncolor";
import Head from "next/head";
import { useRouter } from "next/router";
import CategoryList from "../../components/CategoryList";
import LinkedPostList from "../../components/LinkedPostsList";

const ShowDetailsPage = ({ series, posts }) => {
  const router = useRouter();
  const { serieurl } = router.query;
  const show = series && series.find(item => item.fields.url === serieurl);
  return (
    <Layout series={series}>
      <div>
        <Head>
          <title>{show.fields.titel} | episodeFriis</title>
          <meta property="og:title" content={show.fields.titel} />
          <meta
            property="og:image:width"
            content={show.fields.cover.fields.file.details.image.width}
          />
          <meta
            property="og:image:height"
            content={show.fields.cover.fields.file.details.image.height}
          />
          <meta
            name="description"
            content={`${show.fields.blurb} Læs omtalen af ${show.fields.titel} på episodefriis.dk.`}
          />

          <meta
            property="og:url"
            content={`http://www.episodefriis.dk/serie/${show.fields.url}`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content={`${show.fields.blurb} Læs mere hos episodeFriis.`}
          />
          <meta
            property="og:image"
            content={`http:${show.fields.cover.fields.file.url}`}
          />
        </Head>
        <Transition transitionOnMount>
          <div>
            <Container>
              <div>
                <Segment>
                  <div>
                    <Item.Group>
                      <Item>
                        {show.fields.cover && (
                          <Item.Image
                            src={`https:${show.fields.cover.fields.file.url}`}
                            size="big"
                            bordered
                            label={
                              <Label
                                ribbon
                                as="a"
                                color={ribbonColor(show.fields.udbyder)}
                                onClick={() => {
                                  dispatch(updateUdbyder(show.fields.udbyder));
                                  Router.push("/serier");
                                }}
                              >
                                {show.fields.udbyder}
                              </Label>
                            }
                          />
                        )}
                        <Item.Content>
                          <Item.Header size="huge" as={"h1"}>
                            {show.fields.titel}
                          </Item.Header>

                          <Item.Meta as={"h2"}>{show.fields.blurb}</Item.Meta>
                          <Item.Meta></Item.Meta>
                          <ReactMarkdown>
                            {show.fields.beskrivelse}
                          </ReactMarkdown>

                          <Item.Extra>
                            {show.fields.kategori
                              .sort((a, b) => {
                                if (a.fields.kategori > b.fields.kategori) {
                                  return 1;
                                }
                                if (a.fields.kategori > b.fields.kategori) {
                                  return -1;
                                }
                              })
                              .map(kategori => (
                                <Label
                                  as="a"
                                  key={kategori.sys.id}
                                  onClick={() => {
                                    dispatch(
                                      updateCategory(kategori.fields.kategori)
                                    );
                                    Router.push("/serier");
                                  }}
                                >
                                  {kategori.fields.kategori}
                                </Label>
                              ))}
                          </Item.Extra>
                        </Item.Content>
                      </Item>
                    </Item.Group>
                  </div>
                </Segment>
                <Container>
                  <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    <LinkedPostList show={show} posts={posts}></LinkedPostList>
                  </div>
                  {show.fields.kategori.map(kategori => (
                    <div
                      key={kategori.sys.id}
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                    >
                      <CategoryList
                        series={series}
                        genre={kategori.fields.kategori}
                        id={show.sys.id}
                      ></CategoryList>
                    </div>
                  ))}
                </Container>
              </div>
            </Container>
          </div>
        </Transition>
      </div>
    </Layout>
  );
};

export default ShowDetailsPage;
