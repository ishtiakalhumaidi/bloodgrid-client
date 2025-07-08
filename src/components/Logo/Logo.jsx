import React from "react";
import logo from "/logo.png";
import { Link, Links } from "react-router";

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-center md:gap-2 gap-1">
      <img src={logo} className="w-6 md:w-9 -mt-3" alt="BloodGrid Logo" />
      <h1 className="text-2xl md:text-4xl font-semibold">
        <span className="text-primary">Blood</span>Grid
      </h1>
    </Link>
  );
};

export default Logo;
