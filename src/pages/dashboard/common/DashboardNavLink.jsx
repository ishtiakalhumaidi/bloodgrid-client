import React from "react";
import { NavLink } from "react-router";

const DashboardNavLink = ({ icon: Icon, title, location }) => {
  const handleDrawerClose = () => {
    const drawerToggle = document.getElementById("my-drawer-2");
    if (drawerToggle && window.innerWidth < 1024) {
      drawerToggle.checked = false;
    }
  };

  const activeClassName =
    "bg-gradient-to-r from-red-50 to-pink-50 text-primary border-r-4 border-primary font-medium";
  const inactiveClassName =
    "text-gray-600 hover:bg-gray-50 hover:text-primary transition-all duration-200";

  return (
    <NavLink
      to={location}
      end
      onClick={handleDrawerClose}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg ${
          isActive ? activeClassName : inactiveClassName
        }`
      }
    >
      <Icon className="text-lg" />
      <span>{title}</span>
    </NavLink>
  );
};

export default DashboardNavLink;
