import React, { useState } from "react";
import { Transition, Container, Grid, Header } from "semantic-ui-react";
import { useRouter } from "next/router";
import FilterByGenreMenu from "../components/FilterByGenreMenu";
import SeriesList from "../components/SeriesList";
import Head from "next/head";
import FilterByServiceMenu from "../components/FilterByServiceMenu";

const serier = ({ series, genres }) => {
  const router = useRouter();
  const { clickedgenre, clickedudbyder } = router.query;
  const [genre, setGenre] = useState(clickedgenre);
  const [service, setService] = useState(clickedudbyder);
  const filteredByUdbyder =
    series && service
      ? series
          ?.filter(({ fields: { udbyder } }) => udbyder === service)
          .sort((a, b) => a.fields.titel.localeCompare(b.fields.titel))
      : series?.sort(
          (a, b) =>
            a.fields.titel &&
            b.fields.titel &&
            a.fields.titel.localeCompare(b.fields.titel)
        );

  const filteredByGenre = filteredByUdbyder?.filter((show) =>
    genre
      ? show.fields.kategori
          ?.map((kategori) => kategori.fields.kategori)
          .includes(genre)
      : filteredByUdbyder
  );
  return (
    <div>
      <Head>
        <title>Serier | episodeFriis</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Serier hos episodeFriis" />
        <meta
          name="description"
          content="Find de fedeste serier hos episodeFriis."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Find de fedeste serier hos episodeFriis."
        />
      </Head>
      <Transition duration={1000}>
        <Container>
          <div className="desktop">
            <Grid columns="2">
              <Grid.Column style={{ maxWidth: "250px", marginTop: "20px" }}>
                <div
                  style={{
                    position: "fixed",
                    maxWidth: "200px",
                  }}
                >
                  <Header>Genrer</Header>
                  {genres && (
                    <FilterByGenreMenu
                      series={filteredByUdbyder}
                      setGenre={setGenre}
                      genres={genres}
                      activeGenre={genre}
                    ></FilterByGenreMenu>
                  )}
                  <Header>Udbydere</Header>
                  {series && (
                    <FilterByServiceMenu
                      series={series}
                      filterSeries={filteredByGenre}
                      setService={setService}
                      selectedService={service}
                    />
                  )}
                </div>
                <div style={{ marginBottom: "80px" }} />
              </Grid.Column>
              <Grid.Column>
                <SeriesList series={filteredByGenre} />
              </Grid.Column>
            </Grid>
          </div>
          <div className="mobile">
            <Grid>
              <Grid.Column>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginBottom: "15px",
                  }}
                ></div>
                <SeriesList series={filteredByGenre} />
              </Grid.Column>
            </Grid>
          </div>
        </Container>
      </Transition>
      <style jsx>{`
        .mobile {
          display: none !important;
        }
        @media (max-width: 600px) {
          .desktop {
            display: none !important;
          }
          .mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};

export default serier;
