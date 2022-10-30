import React from "react";
import { Item, Label, Header, Segment, Divider } from "semantic-ui-react";
import { ribbonColor } from "../services/ribboncolor";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const SeriesList = ({ series }) => {
  return (
    <div>
      <Header>Serier</Header>
      <Divider />
      <Item.Group divided>
        {series &&
          series.map((show) => {
            return (
              <Link
                key={show.sys.id}
                as={`/serie/${show.fields.url}`}
                href={`/serie/[serieurl]`}
                passHref
                shallow
              >
                <div
                  style={{ cursor: "pointer" }}
                  className="item"
                  key={show.sys.id}
                >
                  {show.fields.cover ? (
                    <Item.Image
                      size="large"
                      src={`https:${show.fields.cover.fields.file.url}`}
                      label={
                        show.fields.udbyder && (
                          <Label
                            key={`${show.sys.id}-${show.fields.udbyder}`}
                            color={ribbonColor(show.fields.udbyder)}
                            ribbon
                          >
                            {show.fields.udbyder}
                          </Label>
                        )
                      }
                    />
                  ) : (
                    <Segment style={{ minWidth: "300px", marginRight: "21px" }}>
                      {show.fields.udbyder && (
                        <Label color={ribbonColor(hit.udbyder)} ribbon>
                          {show.fields.udbyder}
                        </Label>
                      )}
                      <Header size="huge">{show.fields.titel}</Header>
                    </Segment>
                  )}
                  <Item.Content>
                    <Header size="large">{show.fields.titel}</Header>
                    <Item.Meta>{show.fields.blurb}</Item.Meta>
                    <Item.Description>
                      <ReactMarkdown>
                        {show.fields.beskrivelse.substring(
                          0,
                          show.fields.beskrivelse.lastIndexOf(" ", 400)
                        ) + "..."}
                      </ReactMarkdown>
                    </Item.Description>
                    <Item.Extra>
                      {show.fields.kategori &&
                        show.fields.kategori
                          .sort((a, b) => {
                            if (a.kategori > b.kategori) {
                              return 1;
                            }
                            if (a.kategori > b.kategori) {
                              return -1;
                            }
                          })
                          .map((kategori) => (
                            <Label
                              key={`${kategori.fields.kategori}-${show.sys.id}`}
                            >
                              {kategori.fields.kategori}
                            </Label>
                          ))}
                    </Item.Extra>
                  </Item.Content>
                </div>
              </Link>
            );
          })}
      </Item.Group>
    </div>
  );
};

export default SeriesList;
