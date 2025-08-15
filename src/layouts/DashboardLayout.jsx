import React, { useState } from "react";
import { Outlet } from "react-router";

import { motion, AnimatePresence } from "framer-motion";
import { BiSolidDonateBlood } from "react-icons/bi";
import {
  FaHome,
  FaBell,
  FaHeartbeat,
  FaBlog,
  FaUsers,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiRefund2Line } from "react-icons/ri";
import { MdManageAccounts } from "react-icons/md";

import Logo from "../components/Logo/Logo";
import ThemeToggle from "../components/Theme/ThemeToggle";
import DashboardNavLink from "../pages/dashboard/common/DashboardNavLink";
import useCurrentDateTime from "../hooks/useCurrentDateTime";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const safeUser = user || {};
  const dateTime = useCurrentDateTime();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: -320, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: -320,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const headerVariants = {
    hidden: { y: -60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navLinks = (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {/* User Info */}
      <motion.div
        className="px-4 py-6 mb-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg mx-3 mt-3"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {safeUser?.photoURL ? (
              <img
                src={safeUser.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            ) : safeUser?.displayName ? (
              <div className="bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center w-full h-full text-lg">
                {safeUser.displayName.charAt(0)}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary to-secondary text-white font-bold flex items-center justify-center w-full h-full text-lg">
                ?
              </div>
            )}
          </motion.div>
          <div>
            <h3 className="font-semibold text-base-content">Hello,</h3>
            <p className="text-sm text-base-content/70 font-medium">
              {safeUser?.displayName || "Anonymous User"}
            </p>
          </div>
        </div>
        <motion.div
          className="text-xs text-base-content/60 bg-base-200 px-3 py-1 rounded-full inline-block"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {dateTime}
        </motion.div>
      </motion.div>

      {/* Main Menu */}
      <motion.div className="px-4 mb-6" variants={itemVariants}>
        <h3 className="text-xs text-base-content/60 uppercase mb-4 font-semibold tracking-wider">
          Main Menu
        </h3>
        <ul className="space-y-2">
          <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <DashboardNavLink
              title={"Dashboard"}
              icon={FaHome}
              location={"/dashboard"}
            />
          </motion.li>
          <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <DashboardNavLink
              title={"Write A Blog"}
              icon={TfiWrite}
              location={"/dashboard/content-management/add-blog"}
            />
          </motion.li>
        </ul>
      </motion.div>

      {/* Donor Panel */}
      {role === "donor" && (
        <motion.div
          className="px-4 mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xs text-base-content/60 uppercase mb-4 font-semibold tracking-wider">
            Donor Panel
          </h3>
          <ul className="space-y-2">
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"Create Donation Requests"}
                icon={FaHeartbeat}
                location={"/dashboard/create-donation-request"}
              />
            </motion.li>
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"My Donation Requests"}
                icon={BiSolidDonateBlood}
                location={"/dashboard/my-donation-requests"}
              />
            </motion.li>
          </ul>
        </motion.div>
      )}

      {/* Volunteer Panel */}
      {role === "volunteer" && (
        <motion.div
          className="px-4 mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xs text-base-content/60 uppercase mb-4 font-semibold tracking-wider">
            Volunteer Panel
          </h3>
          <ul className="space-y-2">
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"All Donation Requests"}
                icon={BiSolidDonateBlood}
                location={"/dashboard/admin/all-blood-donation-request"}
              />
            </motion.li>
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"Content Management"}
                icon={MdManageAccounts}
                location={"/dashboard/content-management"}
              />
            </motion.li>
          </ul>
        </motion.div>
      )}

      {/* Admin Panel */}
      {role === "admin" && (
        <motion.div
          className="px-4 mt-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-xs text-base-content/60 uppercase mb-4 font-semibold tracking-wider">
            Admin Panel
          </h3>
          <ul className="space-y-2">
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"Manage Users"}
                icon={FaUsers}
                location={"/dashboard/admin/all-users"}
              />
            </motion.li>
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"All Donation Requests"}
                icon={BiSolidDonateBlood}
                location={"/dashboard/admin/all-blood-donation-request"}
              />
            </motion.li>
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"Content Management"}
                icon={FaBlog}
                location={"/dashboard/content-management"}
              />
            </motion.li>
            <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <DashboardNavLink
                title={"Fund Records"}
                icon={RiRefund2Line}
                location={"/dashboard/fund-records"}
              />
            </motion.li>
          </ul>
        </motion.div>
      )}

      {/* Settings */}
      <motion.div className="px-4 mt-8" variants={itemVariants}>
        <h3 className="text-xs text-base-content/60 uppercase mb-4 font-semibold tracking-wider">
          Settings
        </h3>
        <ul className="space-y-2">
          <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
            <DashboardNavLink
              title={"Profile"}
              icon={FaUser}
              location={"/dashboard/profile"}
            />
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );

  // --------------------------------------------------------

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <title>Dashboard | BloodGrid</title>

      <motion.header
        className="fixed top-0 left-0 right-0 bg-base-100/95 backdrop-blur-sm z-50 border-b shadow-sm"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between items-center px-6 py-4">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Logo />
          </motion.div>
          <span className="text-xl font-bold text-primary hidden md:inline">
            Dashboard
          </span>

          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <ThemeToggle />
            </motion.div>
            {/* <motion.button
              className="p-2 hover:bg-base-200 rounded-full relative transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBell className="text-base-content/70" />
              <motion.span
                className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.button> */}
            <motion.button
              className="lg:hidden p-2 hover:bg-base-200 rounded-full cursor-pointer transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-base-content/70" />
              ) : (
                <FaBars className="text-base-content/70" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="lg:flex flex-1 pt-[73px]">
        {/* Desktop Sidebar */}
        <motion.aside
          className="hidden lg:block w-80 fixed top-[73px] bottom-0 left-0 border-r shadow-lg z-40 bg-base-100"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
            {navLinks}
          </div>
        </motion.aside>

        {/* Mobile Sidebar (NO animation now) */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed top-[73px] bottom-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <nav
              className="w-80 h-full bg-base-100 shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100">
                {navLinks}
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <motion.main
          className="flex-1 bg-base-100 lg:ml-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="min-h-[calc(100vh-73px)] overflow-y-auto">
            <motion.div
              className="overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
