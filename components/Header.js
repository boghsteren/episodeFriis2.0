import Link from "next/link";
import Head from "next/head";
import React from "react";
import { Menu, Transition, Icon, Image } from "semantic-ui-react";
import { withRouter } from "next/router";
import SearchBox from "./SearchBox";
import NProgress from "nprogress";
import Router from "next/router";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export const Header = ({ router, series }) => (
  <div>
    <Head>
      <link rel="stylesheet" type="text/css" href="/nprogress.css" />
    </Head>
    <Transition transitionOnMount duration={1000}>
      <div>
        <Menu fixed={"top"} borderless>
          <Link href="/" shallow>
            <Menu.Item name="Home" active={router.pathname === "/"}>
              episodeFriis
            </Menu.Item>
          </Link>
          <Link href="/posts" shallow>
            <Menu.Item active={router.pathname === "/posts"}>
              <Icon name="newspaper" />
              Posts
            </Menu.Item>
          </Link>
          <Link href="/serier" shallow>
            <Menu.Item active={router.pathname === "/serier"}>
              <Icon name="tv" />
              Serier
            </Menu.Item>
          </Link>
          <Menu.Item>
            <SearchBox series={series} />
          </Menu.Item>
          <Link href="/friis" shallow>
            <Menu.Item
              active={router.pathname === "/friis"}
              position={"right"}
              style={{ marginRight: "100px" }}
            >
              <Image
                src="https://images.ctfassets.net/qqmq4jsguzi3/6DYE8VjNPa2uaaqUswEog6/0db08e1e665fbf70440b12ce967bd395/friis.jpg"
                avatar
              />
              Friis
            </Menu.Item>
          </Link>
        </Menu>
      </div>
    </Transition>
  </div>
);

export default withRouter(Header);
