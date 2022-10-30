import React from "react";
import {
  Container,
  Divider,
  Header,
  Item,
  Transition,
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Head from "next/head";
import dayjs from "dayjs";

export const Posts = ({ posts }) => {
  return (
    <div>
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
        <div style={{ margin: "20px" }}>
          <Item.Group divided relaxed>
            {posts &&
              posts.map((post) => {
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
                          size="large"
                          src={`https:${post.fields.cover.fields.file.url}`}
                        />
                      )}
                      <Item.Content>
                        <Header size="huge"> {post.fields.titel}</Header>
                        <Divider></Divider>

                        <Item.Header as={"h2"}>{post.fields.blurb}</Item.Header>

                        <Item.Description>
                          <ReactMarkdown>
                            {post.fields.tekstOverListe.substring(
                              0,
                              post.fields.tekstOverListe.lastIndexOf(" ", 400)
                            ) + "..."}
                          </ReactMarkdown>
                        </Item.Description>
                        <Item.Meta>
                          {`(Opd. ${dayjs(post.sys.updatedAt).format(
                            "DD/MM/YYYY"
                          )})`}
                        </Item.Meta>
                      </Item.Content>
                    </div>
                  </Link>
                );
              })}
          </Item.Group>
        </div>
      </Transition>
    </div>
  );
};

export default Posts;
