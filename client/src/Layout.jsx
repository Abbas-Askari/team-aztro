
import React from 'react';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
