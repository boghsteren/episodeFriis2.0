import {
  Segment,
  Item,
  Label,
  Transition,
  Button,
  Icon,
} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";
import { ribbonColor } from "../../services/ribboncolor";
import Head from "next/head";
import Router from "next/router";
import CategoryList from "../../components/CategoryList";
import LinkedPostList from "../../components/LinkedPostsList";
import { getShows } from "../../services/getData";
import { FacebookShareCount, FacebookShareButton } from "next-share";

const ShowDetailsPage = ({ show, series, posts }) => {
  const { fields } = show || {};
  const { titel, cover, blurb, url, udbyder, beskrivelse, kategori } =
    fields || {};
  return (
    <div>
      <Head>
        <title>{`${titel} | episodeFriis`}</title>
        <meta property="og:title" content={titel} />
        <meta
          property="og:image:width"
          content={cover?.fields.file.details.image.width}
        />
        <meta
          property="og:image:height"
          content={cover?.fields.file.details.image.height}
        />
        <meta
          name="description"
          content={`${blurb} Læs omtalen af ${titel} på episodefriis.dk.`}
        />

        <meta
          property="og:url"
          content={`https://www.episodefriis.dk/serie/${url}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`${blurb} Læs mere hos episodeFriis.`}
        />
        <meta property="og:image" content={`http:${cover?.fields.file.url}`} />
      </Head>

      <Transition>
        <div style={{ margin: "20px" }}>
          <div>
            <Segment>
              <div>
                <Item.Group>
                  <Item>
                    {cover && (
                      <Item.Image
                        src={`https:${cover?.fields.file.url}`}
                        size="massive"
                        bordered
                        label={
                          <Label
                            ribbon
                            as="a"
                            color={ribbonColor(udbyder)}
                            onClick={() =>
                              Router.push(`/serier?clickedudbyder=${udbyder}`)
                            }
                          >
                            {udbyder}
                          </Label>
                        }
                      />
                    )}
                    <Item.Content>
                      <Item.Header size="huge" as={"h1"}>
                        {titel}
                      </Item.Header>

                      <Item.Meta as={"h2"}>{blurb}</Item.Meta>
                      <Item.Meta>
                        <FacebookShareButton
                          url={`https://www.episodefriis.dk/serie/${url}`}
                        >
                          <Button size="mini" as="div">
                            <Icon name="facebook" inverted />
                            Del
                          </Button>
                        </FacebookShareButton>

                        <FacebookShareCount
                          appId={process.env.NEXT_PUBLIC_ENV_FACEBOOK_APP}
                          appSecret={
                            process.env.NEXT_PUBLIC_ENV_FACEBOOK_SECRET
                          }
                          url={`http://www.episodefriis.dk/serie/${url}`}
                        >
                          {(sharecount) => (
                            <Label basic pointing="left">
                              {sharecount}
                            </Label>
                          )}
                        </FacebookShareCount>
                      </Item.Meta>
                      <ReactMarkdown>{beskrivelse}</ReactMarkdown>

                      <Item.Extra>
                        {kategori &&
                          kategori
                            .sort((a, b) => {
                              if (a.fields.kategori > b.fields.kategori) {
                                return 1;
                              }
                              if (a.fields.kategori > b.fields.kategori) {
                                return -1;
                              }
                            })
                            .map((kategori) => (
                              <Label
                                key={kategori.sys.id}
                                as="a"
                                onClick={() =>
                                  Router.push(
                                    `/serier?clickedgenre=${kategori.fields.kategori}`
                                  )
                                }
                              >
                                {kategori.fields.kategori}
                              </Label>
                            ))}
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </div>
            </Segment>
            {posts && (
              <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                <LinkedPostList show={show} posts={posts}></LinkedPostList>
              </div>
            )}
            {series &&
              kategori.map((kategori) => (
                <div
                  key={kategori.sys.id}
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  <CategoryList
                    series={series}
                    genre={kategori.fields.kategori}
                    id={show.sys.id}
                  ></CategoryList>
                </div>
              ))}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export async function getStaticPaths() {
  const series = await getShows();
  const paths = series.map((item) => ({
    params: { serieurl: item.fields.url },
  }));
  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({ params }) => {
  const series = await getShows();
  const show = series.find((item) => item.fields.url === params.serieurl);
  return {
    props: {
      show,
    },
    revalidate: 60,
  };
};

export default ShowDetailsPage;
