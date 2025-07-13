import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBell,
  FaHeartbeat,
  FaSearch,
  FaBlog,
  FaUsers,
  FaDonate,
  FaChartLine,
  FaHandsHelping,
  FaBars,
  FaUser,
} from "react-icons/fa";

import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/Theme/ThemeToggle";
import DashboardNavLink from "../pages/dashboard/common/DashboardNavLink";
import useCurrentDateTime from "../hooks/useCurrentDateTime";
import { format } from "date-fns";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const safeUser = user || {};

  const navLinks = (
    <>
      {/* User Info */}
      <div className="px-4 py-3 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20">
            {safeUser?.photoURL ? (
              <img
                src={safeUser.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : safeUser?.displayName ? (
              <div className="bg-primary text-white font-bold flex items-center justify-center w-full h-full">
                {safeUser.displayName.charAt(0)}
              </div>
            ) : (
              <div className="bg-primary text-white font-bold flex items-center justify-center w-full h-full">
                ?
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Hello,</h3>
            <p className="text-sm text-gray-600">
              {safeUser?.displayName || "Anonymous User"}
            </p>
          </div>
        </div>
        <div className="text-xs text-secondary">
          {format(useCurrentDateTime(), "dd MMMM yyyy, hh:mm:ss a")}
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-4 mb-4">
        <h3 className="text-xs text-secondary uppercase mb-4">Main Menu</h3>
        <ul className="space-y-1">
          <DashboardNavLink title={"Dashboard"} icon={FaHome} location={"/dashboard"} />
          <DashboardNavLink title={"Donation Requests"} icon={FaHeartbeat} location={"/dashboard/donation-requests"} />
          <DashboardNavLink title={"Search Donors"} icon={FaSearch} location={"/dashboard/search"} />
        </ul>
      </div>

      {/* Volunteer Panel */}
      {role === "volunteer" && (
        <div className="px-4 mt-8">
          <h3 className="text-xs text-secondary uppercase mb-4">Volunteer Panel</h3>
          <ul className="space-y-1">
            <DashboardNavLink title={"Create Request"} icon={FaHandsHelping} location={"/dashboard/volunteer/create-request"} />
            <DashboardNavLink title={"View Fundings"} icon={FaDonate} location={"/dashboard/volunteer/funds"} />
          </ul>
        </div>
      )}

      {/* Admin Panel */}
      {role === "admin" && (
        <div className="px-4 mt-8">
          <h3 className="text-xs text-secondary uppercase mb-4">Admin Panel</h3>
          <ul className="space-y-1">
            <DashboardNavLink title={"Manage Users"} icon={FaUsers} location={"/dashboard/admin/users"} />
            <DashboardNavLink title={"Manage Blogs"} icon={FaBlog} location={"/dashboard/admin/blogs"} />
            <DashboardNavLink title={"Site Overview"} icon={FaChartLine} location={"/dashboard/admin/overview"} />
          </ul>
        </div>
      )}

      {/* Settings */}
      <div className="px-4 mt-8">
        <h3 className="text-xs text-secondary uppercase mb-4">Settings</h3>
        <ul className="space-y-1">
          <DashboardNavLink title={"Profile"} icon={FaUser} location={"/dashboard/profile"} />
        </ul>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <title>Dashboard | BloodGrid</title>

      <header className="fixed top-0 left-0 right-0 bg-base-100 z-50 border-b shadow-sm">
        <div className="flex justify-between items-center px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-bold text-primary hidden md:inline">Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <FaBell className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden p-2 hover:bg-gray-100 rounded-full cursor-pointer">
              <FaBars className="text-gray-600" />
            </label>
          </div>
        </div>
      </header>

      <div className="lg:flex flex-1 pt-[61px]">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 fixed top-[61px] bottom-0 left-0 border-r shadow z-40">
          <div className="h-full overflow-y-auto">{navLinks}</div>
        </aside>

        {/* Drawer (Mobile) */}
        <div className="drawer lg:hidden">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side fixed top-[61px] bottom-0 left-0 z-40">
            <label htmlFor="my-drawer-2" className="drawer-overlay bg-black/50"></label>
            <nav className="w-80 min-h-full bg-base-100">{navLinks}</nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-base-100 lg:ml-80">
          <div className="min-h-[calc(100vh-61px)] overflow-y-auto">
            <div className="overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
