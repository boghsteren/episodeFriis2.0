import React, { useState } from "react";
import { useRouter } from "next/router";
import { Search, Image } from "semantic-ui-react";

const SearchBox = ({ series }) => {
  const router = useRouter();
  const [term, updateTerm] = useState();
  const results = series?.filter((show) => {
    return show.fields.titel?.toLowerCase().includes(term?.toLowerCase());
  });
  return (
    <div style={{ minWidth: "250px" }}>
      <Search
        fluid
        type="text"
        size={"small"}
        value={term}
        onSearchChange={(e, data) => {
          updateTerm(data.value);
        }}
        onResultSelect={(e, { result }) =>
          router.push(`/serie/[serieurl]`, `/serie/${result.url}`, {
            shallow: true,
          })
        }
        results={results?.map(({ fields, sys }) => {
          return {
            title: fields.titel,
            cover: fields.cover,
            id: sys.id,
            key: sys.id,
            url: fields.url,
          };
        })}
        resultRenderer={({ title, cover, id }) => [
          <div key={id}>
            {cover && (
              <Image src={`https:${cover.fields.file.url}`} size="small" />
            )}
            {title}
          </div>,
        ]}
      ></Search>
    </div>
  );
};

export default SearchBox;
