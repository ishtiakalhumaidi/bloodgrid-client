import React from "react";
import Logo from "../Logo/Logo";
import ThemeToggle from "../Theme/ThemeToggle";
import Container from "./Container";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { errorCap } from "../../utils/errorMessageCap";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged Out Successfully",
          text: "You have been logged out of your account.",
          background: "#f0f9ff",
          color: "#1e3a8a",
          iconColor: "#10b981",
          showConfirmButton: false,
          timer: 1800,
          customClass: {
            popup: "rounded-xl shadow-lg px-6 py-5",
            title: "text-base font-semibold",
            htmlContainer: "text-sm",
          },
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.code ? errorCap(err.code) : "Something went wrong.",
          color: "#333",
          iconColor: "#e74c3c",
          showConfirmButton: false,
          timer: 1800,
          toast: false,
          customClass: {
            popup: "shadow-lg rounded-md px-6 py-4",
            title: "text-lg font-semibold",
          },
        });
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/search-donor"}>Find A Donor</NavLink>
      </li>
      <li>
        <NavLink to={"/donation-requests"}>Donation Requests</NavLink>
      </li>
      <li>
        <NavLink to={"/blogs"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/fundraiser"}>Fundraiser</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
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
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border">
                    {user?.photoURL ? (
                      <img
                        className="object-cover w-full h-full"
                        src={user.photoURL}
                      />
                    ) : (
                      <FaUser className="w-full h-full p-1  rounded-full" />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={"/dashboard"} className="justify-between">
                      Dashboard
                      <span className="badge">New</span>
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to={"/auth/register"}
                  className="btn btn-primary hidden lg:flex"
                >
                  Register
                </Link>
                <Link
                  to={"/auth/login"}
                  className="btn hover:bg-base-content hover:text-base-200 btn-outline"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
