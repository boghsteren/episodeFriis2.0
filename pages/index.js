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
  Image,
} from "semantic-ui-react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import client from "../services/contentful";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export const Index = ({ series, posts, page }) => {
  const router = useRouter();
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
            <Grid.Column width={8}>
              <Segment style={{ height: "100%" }}>
                <Link href={"/posts"} passHref shallow>
                  <Header>Nyeste posts</Header>
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
                          <Item
                            key={id}
                            onClick={() => router.push(`/post/${url}`)}
                            as="a"
                          >
                            {cover && (
                              <Item.Image
                                size="large"
                                bordered
                                src={`https:${cover.fields.file.url}?w=1200&h=700&fit=fill&f=faces`}
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
                          </Item>
                        );
                      }
                    )}
                </Item.Group>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment style={{ height: "100%" }}>
                <Link href={"/serier"} passHref shallow>
                  <div>
                    <Header>Nyeste serier</Header>
                  </div>
                </Link>
                <Item.Group>
                  {series &&
                    series.slice(0, 5).map((show) => {
                      return (
                        <Item
                          as="a"
                          onClick={() =>
                            router.push(`/serie/${show.fields.url}`)
                          }
                          key={show.sys.id}
                          style={{ cursor: "pointer" }}
                        >
                          <Item.Image
                            src={`${show.fields.cover.fields.file.url}?h=400&w=800&fit=fill`}
                            size="medium"
                          />
                          <Item.Content>
                            <Item.Header>{show.fields.titel}</Item.Header>
                            <Item.Meta>{show.fields.blurb}</Item.Meta>
                          </Item.Content>
                        </Item>
                      );
                    })}
                </Item.Group>
              </Segment>
            </Grid.Column>
          </Grid>
          <Grid style={{ margin: "6px" }}>
            <Grid.Column>
              <span>
                <ReactMarkdown>{top50?.fields.bio}</ReactMarkdown>
              </span>
              <Divider hidden />
              <Card.Group itemsPerRow={5} stackable>
                {top50?.fields.liste.map((show, index) => {
                  return (
                    <Card
                      key={show.sys.id}
                      as="a"
                      onClick={() => router.push(`/serie/${show.fields.url}`)}
                    >
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
                        <Card.Header>{show.fields.titel}</Card.Header>
                        <Card.Meta>{show.fields.blurb}</Card.Meta>
                      </Card.Content>
                    </Card>
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
