import React, { useEffect, useState } from "react";
import { Button } from "./Button";

export const Footer = () => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (isLight) {
      [
        ["--background-color", "#fff"],
        ["--translucent-background-color", "rgba(255, 255, 255, 0.5)"],
        ["--header-color", "#fafafa"],
        ["--contrast-color", "#111"],
        ["--axis-color", "rgb(230, 230, 230)"],
        ["--attribute-color", "#333"],
        ["--accent-color", "#1652f0"],
        ["--small-font", "14px"],
      ].forEach((prop) => {
        document.documentElement.style.setProperty(prop[0], prop[1]);
      });
    } else {
      [
        ["--background-color", "#111111"],
        ["--translucent-background-color", "rgba(17, 17, 17, 0.5)"],
        ["--header-color", "#222222"],
        ["--contrast-color", "#fafafa"],
        ["--axis-color", "#333333"],
        ["--attribute-color", "#999999"],
        ["--accent-color", "#1652f0"],
        ["--small-font", "14px"],
      ].forEach((prop) => {
        document.documentElement.style.setProperty(prop[0], prop[1]);
      });
    }
  });

  return (
    <footer>
      <div className="p32">
        <h2 className="ma0">Powered by CoinGecko.</h2>
        <p className="ma0 my8">
          Qualil is a cryptocurrency analytics platform powered by CoinGecko.
        </p>
        <div className="my16">
          <Button disabled={!isLight} onClick={() => setIsLight(false)}>
            Dark
          </Button>
          <Button disabled={isLight} onClick={() => setIsLight(true)}>
            Light
          </Button>
        </div>
      </div>
    </footer>
  );
};
