import { StylesContext } from "@material-ui/styles";
import React from "react";
import styles from "../styles/Home.module.scss";

const PageHeader = () => {
  return (
    <div className={styles.pageheader}>
      <h1>TIPPAY</h1>
    </div>
  );
};

export default PageHeader;
