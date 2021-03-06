//フロント側に口座登録用のURLを返すAPI
import stripe from "../../lib/stripe";

export default async (req, res) => {
  try {
    // Stripe用の connected accountを作成する
    // このタイミングでアカウントのタイプを選択する（今回は'express'）
    const account = await stripe.accounts.create({
      type: "express",
      country: "JP",
    });

    // 作成したconnected accountのidから口座登録用のURLを発行する。
    //開発環境と本番環境でURLを変更
    const origin =
      process.env.NODE_ENV === "development"
        ? `http://${req.headers.host}`
        : `https://${req.headers.host}`;

    const accountLinkURL = await generateAccountLink(account.id, origin);

    //200のステータスコードを代入
    res.statusCode = 200;
    res.json({ url: accountLinkURL });
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

function generateAccountLink(accountID, origin) {
  //アカウントリンクオブジェクトを返す
  // {
  //   "object": "account_link",
  //   "created": 1614871632,
  //   "expires_at": 1614871932,
  //   "url": "https://connect.stripe.com/setup/s/kh8JTv8Jad6k"
  // }
  return stripe.accountLinks
    .create({
      //編集するときは"account_update"
      type: "account_onboarding",
      //アカウントリンクを作成するアカウントの識別子
      account: accountID,
      //失敗した時にリダイレクトされるURL
      refresh_url: `${origin}/onboard-user/refresh`,
      //成功した時にリダイレクトされるURL
      return_url: `${origin}/success`,
    })
    .then((link) => link.url);
}
