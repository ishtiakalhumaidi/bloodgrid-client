import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/Theme/ThemeToggle";

const AuthLayout = () => {
  return (
    <div>
     <div className="flex justify-between max-w-10/12 mx-auto py-3">
       <Logo />
      <ThemeToggle/>
     </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
