import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-18">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
