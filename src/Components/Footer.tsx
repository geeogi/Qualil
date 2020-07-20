import React, { useState } from "react";
import { Button } from "./Button";

export const Footer = () => {
  const userPrefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isLight, setIsLight] = useState(!userPrefersDarkMode);

  const darkMode = () => {
    [
      ["--background-color", "#111111"],
      ["--translucent-background-color", "rgba(17, 17, 17, 0.5)"],
      ["--header-color", "#222222"],
      ["--contrast-color", "#fafafa"],
      ["--axis-color", "#333333"],
      ["--attribute-color", "#999999"],
      ["--accent-color", "#1652f0"],
      ["--small-font", "14px"],
      ["--is-light", " 0"],
    ].forEach((prop) => {
      document.documentElement.style.setProperty(prop[0], prop[1]);
    });

    setIsLight(false);
  };

  const lightMode = () => {
    [
      ["--background-color", "#fff"],
      ["--translucent-background-color", "rgba(255, 255, 255, 0.5)"],
      ["--header-color", "#fafafa"],
      ["--contrast-color", "#111"],
      ["--axis-color", "rgb(230, 230, 230)"],
      ["--attribute-color", "#333"],
      ["--accent-color", "#1652f0"],
      ["--small-font", "14px"],
      ["--is-light", " 1"],
    ].forEach((prop) => {
      document.documentElement.style.setProperty(prop[0], prop[1]);
    });
    setIsLight(true);
  };

  return (
    <footer>
      <div className="p32">
        <div
          className="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <h2 className="ma0">Powered by CoinGecko.</h2>
            <p className="ma0 my8">
              Qualil is a cryptocurrency analytics platform powered by
              CoinGecko.
            </p>
            <Button disabled={!isLight} onClick={darkMode}>
              Dark
            </Button>
            <Button disabled={isLight} onClick={lightMode}>
              Light
            </Button>
          </div>
          <div className="Icon">Q</div>
        </div>
      </div>
    </footer>
  );
};
