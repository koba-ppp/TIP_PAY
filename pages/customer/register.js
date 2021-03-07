import * as React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { CustomerContext } from "../../context/CustomerContext";
import { POST } from "../../lib/axios";
import Layout from "../../component/Layout";
import styles from "../../styles/Home.module.scss";
import CardInputForm from "../../component/CardInputForm";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import PageHeader from "../../component/PageHeader";

// const stripePromise = loadStripe(`${process.env.PUBLISHABLE_KEY}`);
const stripePromise = loadStripe(`pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG`);

const RegisterPage = () => {
  const { customerState, customerSetter } = React.useContext(CustomerContext);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const registerCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await POST("/api/register-customer", { customerName: name });
    customerSetter({
      name: result.name,
      id: result.id,
      client_secret: result.client_secret,
    });
    setLoading(false);
  };

  return (
    <Layout>
      <PageHeader />
      <main className={styles.main}>
        {customerState.client_secret ? (
          <div className={styles.cardregister}>
            <h4>クレジットカードを登録してください</h4>
            {loading ? (
              "登録中..."
            ) : (
              <Elements stripe={stripePromise}>
                <CardInputForm
                  clientSecret={customerState.client_secret}
                  customerName={customerState.name}
                />
                <p>**テスト用の番号 "4242424242424242" を使用してください**</p>
              </Elements>
            )}
          </div>
        ) : (
          <div className={styles.nameregister}>
            <h4>お客様のお名前を登録してください</h4>
            <form onSubmit={(e) => registerCustomer(e)}>
              <TextField
                type="text"
                id="outlined-basic"
                label="名前"
                variant="outlined"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <Button onClick={(e) => registerCustomer(e)} variant="contained">
                名前を登録する
              </Button>
            </form>
          </div>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default RegisterPage;
