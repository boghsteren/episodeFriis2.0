import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import { withRouter } from "next/router";
import SearchBox from "./SearchBox";
import NProgress from "nprogress";
import Router from "next/router";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export const MobileHeader = ({ series, router }) => {
  const [visible, toggleVisibility] = useState(false);
  const { pathname } = router;
  return (
    <div>
      <Head>
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      </Head>
      <div>
        <Menu borderless>
          <Menu.Item onClick={() => toggleVisibility(!visible)}>
            <Icon name="content" />
          </Menu.Item>
          <Menu.Item>
            <SearchBox series={series} />
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Sidebar
          as={Menu}
          animation="overlay"
          visible={visible}
          vertical
          onHide={() => toggleVisibility(false)}
          width={"thin"}
        >
          <Link href="/" shallow>
            <Menu.Item name="Home" active={pathname === "/"}>
              {" "}
              <Icon name="home" />
              Forside
            </Menu.Item>
          </Link>
          <Link href="/posts" shallow>
            <Menu.Item active={router.pathname === "/posts"}>
              <Icon name="newspaper" />
              Posts
            </Menu.Item>
          </Link>
          <Link href="/serier" shallow>
            <Menu.Item active={pathname === "/serier"}>
              <Icon name="tv" />
              Serier
            </Menu.Item>
          </Link>
          <Link href="/friis" shallow>
            <Menu.Item active={pathname === "/friis"}>
              <Icon name="user" />
              Friis
            </Menu.Item>
          </Link>
          <Menu.Item onClick={() => toggleVisibility(!visible)} color={"grey"}>
            <Icon name="close" />
            Luk
          </Menu.Item>
        </Sidebar>
      </div>
    </div>
  );
};

export default withRouter(MobileHeader);
