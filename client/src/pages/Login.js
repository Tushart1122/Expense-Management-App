import React, { useState, useEffect } from "react";
import { Form, Input, message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("Login successful!");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong during login.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        {loading && <Spinner />}
        <Form
  className="login"
  layout="vertical"
  onFinish={submitHandler}
  autoComplete="on"
>
  <h1>Login Form</h1>

  <Form.Item
    label="Email"
    name="email"
    rules={[{ required: true, message: "Please enter your email!" }]}
  >
    <Input type="email" placeholder="Enter your email" />
  </Form.Item>

  <Form.Item
    label="Password"
    name="password"
    rules={[{ required: true, message: "Please enter your password!" }]}
  >
    <Input.Password placeholder="Enter your password" />
  </Form.Item>
    <div style={{ marginTop: "10px", textAlign: "center" }}>
    <Link to="/forgot-password" className="link-forgot">
      Forgot Password?
    </Link>
  </div>

  {/* Login Button Above */}
  <div className="button-container">
    <button type="submit" className="btn-login">
      Login
    </button>
  </div>

  {/* Register Link with Signup Button beside */}
  <div className="signup-container">
  <span className="signup-text">Not a user?</span>
  <button
    type="button"
    className="btn-signup"
    onClick={() => navigate("/register")}
  >
    Signup now
  </button>
</div>

</Form>

      </div>
    </>
  );
};

export default Login;
