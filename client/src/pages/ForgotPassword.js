import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // You need to implement /users/forgot-password in your backend
      await axios.post("/users/forgot-password", { email: values.email });
      setLoading(false);
      message.success("Password reset instructions sent to your email!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f5f5fa" }}>
      <Form
        className="forgot-password-form"
        layout="vertical"
        onFinish={onFinish}
        style={{
          background: "white",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          width: 360,
        }}
      >
        <h2 style={{textAlign:"center"}}>Forgot Password?</h2>
        <p style={{color:"#888", textAlign:"center", marginBottom: 24, fontSize:14}}>Enter your email and we'll send you a reset link.</p>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email." }
          ]}
        >
          <Input placeholder="e.g. user@example.com" autoFocus />
        </Form.Item>
        <button
          type="submit"
          className="btn-forgot"
          style={{
            width:"100%",
            background: "#4a77ff",
            color:"white",
            border:"none",
            borderRadius: 8,
            padding: "10px 0",
            fontWeight: 700,
            fontSize:16,
            cursor: loading ? "not-allowed":"pointer",
            transition: "background 0.2s"
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
