import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";

const LandingPage = () => {
  return (
    <>
      <div className="background-wrapper">
        {/* Inline styles injected here */}
        <style>
          {`
            .background-wrapper {
              background-image: url("/myimage.jpg");
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              background-attachment: fixed;
              min-height: 100vh;
              width: 100%;
              display: flex;
              flex-direction: column;
            }

            .overlay {
              background-color: rgba(0, 0, 0, 0.6);
              flex: 1;
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }

            .content-wrap {
              flex: 1;
              padding: 1rem;
            }

            .custom-navbar {
              background: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(8px);
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              padding: 0.8rem 2rem;
            }

            .navbar-brand {
              color: #fff !important;
              font-weight: 700;
              font-size: 1.5rem;
            }

            .navbar-nav .nav-link {
              color: #fff !important;
              font-weight: 500;
              margin-right: 1.5rem;
            }

            .btn-primary {
              background: linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%);
              border: none;
              color: #fff;
              font-weight: 600;
              border-radius: 8px;
              padding: 8px 24px;
            }

            .footer {
              width: 100%;
              background: rgba(0, 0, 0, 0.7);
              color: #f1f5f9;
              padding: 1rem 0;
              text-align: center;
              font-size: 0.9rem;
              margin-top: auto;
            }
          `}
        </style>

        <div className="overlay">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg fixed-top custom-navbar" style={{ zIndex: 1000 }}>
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Welcome</Link>

              {/* Toggle button for collapsed navbar */}
              <button
                className="navbar-toggler bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="content-wrap container text-center text-white" style={{ paddingTop: "100px" }}>
            <h1 className="display-4 fw-bold mb-3">Welcome to <span className="text-info">FinTrack</span></h1>
            <p className="lead mb-5">FinTrack is your smart, secure, and seamless solution for managing personal and business expenses.</p>

            {/* Info Box */}
            <div className="row justify-content-center mx-auto rounded-4 p-4" style={{
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(12px)",
              color: "#f8fafc",
              maxWidth: "1000px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)"
            }}>
              <div className="col-md-5 text-start mb-4">
                <h5 className="fw-semibold text-info">Why FinTrack?</h5>
                <ul className="list-unstyled">
                  <li>✓ Track income and expenses in real-time</li>
                  <li>✓ Visualize your spending with powerful charts</li>
                  <li>✓ Categorize transactions for better clarity</li>
                  <li>✓ Set budgets and receive smart alerts</li>
                  <li>✓ Access your data securely anytime, anywhere</li>
                </ul>
              </div>
              <div className="col-md-5 text-start">
                <h5 className="fw-semibold text-info">Our Mission</h5>
                <p>Our goal is to simplify financial management by offering a clean, user-friendly interface and powerful tools.</p>
                <p>With FinTrack, you're not just recording expenses — you're gaining insights, building habits, and moving toward financial wellness.</p>
              </div>
            </div>

            <Link to="/register" className="btn btn-outline-light btn-lg mt-5">Get Started</Link>
            <div style={{ height: "10vh" }}></div>
          </div>

          {/* Footer fixed at bottom */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
