import * as React from "react";

//空のオブジェクトを渡す
const CustomerContext = React.createContext({});

//
const CustomerProvider = (props) => {
  const [customer, setCustomer] = React.useState({
    id: null,
    name: null,
    client_secret: null,
  });

  return (
    //以下を渡す
    //   {
    //       id:null,
    //       name:null,
    //       client_secret:null,
    //   }
    //   and
    //   更新する関数
    <CustomerContext.Provider
      value={{ customerState: customer, customerSetter: setCustomer }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
