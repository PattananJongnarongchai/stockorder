import React, { useState } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useRouter } from "next/router";
import "../app/globals.css";


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const isLoginPage = router.pathname === "/login";

  return (
    <AuthProvider>
      {!isLoginPage && <Header onToggleSidebar={handleToggleSidebar} />}
      {!isLoginPage && (
        <Sidebar isOpen={isSidebarOpen} onClose={handleToggleSidebar} />
      )}
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
