import Head from "next/head";
import styles from "../styles/Home.module.scss";
import PageHeader from "../component/PageHeader";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageHeader />

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.success}>
            <h3>stripeの登録が完了しました。</h3>
            <a href="/">
              <p>Topへ戻る</p>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
