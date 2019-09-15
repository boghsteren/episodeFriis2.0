import React from "react";
import { Label, Checkbox } from "semantic-ui-react";

const FilterByGenreMenu = ({ series, genres, activeGenre, setGenre }) => {
  return (
    <div>
      {genres.map(genre => {
        return (
          <div key={genre.sys.id}>
            <Checkbox
              label={genre.fields.kategori}
              style={{ marginRight: "5px" }}
              checked={activeGenre === genre.fields.kategori}
              onClick={() =>
                activeGenre === genre.fields.kategori
                  ? setGenre()
                  : setGenre(genre.fields.kategori)
              }
            />
            <Label circular>
              {
                series.filter(
                  show =>
                    show.fields.kategori &&
                    show.fields.kategori
                      .map(show_genre => show_genre.fields.kategori)
                      .includes(genre.fields.kategori)
                ).length
              }
            </Label>
          </div>
        );
      })}
    </div>
  );
};

export default FilterByGenreMenu;
