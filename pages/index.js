import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "../component/Layout";
import styles from "../styles/Home.module.scss";
import { POST, GET } from "../lib/axios";
import stripe from "../lib/stripe";

import { Button } from "@material-ui/core";

const IndexPage = (props) => {
  const router = useRouter();

  const post = async () => {
    const result = await POST("/api/create-connect-account", {
      name: "test",
      email: "test@mail.com",
    });
    await router.push(result.url);
  };

  //stripeアカウントを作るリンクに遷移させる
  const getSetLink = async () => {
    const result = await POST("/api/create-connect-account", {
      name: "test",
      email: "test@mail.com",
    });
    await router.push(result.url);
  };

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.header_inner}>
            <h1>TIPPAY</h1>
            <ul className={styles.header_right}>
              <li onClick={() => getSetLink()}>店舗の登録</li>
              <li>
                <Link href="customer/register">
                  <a>
                    <h3>クレジットカードを登録する</h3>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="owner/shop">
                  <a>
                    <h3>アカウント情報</h3>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.firstview}>
          <img src="images/firstview.jpg" />
          <div className={styles.firstview_inner}>
            <h2>
              <span>感謝を形にする</span>
              <br />
              <strong>チップ決済アプリ</strong>
            </h2>
            <p>
              感染リスクの高い接客業への感謝をチップとして払うことができます。
            </p>
          </div>
        </div>
        <ul className={styles.Register}>
          <li onClick={() => getSetLink()}>
            <div>
              <h3>店舗の登録</h3>
              <p>
                店舗の銀行口座を登録する<br></br>
                登録が完了すると一覧に表示されます
              </p>
            </div>
          </li>
          <li>
            <Link href="customer/register">
              <div>
                <h3>クレジットカードを登録する</h3>
                <p>各店舗にチップを払うためにクレジットカードを登録する</p>
              </div>
            </Link>
          </li>
        </ul>
        <div className={styles.shoplist}>
          <h2>店舗一覧</h2>
          <div className={styles.grid}>
            {/* プラットフォームに接続されているアカウントのリストに対してmap */}
            {props.shopList.map((shop, index) => (
              //遷移後のURL
              <Link
                key={index}
                href="/customer/shop/[id]"
                as={`/customer/shop/${shop.id}`}
              >
                <a className={styles.card}>
                  <h3>{shop.business_profile.name}</h3>
                  <p>{shop.business_profile.support_address}</p>
                  <p>{shop.email}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  //プラットフォームに接続されているアカウントのリストを返す
  const shopData = await stripe.accounts.list();
  const activeShop = shopData.data.filter((s) => s.charges_enabled);
  const accounts = await stripe.accounts.list();

  const accountData = [];
  accounts.data.forEach((account) => {
    accountData.push({
      name: account.business_profile.name,
      id: account.id,
    });
  });

  return {
    props: {
      accountData: accountData,
      shopList: activeShop,
    },
  };
};

export default IndexPage;
