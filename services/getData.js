import client from "./contentful";

export const getPosts = async () => {
  let response;
  try {
    response = await client.getEntries({
      order: "-sys.createdAt",
      content_type: "post",
      limit: 500,
    });
  } catch (e) {
    console.log(e);
  }
  return response.items;
};

export const getShows = async () => {
  let response;
  try {
    response = await client.getEntries({
      order: "-sys.createdAt",
      content_type: "serie",
      limit: 500,
    });
  } catch (e) {
    console.log(e);
  }
  return response.items;
};

export const getGenres = async () => {
  let response;
  try {
    response = await client.getEntries({
      content_type: "serieKategori",
      order: "fields.kategori",
    });
  } catch (e) {
    console.log(e);
  }
  return response.items;
};

export const getPages = async () => {
  let response;
  try {
    response = await client.getEntries({
      content_type: "side",
      include: 2,
    });
  } catch (e) {
    console.log(e);
  }
  return response.items;
};
