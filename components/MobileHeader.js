import Link from "next/link";
import Head from "next/head";
import React from "react";
import { Menu, Icon, Sidebar } from "semantic-ui-react";
import { withRouter } from "next/router";
import SearchBox from "./SearchBox";
import NProgress from "nprogress";
import Router from "next/router";

Router.onRouteChangeStart = url => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <div>
          <Menu borderless>
            <Menu.Item onClick={this.toggleVisibility}>
              <Icon name="content" />
            </Menu.Item>
            <Menu.Item>
              <SearchBox series={this.props.series} />
            </Menu.Item>
          </Menu>
        </div>
        <div>
          <Sidebar
            as={Menu}
            animation="overlay"
            visible={visible}
            vertical
            width={"thin"}
          >
            <Link href="/" shallow>
              <Menu.Item
                name="Home"
                active={this.props.router.pathname === "/"}
              >
                {" "}
                <Icon name="home" />
                Forside
              </Menu.Item>
            </Link>
            <Link href="/posts" shallow>
              <Menu.Item active={this.props.router.pathname === "/posts"}>
                <Icon name="newspaper" />
                Posts
              </Menu.Item>
            </Link>
            <Link href="/serier" shallow>
              <Menu.Item active={this.props.router.pathname === "/serier"}>
                <Icon name="tv" />
                Serier
              </Menu.Item>
            </Link>
            <Link href="/friis" shallow>
              <Menu.Item active={this.props.router.pathname === "/friis"}>
                <Icon name="user" />
                Friis
              </Menu.Item>
            </Link>
            <Menu.Item onClick={this.toggleVisibility} color={"grey"}>
              <Icon name="close" />
              Luk
            </Menu.Item>
          </Sidebar>
        </div>
      </div>
    );
  }
}

export default withRouter(MobileHeader);
