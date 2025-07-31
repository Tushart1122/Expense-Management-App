import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/layout/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 60%, #d9e4ff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: "24px",
      }}
    >
      {loading && <Spinner />}
      <Form
        className="register-form"
        layout="vertical"
        onFinish={submitHandler}
        style={{
          width: 400,
          padding: 36,
          borderRadius: 14,
          background: "#ffffff",
          boxShadow: "0 10px 30px rgba(33, 66, 150, 0.15)",
          opacity: loading ? 0.6 : 1,
          transition: "opacity 0.3s ease",
        }}
        autoComplete="on"
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2244AA",
            fontWeight: 700,
            fontSize: "2rem",
            letterSpacing: 1,
            marginBottom: 24,
          }}
        >
          Create Account
        </h1>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input
            size="large"
            placeholder="Your full name"
            prefix={<UserOutlined style={{ color: "#2244AA" }} />}
            style={{ borderRadius: 8 }}
            autoComplete="name"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Email address"
            prefix={<MailOutlined style={{ color: "#2244AA" }} />}
            style={{ borderRadius: 8 }}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
          hasFeedback
        >
          <Input.Password
            size="large"
            placeholder="Create a password"
            prefix={<LockOutlined style={{ color: "#2244AA" }} />}
            style={{ borderRadius: 8 }}
            autoComplete="new-password"
          />
        </Form.Item>

        {/* You can add Confirm Password with validation if needed */}

        <button
          type="submit"
          className="btn-register"
          style={{
            width: "100%",
            background: "#2244AA",
            color: "white",
            fontWeight: 700,
            border: "none",
            borderRadius: 8,
            fontSize: 17,
            padding: "12px 0",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 5px 15px rgba(34, 68, 170, 0.4)",
            marginTop: 12,
            transition: "background 0.3s ease",
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 14,
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#2244AA", fontWeight: "600", textDecoration: "none" }}
          >
            Login here
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
