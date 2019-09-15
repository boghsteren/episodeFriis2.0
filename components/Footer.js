import React from "react";
import Link from "next/link";
import { Divider, Image, Transition } from "semantic-ui-react";

export const Footer = () => {
  return (
    <Transition transitionOnMount duration={1500}>
      <div style={{ marginBottom: "20px" }}>
        <Divider />
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-evenly"
          }}
        >
          <Link href="/privatliv" shallow>
            <a>Privatlivspolitik</a>
          </Link>
          <Image
            src="/static/PoweredByContentful_LightBackground.svg"
            spaced
            size="tiny"
            href="https://www.contentful.com"
          />
        </div>
      </div>
    </Transition>
  );
};
