import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/customInput/CustomInput";
import { Layout } from "../components/layout/Layout";
import { loginUser } from "../helper/axiosHelper";

export const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "ram@ram.com",
    pin: "1234",
  });
  const [response, setResponse] = useState({});
  const inputFields = [
    {
      label: "Email",
      placeholder: "Enter your Email",
      required: true,
      name: "email",
      type: "email",
      value: loginForm.email,
    },
    {
      label: "Pin",
      placeholder: "123",
      required: true,
      name: "pin",
      type: "password",
      value: loginForm.pin,
      min: 1000,
      max: 9999,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setLoginForm({
      ...loginForm,

      [name]: value,
    });
  };

  const handleOnLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(loginForm);

    const { data } = await loginUser(loginForm);
    setResponse(data);

    if (data.status === "success") {
      navigate("/dashboard");
      sessionStorage.setItem("user", JSON.stringify(data.result));
    }
  };
  return (
    <Layout>
      <Form onSubmit={handleOnLoginSubmit} className="login-page">
        <h2>Welcome Back</h2>
        <hr />
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {inputFields.map((item, index) => (
          <CustomInput key={index} {...item} onChange={handleOnChange} />
        ))}

        <Button variant="primary" type="submit">
          Login
        </Button>

        <div className="text-end">
          New Here? <Link to="/register">Register</Link>
        </div>
      </Form>
    </Layout>
  );
};
