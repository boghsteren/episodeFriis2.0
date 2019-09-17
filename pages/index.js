import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import {
  Segment,
  Divider,
  Grid,
  Item,
  Container,
  Header,
  Transition,
  Popup
} from "semantic-ui-react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

export const Index = ({ series, posts, genres, pages }) => {
  const top50 = pages.find(page => page.sys.id === "5UJz7bo4W4mCe6eQAe6YcM");
  return (
    <Layout series={series}>
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
        <Container>
          <Grid columns={2} stackable>
            <Grid.Column>
              <Segment>
                <Link href={"/posts"} passHref shallow>
                  <div>
                    <Header>Nyeste posts</Header>
                  </div>
                </Link>
                <Item.Group>
                  {posts.slice(0, 3).map(post => {
                    return (
                      <Link
                        key={post.sys.id}
                        as={`/post/${post.fields.url}`}
                        href={`/post/[posturl]`}
                        passHref
                        shallow
                      >
                        <div className="ui item" style={{ cursor: "pointer" }}>
                          {post.fields.cover && (
                            <Item.Image
                              size="small"
                              src={`https:${post.fields.cover.fields.file.url}`}
                            />
                          )}
                          <Item.Content>
                            <Item.Header>{post.fields.titel}</Item.Header>
                            <Item.Meta>{post.fields.blurb}</Item.Meta>
                          </Item.Content>
                        </div>
                      </Link>
                    );
                  })}
                </Item.Group>
              </Segment>
              <Segment>
                <Link href={"/serier"} passHref shallow>
                  <div>
                    <Header>Nyeste serier</Header>
                  </div>
                </Link>
                <Item.Group>
                  {series.slice(0, 5).map(show => {
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
                            size="small"
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
            <Grid.Column>
              <Segment>
                <ReactMarkdown>{top50.fields.bio}</ReactMarkdown>
                <Divider hidden />
                {top50.fields.liste.map((serie, index) => {
                  return (
                    <Popup
                      key={serie.sys.id}
                      header={`Nr. ${index + 1} på listen`}
                      content={serie.fields.blurb}
                      on="hover"
                      trigger={
                        <div>
                          <Item.Group>
                            <Link
                              as={`/serie/${serie.fields.url}`}
                              href={`/serie/[serieurl]`}
                              passHref
                              shallow
                            >
                              <div
                                className="ui item"
                                style={{ cursor: "pointer" }}
                              >
                                <Item.Image
                                  size="tiny"
                                  src={`https:${serie.fields.cover.fields.file.url}`}
                                />
                                <Item.Content>
                                  <Item.Header as={"h1"}>
                                    {serie.fields.titel}
                                  </Item.Header>
                                </Item.Content>
                              </div>
                            </Link>
                          </Item.Group>
                          <Divider hidden fitted />
                        </div>
                      }
                    />
                  );
                })}
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </Transition>
    </Layout>
  );
};

export default Index;
