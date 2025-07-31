import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
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
      message.error("Invalid credentials. Please try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f8ff 60%, #e6eeff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "auto"
    }}>
      {loading && <Spinner />}
      <Form
        className="login-form"
        layout="vertical"
        onFinish={submitHandler}
        autoComplete="on"
        style={{
          width: 380,
          padding: "36px 32px 32px 32px",
          borderRadius: 14,
          background: "#fff",
          boxShadow: "0 8px 32px rgba(50,76,174,0.08)",
          position: "relative",
          zIndex: 10,
          opacity: loading ? 0.6 : 1,
          transition: "opacity .36s"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: 10,
            color: "#23367b",
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: 1.2
          }}
        >
          Sign In
        </h1>
        <p style={{ textAlign: "center", color: "#999", marginBottom: 24 }}>Welcome back! Login to your account.</p>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input
            prefix={<MailOutlined style={{ color: "#4a77ff" }} />}
            type="email"
            size="large"
            placeholder="Enter your email"
            autoComplete="username"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "#4a77ff" }} />}
            size="large"
            placeholder="Enter your password"
            autoComplete="current-password"
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <div style={{ textAlign: "right", marginBottom: 16 }}>
          <Link to="/forgot-password" style={{ color: "#4a77ff", fontWeight: 500, fontSize: 14, textDecoration: "none" }}>
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn-login"
          style={{
            width: "100%",
            background: "#23367b",
            color: "white",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 17,
            padding: "12px 0",
            marginBottom: 16,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 24px #a0bfff26",
            transition: "background .2s"
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#888", marginRight: 6 }}>Not a user?</span>
          <button
            type="button"
            className="btn-signup"
            style={{
              background: "#4a77ff",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "7px 18px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 15,
              boxShadow: "0 2px 10px #4a77ff22",
              marginLeft: 8,
              outline: "none"
            }}
            onClick={() => navigate("/register")}
            disabled={loading}
          >
            Signup now
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
