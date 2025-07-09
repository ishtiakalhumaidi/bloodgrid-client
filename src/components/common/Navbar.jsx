import React from "react";
import Logo from "../Logo/Logo";
import ThemeToggle from "../Theme/ThemeToggle";
import Container from "./Container";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/donation-requests'}>Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to={'/blog'}>Blog</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-200">
      <Container>
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks}
              </ul>
            </div>
            <Logo />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
          </div>

          <div className="navbar-end gap-2">
            <ThemeToggle />
            <Link to={'/auth/register'} className="btn btn-primary hidden lg:flex">Register</Link>
            <a className="btn btn-primary btn-outline">Button</a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
