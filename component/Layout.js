import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

const Layout = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>TIPPAY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.children}
      <footer className={styles.footer}>
        <Link href="/">
          <a>TOPへ戻る</a>
        </Link>
      </footer>
    </div>
  );
};

export default Layout;
