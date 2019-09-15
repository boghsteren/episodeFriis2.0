import React, { useState } from "react";
import { useRouter } from "next/router";
import { Search, Image } from "semantic-ui-react";

const SearchBox = ({ series }) => {
  const router = useRouter();
  const [term, updateTerm] = useState();
  const results = series.filter(show =>
    show.fields.titel.toLowerCase().includes(term)
  );
  return (
    <div style={{ minWidth: "250px" }}>
      <Search
        fluid
        type="text"
        size={"small"}
        value={term}
        onSearchChange={e => updateTerm(e.target.value)}
        onResultSelect={(event, data) =>
          router.push(`/serie/[serieurl]`, `/serie/${data.result.url}`, {
            shallow: true
          })
        }
        results={results.map(result => {
          return {
            title: result.fields.titel,
            cover: result.fields.cover,
            id: result.sys.id,
            key: result.sys.id,
            url: result.fields.url
          };
        })}
        resultRenderer={({ title, cover, id, url, type }) => [
          <div>
            {cover && (
              <Image src={`https:${cover.fields.file.url}`} size="small" />
            )}
            {title}
          </div>
        ]}
      ></Search>
    </div>
  );
};

export default SearchBox;
