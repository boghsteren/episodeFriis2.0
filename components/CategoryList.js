import React from "react";
import Link from "next/link";
import { Card, Header } from "semantic-ui-react";
import { getRelatedShows } from "../services/getRelatedShows";
import { useRouter } from "next/router";

export const CategoryList = ({ genre, id, series }) => {
  const router = useRouter();
  const relatedShows =
    series &&
    genre &&
    getRelatedShows(genre, series)
      .filter((show) => show.sys.id !== id)
      .sort(() => Math.random() - Math.random())
      .slice(0, 5);
  return (
    relatedShows?.length > 1 && (
      <div>
        <Header>Mere {genre.toLowerCase()}</Header>
        <Card.Group itemsPerRow={5} stackable>
          {relatedShows.map((show) => {
            if (show.id !== id) {
              return (
                <Card
                  as="a"
                  key={show.sys.id}
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
                    <Card.Header>{show.fields.titel}</Card.Header>
                    <Card.Meta>{show.fields.blurb}</Card.Meta>
                  </Card.Content>
                </Card>
              );
            }
          })}
        </Card.Group>
      </div>
    )
  );
};

export default CategoryList;
