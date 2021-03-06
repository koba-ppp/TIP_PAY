import Stripe from "stripe";

//stripeモジュールを読み取っている
const stripe = require("stripe")(
  "sk_test_51IMlTwAFwhyuWe2ajpN5zuUGeN9WdRfTgAJn06n0FRLUtp1d9FEqgBlPUUCxa0Y4liadk6A1zOaVjhLeebiaAzqP005t8daqMc"
);
export default stripe;
