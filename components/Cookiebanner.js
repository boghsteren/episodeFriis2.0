import React from "react";
import Link from "next/link";
import { Message } from "semantic-ui-react";

let showCookieBanner;

export default class Cookiebanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCookieBanner: undefined,
    };
  }
  componentDidMount() {
    showCookieBanner = document.cookie.replace(
      /(?:(?:^|.*;\s*)showCookieBanner\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (showCookieBanner === "false") {
      this.setState({ showCookieBanner: false });
    } else this.setState({ showCookieBanner: true });
  }
  update = () => {
    this.setState({ showCookieBanner: false });
  };

  render() {
    return (
      this.state.showCookieBanner === true && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
            zIndex: "999",
          }}
        >
          <Message
            onDismiss={() => {
              document.cookie = "showCookieBanner=false;max-age=31536000";
              this.update();
            }}
          >
            <Message.Header>Vi bruger cookies</Message.Header>
            Det gør vi for at kunne se hvor mange besøgende vi får og for at
            forbedre siden.
            <Link href="/privatliv">Læs mere...</Link>
          </Message>
        </div>
      )
    );
  }
}
