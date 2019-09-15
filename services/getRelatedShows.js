export const getRelatedShows = (genre, shows) => {
  return shows.filter(show =>
    show.fields.kategori
      .map(kategori => kategori.fields.kategori)
      .includes(genre)
  );
};
