import React from "react";
import { Container, Item, Transition } from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import Head from "next/head";

export const Posts = ({ posts, series }) => {
  return (
    <Layout series={series}>
      <Head>
        <title>Posts | episodeFriis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Posts fra episodeFriis" />
        <meta
          name="description"
          content="Læs med på episodeFriis og find din næste gode serie."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Læs med på episodeFriis og find din næste gode serie."
        />
      </Head>
      <Transition transitionOnMount duration={1000}>
        <Container>
          <Item.Group divided relaxed>
            {posts &&
              posts.map(post => {
                return (
                  <Link
                    key={post.sys.id}
                    as={`/post/${post.fields.url}`}
                    href={`/post/[posturl]`}
                    passHref
                    shallow
                  >
                    <Item>
                      {post.fields.cover && (
                        <Item.Image
                          size="medium"
                          src={`https:${post.fields.cover.fields.file.url}`}
                        />
                      )}
                      <Item.Content>
                        <Item.Header as={"h1"}>{post.fields.titel}</Item.Header>
                        <Item.Meta as={"h2"}>{post.fields.blurb}</Item.Meta>
                        <Item.Description>
                          <ReactMarkdown>
                            {post.fields.tekstOverListe.substring(
                              0,
                              post.fields.tekstOverListe.lastIndexOf(" ", 200)
                            ) + "..."}
                          </ReactMarkdown>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                  </Link>
                );
              })}
          </Item.Group>
        </Container>
      </Transition>
    </Layout>
  );
};

export default Posts;
