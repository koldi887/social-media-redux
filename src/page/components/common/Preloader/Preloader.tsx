import React from "react";
import preLoaderSvg from "../../../img/Spin-1.4s-124px.svg";

const PreLoader = () => {
  return (
    <div style={{ position: "absolute", paddingTop: "8rem", color: "black" }}>
      <img alt="Loading" src={preLoaderSvg} />
    </div>
  );
};

export default PreLoader;
