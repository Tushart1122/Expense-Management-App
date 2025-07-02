import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

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

  return (
    <>
      {/* <style>
        {`
          .custom-navbar {
            background: white;
            color: black;
            padding: 0.8rem 2rem;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }

          .navbar-brand {
            color: black !important;
            font-weight: 700;
            font-size: 1.5rem;
            text-decoration: none;
          }

          .navbar-nav .nav-link {
            color: black !important;
            font-weight: 500;
            font-size: 1.1rem;
            margin-right: 1rem;
          }

          .btn-primary {
            background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
            border: none;
            font-weight: 500;
            border-radius: 6px;
            padding: 6px 16px;
          }

          .btn-primary:hover {
            background: linear-gradient(90deg, #2563eb 0%,rgba(14, 164, 233, 0.72) 100%);
          }
        `}
      </style> */}

      <nav className="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" >
            Hello {loginUser && loginUser.name}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item">
                <p className="nav-link m-0"></p>
              </li>
              <li className="nav-item">
                <button className="btn btn-primary ms-2" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
