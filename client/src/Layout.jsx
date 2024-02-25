import React, { useEffect, useState } from "react";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { Outlet } from "react-router-dom";
import { Chat } from "./components/Chat";
import { io } from "socket.io-client";

const serverURL = "http://localhost:4000";

const Layout = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  // const [socket, setSocket] = useState(io(serverURL));

  return (
    <div>
      <Navbar />
      <div className="relative">
        <Outlet />
        {/* {socket && <Chat socket={socket} collapsed={collapsed} setCollapsed={setCollapsed} messages={messages} setMessages={setMessages}/>} */}
        {/* {children} */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
