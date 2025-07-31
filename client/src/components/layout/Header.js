import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Dropdown, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  // User Initial Avatar Logic
  const getInitial = (user) =>
    user && user.name ? user.name.charAt(0).toUpperCase() : "?";

  // Dropdown Menu for Avatar Actions
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" disabled>
        <UserOutlined /> Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logoutHandler}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="exp-header">
      <div className="exp-header-left">
        <span className="exp-logo">💸</span>
        <span className="exp-appname">ExpenseApp</span>
      </div>
      <div className="exp-header-center">
        <span className="exp-greet">
          Hello, <span style={{ fontWeight: 600 }}>{loginUser && loginUser.name}</span>
        </span>
        <span className="exp-tagline">Track. Save. Grow. 🚀</span>
      </div>
      <div className="exp-header-right">
        {loginUser ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <span className="user-avatar">{getInitial(loginUser)}</span>
          </Dropdown>
        ) : (
          <button className="btn btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
