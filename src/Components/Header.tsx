import React from "react";

export const Header = () => (
  <>
    <header>
      <div
        className="flex-wrap p16"
        style={{ alignItems: "flex-end", justifyContent: "space-between" }}
      >
        <h1 className="ma0 Title">Qualil</h1>
        <p className="ma0 attribute" style={{ marginLeft: "8px" }}>
          Cryptocurrency analytics powered by CoinGecko.
        </p>
      </div>
    </header>
  </>
);
