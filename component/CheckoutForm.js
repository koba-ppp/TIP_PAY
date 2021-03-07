import { useStripe } from "@stripe/react-stripe-js";
import { POST } from "../lib/axios";
import * as React from "react";
import styles from "../styles/Home.module.scss";

const CheckoutForm = (props) => {
  const [message, setMessage] = React.useState();
  const [customPrice, setCustomPrice] = React.useState();

  const stripe = useStripe();

  const handleSubmit = async () => {
    setMessage("処理中");
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
    <div>
      <div>
        <input
          value={customPrice}
          onChange={(e) => setCustomPrice(e.target.value)}
        ></input>

        <span>円</span>
      </div>
      <button onClick={() => handleSubmit()}>チップを払います</button>
      {message && <div className={styles.processing}>{message}</div>}
    </div>
  );
};

export default CheckoutForm;
