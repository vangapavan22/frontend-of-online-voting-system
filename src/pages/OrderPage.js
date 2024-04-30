import React, { useEffect, useState } from "react";
import Message from "../components/Message";

const OrderPage = ({ match, history }) => {
  const [voteSuccessful, setVoteSuccessful] = useState(false);

  useEffect(() => {
    // Logic to determine if vote is successful
    setVoteSuccessful(true);
  }, []);

  return (
    <>
      {voteSuccessful && <Message variant="success">VOTE SUCCESSFUL</Message>}
    </>
  );
};

export default OrderPage;
