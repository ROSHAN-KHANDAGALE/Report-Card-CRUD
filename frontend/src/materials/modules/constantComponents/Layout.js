// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      className="layout"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
