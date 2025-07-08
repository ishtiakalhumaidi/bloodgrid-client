import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
