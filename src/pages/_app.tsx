
import React, { useState } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import "../app/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <AuthProvider>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
