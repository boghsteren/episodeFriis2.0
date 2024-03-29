import React from "react";
import Link from "next/link";
import { Container, Label, Card, Image, Header } from "semantic-ui-react";
import { useRouter } from "next/router";

export const LinkedPostList = ({ show, posts }) => {
  const router = useRouter();
  const relatedPosts = posts?.filter((post) =>
    post?.fields.liste
      ?.map((list_item) => list_item?.sys.id)
      .includes(show?.sys.id)
  );
  return (
    <div>
      {posts && relatedPosts.length > 0 && (
        <div>
          <Header>Relaterede posts</Header>
          <Card.Group itemsPerRow={3} stackable>
            {relatedPosts?.map((post) => {
              return (
                <Card
                  key={post.sys.id}
                  onClick={() => router.push(`/post/${post.fields.url}`)}
                  as="a"
                >
                  {post.fields.cover && (
                    <div
                      style={{
                        height: "250px",
                        backgroundImage: `url(
                          https:${post.fields.cover.fields.file.url}?h=500
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
              );
            })}
          </Card.Group>
        </div>
      )}
    </div>
  );
};

export default LinkedPostList;
