import React from "react";
import Link from "next/link";
import { Container, Label, Card, Image, Header } from "semantic-ui-react";

export const LinkedPostList = ({ show, posts }) => {
  const relatedPosts = posts.filter(
    post =>
      post.fields.liste &&
      post.fields.liste.map(list_item => list_item.sys.id).includes(show.sys.id)
  );
  return (
    <div>
      {relatedPosts.length > 0 && (
        <Container>
          <Header>Relaterede posts</Header>
          <Card.Group itemsPerRow={4} stackable>
            {relatedPosts.map(post => {
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
                      <Image
                        src={`https:${post.fields.cover.fields.file.url}`}
                        size="medium"
                        label={
                          post.fields.udbyder && (
                            <Label
                              color={ribbonColor(post.fields.udbyder)}
                              ribbon
                            >
                              {post.fields.udbyder}
                            </Label>
                          )
                        }
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
