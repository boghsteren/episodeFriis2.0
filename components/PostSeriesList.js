import React from "react";
import { Item, Label, Header, Segment } from "semantic-ui-react";
import { ribbonColor } from "../services/ribboncolor";
import Link from "next/link";

export const PostSeriesList = props => {
  return (
    <Item.Group>
      {props.shows.map(show => {
        return (
          show.sys.contentType.sys.id === "serie" && (
            <Link
              key={show.sys.id}
              as={`/serie/${show.fields.url}`}
              href={`/seriedetailspage?id=${show.fields.url}`}
              passHref
              shallow
            >
              <Item key={show.sys.id}>
                {show.fields.cover ? (
                  <Item.Image
                    size="medium"
                    src={`https:${show.fields.cover.fields.file.url}`}
                    label={
                      show.fields.udbyder && (
                        <Label color={ribbonColor(show.fields.udbyder)} ribbon>
                          {show.fields.udbyder}
                        </Label>
                      )
                    }
                  />
                ) : (
                  <Segment style={{ width: "300px", marginRight: "21px" }}>
                    {show.fields.udbyder && (
                      <Label color={ribbonColor(show.fields.udbyder)} ribbon>
                        {show.fields.udbyder}
                      </Label>
                    )}
                    <Header size="huge">{show.fields.titel}</Header>
                  </Segment>
                )}
                <Item.Content>
                  <Item.Header>{show.fields.titel}</Item.Header>
                  <Item.Meta>{show.fields.blurb}</Item.Meta>
                </Item.Content>
              </Item>
            </Link>
          )
        );
      })}
    </Item.Group>
  );
};

export default PostSeriesList;
