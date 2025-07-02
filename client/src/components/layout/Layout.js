import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="content-wrap">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
