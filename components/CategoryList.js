import React from "react";
import Link from "next/link";
import { Container, Card, Image, Header } from "semantic-ui-react";
import { getRelatedShows } from "../services/getRelatedShows";

export const CategoryList = ({ genre, id, series }) => {
  const relatedShows = series && getRelatedShows(genre, series);
  return (
    relatedShows.length > 1 && (
      <Container>
        <Header>Andre {genre.toLowerCase()}-serier</Header>
        <Card.Group itemsPerRow={6} stackable>
          {relatedShows.map(show => {
            if (show.id !== id) {
              return (
                <Link
                  key={show.sys.id}
                  as={`/serie/${show.fields.url}`}
                  href={`/serie/[serieurl]}`}
                  shallow
                >
                  <Card>
                    {show.fields.cover && (
                      <Image
                        src={`https:${show.fields.cover.fields.file.url}`}
                      />
                    )}
                    <Card.Content>
                      <Card.Header>{show.fields.titel}</Card.Header>
                    </Card.Content>
                  </Card>
                </Link>
              );
            }
          })}
        </Card.Group>
      </Container>
    )
  );
};

export default CategoryList;
