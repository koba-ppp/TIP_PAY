import { useStripe } from "@stripe/react-stripe-js";
import { POST } from "../lib/axios";
import * as React from "react";
import styles from "../styles/Home.module.scss";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import PageHeader from "./PageHeader";
import Layout from "./Layout";

const CheckoutForm = (props) => {
  const [message, setMessage] = React.useState();
  const [customPrice, setCustomPrice] = React.useState();

  const stripe = useStripe();

  const handleSubmit = async () => {
    setMessage("処理中...");
    //現在の顧客のID
    const result = await POST(`/api/shop/${props.shopId}/buy`, {
      customer_id: props.customerId,
      price: props.price,
    });

    const confirm_result = window.confirm(
      "選択した商品を購入します。よろしいですか？"
    );

    if (confirm_result) {
      const paymentResult = await stripe
        .confirmCardPayment(result.client_secret)
        .then(() => {
          console.log("購入しました");
          setMessage("購入しました");
        })
        .catch(() => {
          console.log("失敗しました");
          setMessage("失敗しました");
        });

      paymentResult();
    } else {
      setMessage("");
    }
  };

  return (
    <>
      <div className={styles.checkoutform}>
        {message && <div className={styles.processing}>{message}</div>}

        <form onSubmit={() => handleSubmit()}>
          <TextField
            type="text"
            id="outlined-basic"
            label="金額"
            variant="outlined"
            defaultValue={customPrice}
            onChange={(e) => setCustomPrice(e.target.value)}
          />
          <br></br>
          <Button onClick={(e) => handleSubmit(e)} variant="contained">
            決済する
          </Button>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
