import Link from "next/link";
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
    <Transition transitionOnMount duration={1000}>
      <div>
        <Menu fixed={"top"} borderless>
          <Menu.Item
            as="a"
            onClick={() => router.push("/")}
            name="Home"
            active={router.pathname === "/"}
          >
            episodeFriis
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => router.push("/posts")}
            active={router.pathname === "/posts"}
          >
            <Icon name="newspaper" />
            Posts
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => router.push("/serier")}
            active={router.pathname === "/serier"}
          >
            <Icon name="tv" />
            Serier
          </Menu.Item>
          <Menu.Item>
            <SearchBox series={series} />
          </Menu.Item>
          <Menu.Item
            as="a"
            onClick={() => router.push("/friis")}
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
        </Menu>
      </div>
    </Transition>
  </div>
);

export default withRouter(Header);
