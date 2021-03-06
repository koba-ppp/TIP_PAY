import * as React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";

const CardInputForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("登録する");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("登録中。。。");

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe
      .confirmCardSetup(props.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: props.customerName,
          },
        },
      })
      .then(() => {
        setMessage("完了しました");
      })
      .catch(() => {
        setMessage("失敗しました");
      });

    setLoading(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        onClick={handleSubmit}
        disabled={!stripe || loading}
        variant="contained"
      >
        {message}
      </Button>
    </form>
  );
};

export default CardInputForm;
