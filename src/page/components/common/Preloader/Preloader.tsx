import React from "react";
import classes from "./preloader.module.css"
import preLoaderSvg from "../../../img/Spin-1.4s-124px.svg";

const PreLoader = () => {
  return (
    <div className={classes.loaderBlock}>
      <img alt="Loading" src={preLoaderSvg} />
    </div>
  );
};

export default PreLoader;
