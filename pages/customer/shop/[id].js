import * as React from "react";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CustomerContext } from "../../../context/CustomerContext";
import Layout from "../../../component/Layout";
import styles from "../../../styles/Home.module.scss";
import CheckoutForm from "../../../component/CheckoutForm";

const RegisterPage = (props) => {
  const { customerState } = React.useContext(CustomerContext);

  //Stripeを叩くメソッドを持ったStripeオブジェクトをクライアントに渡す
  //このオブジェクトは context.provider などで決済フォームへ渡して、決済に使います
  const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`, {
    stripeAccount: props.shopId,
  });

  return (
    <Layout>
      <main className={styles.main}>
        <Elements stripe={stripePromise}>
          <div className={styles.grid}>
            <CheckoutForm customerId={customerState.id} shopId={props.shopId} />
          </div>
        </Elements>
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      shopId: ctx.query.id,
    },
  };
};

export default RegisterPage;
