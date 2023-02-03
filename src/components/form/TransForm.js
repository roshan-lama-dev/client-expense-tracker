import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { postTransactionToDb } from "../../helper/axiosHelper";

const initialState = {
  type: "",
  amount: "",
  name: "",
};

export const TransForm = ({ fetchTransaction }) => {
  const [transData, setTransData] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTransData({
      ...transData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(transData);

    //send the form data to the database using axios helper
    const { data } = await postTransactionToDb(transData);
    console.log(data);
    fetchTransaction();
    //reset the form
    setTransData({});
  };
  return (
    <div className="form">
      <Form onSubmit={handleOnSubmit}>
        <Row className="gap-1">
          <Col md={2}>
            <Form.Select
              required
              name="type"
              value={transData.type}
              onChange={handleOnChange}
            >
              <option value=""> Choose</option>
              <option value="income">Income</option>
              <option value="expense"> Expense</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Transaction description"
              name="name"
              required
              value={transData.name}
              onChange={handleOnChange}
            />{" "}
          </Col>
          <Col md={4}>
            {" "}
            <Form.Control
              type="number"
              placeholder="Transaction amount"
              name="amount"
              required
              value={transData.amount}
              onChange={handleOnChange}
            />{" "}
          </Col>
          <Col md={2}>
            <Button type="submit"> Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
