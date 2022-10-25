import React from "react";
import Link from "next/link";
import { Container, Label, Card, Image, Header } from "semantic-ui-react";

export const LinkedPostList = ({ show, posts }) => {
  const relatedPosts = posts?.filter((post) =>
    post?.fields.liste
      ?.map((list_item) => list_item?.sys.id)
      .includes(show?.sys.id)
  );
  return (
    <div>
      {posts && relatedPosts.length > 0 && (
        <Container>
          <Header>Relaterede posts</Header>
          <Card.Group itemsPerRow={2} stackable>
            {relatedPosts?.map((post) => {
              return (
                <Link
                  key={post.sys.id}
                  as={`/post/${post.fields.url}`}
                  href={`/post/[posturl]`}
                  passHref
                  shallow
                >
                  <Card>
                    {post.fields.cover && (
                      <div
                        style={{
                          height: "250px",
                          backgroundImage: `url(
                          https:${post.fields.cover.fields.file.url}?h=250
                        )`,
                          backgroundSize: "cover",
                        }}
                      />
                    )}
                    <Card.Content>
                      <Card.Header>{post.fields.titel}</Card.Header>
                      <Card.Description>{post.fields.blurb}</Card.Description>
                    </Card.Content>
                  </Card>
                </Link>
              );
            })}
          </Card.Group>
        </Container>
      )}
    </div>
  );
};

export default LinkedPostList;
