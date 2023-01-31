import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { TransctionTable } from "../components/form/TransactionTable";
import { TransForm } from "../components/form/TransForm";

import { Layout } from "../components/layout/Layout";
import { getTransaction } from "../helper/axiosHelper";

export const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const fetchTransaction = async () => {
    const data = await getTransaction();
    console.log(data);
    setTransaction(data);
    // return data;
  };
  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <Layout>
      <TransForm fetchTransaction={fetchTransaction} />
      <div className="table">
        <TransctionTable transaction={transaction} />
      </div>
    </Layout>
  );
};
