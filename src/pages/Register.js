import { Alert } from "react-bootstrap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { CustomInput } from "../components/customInput/CustomInput";
import { Layout } from "../components/layout/Layout";
import { registerUser } from "../helper/axiosHelper";

export const Register = () => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState({});
  const inputFields = [
    {
      label: "Name",
      placeholder: "Enter your Name",
      required: true,
      name: "name",
      type: "text",
    },
    {
      label: "Email",
      placeholder: "Enter your Email",
      required: true,
      name: "email",
      type: "email",
    },
    {
      label: "Pin",
      placeholder: "123",
      required: true,
      name: "pin",
      type: "password",
      min: 1000,
      max: 9999,
    },
  ];

  const onChangeListener = (e) => {
    console.log(e);
    const { value, name } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const { data } = await registerUser(form);
    setResponse(data);
    console.log(data);
  };
  return (
    <Layout>
      <Form onSubmit={handleOnSubmit} className="login-page">
        <h2>Register</h2>
        <hr />
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {inputFields.map((item, index) => (
          <CustomInput key={index} {...item} onChange={onChangeListener} />
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <div className="text-end">
          Already have an account? <Link to="/">Login </Link>
        </div>
      </Form>
    </Layout>
  );
};
