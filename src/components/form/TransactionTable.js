import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
export const TransctionTable = ({ transaction }) => {
  const [setchecked, userSetChecked] = useState(false);

  const [itemToDelete, setItemToDelete] = useState([]);
  const calculateTotal = transaction.reduce(
    (acc, { amount, type }) =>
      type === "expense" ? acc - +amount : acc + +amount,

    0
  );

  const selecthandle = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked === true) {
      userSetChecked(true);
    } else {
      userSetChecked(false);
    }
  };

  const handleonSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked === true) {
      setItemToDelete([...itemToDelete, value]);
    } else {
      if (itemToDelete.includes(value)) {
        itemToDelete.pop(value);
      }
    }
  };

  const displayState = () => {
    console.log(itemToDelete);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                value={transaction}
                onChange={selecthandle}
              ></input>
            </th>
            <th>#</th>
            <th>Transaction Name</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  {" "}
                  <input
                    checked={setchecked}
                    type="checkbox"
                    value={item._id}
                    onChange={handleonSelect}
                  ></input>{" "}
                </td>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                {item.type === "income" ? (
                  <td className="text-success">{item.amount}</td>
                ) : (
                  <td className="text-success"></td>
                )}
                {item.type === "expense" ? (
                  <td className="text-danger">-{item.amount} </td>
                ) : (
                  <td className="text-success"></td>
                )}
              </tr>
            );
          })}

          <tr>
            <td></td>
            <td colSpan={2}>Total Amount</td>
            <td>{calculateTotal}</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-grid">
        <Button variant="danger" onClick={displayState} className="text-danger">
          Delete
        </Button>
      </div>
    </div>
  );
};
