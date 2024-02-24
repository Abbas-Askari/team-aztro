
import React from 'react';
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
        {/* {children} */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
