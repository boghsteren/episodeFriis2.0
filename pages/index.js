import React from "react";
import Link from "next/link";
import {
  Segment,
  Divider,
  Grid,
  Item,
  Header,
  Transition,
  Card,
} from "semantic-ui-react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import client from "../services/contentful";
import dayjs from "dayjs";

export const Index = ({ series, posts, page }) => {
  const top50 = page;
  return (
    <div>
      <Head>
        <title>episodeFriis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          property="og:title"
          content="episodeFriis har samlet de bedste serier et sted."
        />
        <meta
          name="description"
          content="Jeg har set rigtig mange serier, tænkt over dem og skrevet om det. På denne side anbefaler jeg dem, en for en. Sidens pointe er at skære fedtet væk og gøre det nemt for dig at finde de rigtige serier, der også er gode. Så kig dig omkring og find ud af hvor din smag fører dig hen."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Jeg har set rigtig mange serier, tænkt over dem og skrevet om det. På denne side anbefaler jeg dem, en for en. Sidens pointe er at skære fedtet væk og gøre det nemt for dig at finde de rigtige serier, der også er gode. Så kig dig omkring og find ud af hvor din smag fører dig hen."
        />
      </Head>
      <Transition transitionOnMount duration={1000}>
        <div style={{ margin: "20px" }}>
          <Grid columns={2} stackable>
            <Grid.Column width={10}>
              <Segment style={{ height: "100%" }}>
                <Link href={"/posts"} passHref shallow>
                  <div>
                    <Header>Nyeste posts</Header>
                  </div>
                </Link>
                <Item.Group>
                  {posts
                    ?.slice(0, 3)
                    .map(
                      ({
                        sys: { id, createdAt, updatedAt },
                        fields: { titel, blurb, url, cover },
                      }) => {
                        return (
                          <Link
                            key={id}
                            as={`/post/${url}`}
                            href={`/post/[posturl]`}
                            passHref
                            shallow
                          >
                            <div
                              className="ui item"
                              style={{ cursor: "pointer" }}
                            >
                              {cover && (
                                <Item.Image
                                  size="medium"
                                  bordered
                                  src={`https:${cover.fields.file.url}`}
                                />
                              )}
                              <Item.Content>
                                <Item.Header>{titel}</Item.Header>
                                <Item.Meta>
                                  {`(Opd. ${dayjs(updatedAt).format(
                                    "DD/MM/YYYY"
                                  )})`}
                                </Item.Meta>
                                <Item.Description>{blurb}</Item.Description>
                              </Item.Content>
                            </div>
                          </Link>
                        );
                      }
                    )}
                </Item.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment style={{ height: "100%" }}>
                <Link href={"/serier"} passHref shallow>
                  <div>
                    <Header>Nyeste serier</Header>
                  </div>
                </Link>
                <Item.Group>
                  {series &&
                    series.slice(0, 3).map((show) => {
                      return (
                        <Link
                          key={show.sys.id}
                          as={`/serie/${show.fields.url}`}
                          href={`/serie/[serieurl]`}
                          passHref
                          shallow
                        >
                          <div
                            className="ui item"
                            key={show.sys.id}
                            style={{ cursor: "pointer" }}
                          >
                            <Item.Image
                              src={show.fields.cover.fields.file.url}
                              size="medium"
                            />
                            <Item.Content>
                              <Item.Header>{show.fields.titel}</Item.Header>
                              <Item.Meta>{show.fields.blurb}</Item.Meta>
                            </Item.Content>
                          </div>
                        </Link>
                      );
                    })}
                </Item.Group>
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid>
            <Grid.Column>
              <span style={{ fontSize: "16px" }}>
                <ReactMarkdown>{top50?.fields.bio}</ReactMarkdown>
              </span>
              <Divider hidden />
              <Card.Group itemsPerRow={6} stackable>
                {top50?.fields.liste.map((show, index) => {
                  return (
                    <Link
                      key={show.sys.id}
                      as={`/serie/${show.fields.url}`}
                      href={`/serie/[serieurl]}`}
                      shallow
                    >
                      <Card>
                        {show.fields.cover && (
                          <div
                            style={{
                              height: "150px",
                              backgroundImage: `url(
                                  https:${show.fields.cover.fields.file.url}?h=300
                                )`,
                              backgroundSize: "cover",
                            }}
                          ></div>
                        )}
                        <Card.Content>
                          <Card.Description>
                            {`Nr. ${index + 1}:`}
                          </Card.Description>
                          <Card.Description>
                            {show.fields.titel}
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Link>
                  );
                })}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </div>
      </Transition>
    </div>
  );
};

export async function getStaticProps() {
  const page = await client.getEntry("5UJz7bo4W4mCe6eQAe6YcM");
  const series = await client.getEntries({
    order: "-sys.updatedAt",
    content_type: "serie",
    limit: 500,
  });
  const posts = await client.getEntries({
    order: "-sys.updatedAt",
    content_type: "post",
    limit: 500,
  });
  return {
    props: {
      page,
      series: series.items,
      posts: posts.items,
    },
    revalidate: 60,
  };
}
export default Index;
