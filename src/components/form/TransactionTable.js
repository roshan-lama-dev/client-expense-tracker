import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { deleteTransaction } from "../../helper/axiosHelper";
export const TransctionTable = ({ transaction, fetchTransaction }) => {
  const [setchecked, userSetChecked] = useState(false);

  const [itemToDelete, setItemToDelete] = useState([]);
  const calculateTotal = transaction.reduce(
    (acc, { amount, type }) =>
      type === "expense" ? acc - +amount : acc + +amount,

    0
  );

  const selecthandle = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setItemToDelete(transaction.map((item) => item._id));
    } else {
      setItemToDelete([]);
    }
  };

  // create another handleonselect for the main checbox that adds all the trnascaation id into the itemtodelete usestate.

  // give the includes it property to the checked status of the body checkbox

  // handleOnChange for the body checkbox
  const handleonSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);

    checked
      ? setItemToDelete([...itemToDelete, value])
      : setItemToDelete(itemToDelete.filter((item) => item !== value));

    // console.log(itemToDelete);
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delte the trsansaction?")) {
      const { status, message } = await deleteTransaction(itemToDelete);

      if (status === "success") {
        fetchTransaction();
        setItemToDelete([]);
      } else {
        console.log(message);
      }
    }
  };
  console.log(itemToDelete);

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
                checked={
                  transaction.length
                    ? transaction.length === itemToDelete.length
                    : false
                }

                // why does the array hold the length even after deletion.
                // why can't we use if else inside the checked property
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
                    // checked={}
                    type="checkbox"
                    value={item._id}
                    onChange={handleonSelect}
                    checked={itemToDelete.includes(item._id)}
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

          <tr className="fw-bold">
            <td></td>
            <td colSpan={3}>Total Amount</td>
            <td>{calculateTotal}</td>
          </tr>
        </tbody>
      </Table>

      {itemToDelete.length ? (
        <div className="d-grid">
          <Button
            variant="danger"
            onClick={handleOnDelete}
            className="text-danger"
          >
            Delete {itemToDelete.length} item(s)
          </Button>
        </div>
      ) : null}
    </div>
  );
};
