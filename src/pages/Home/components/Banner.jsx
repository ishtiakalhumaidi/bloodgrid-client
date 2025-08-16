import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FiArrowRight, FiHeart, FiUsers } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import bannerImg from "../../../assets/images/banner.png";
import bannerBG from "/BannerBG.svg";

const Banner = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <section className="relative min-h-screen pb-10 sc flex items-center overflow-hidden">
      {/* Background with banner image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${bannerBG})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-base-100/80 via-base-100/60 to-base-100/80"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Mobile Image - Shows on top for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:hidden order-1 flex justify-center"
          >
            <div className="relative max-w-xs">
              <img
                src={bannerImg}
                alt="Blood Donation"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 text-center lg:text-left space-y-6"
          >
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Be the <span className="text-primary relative">Lifeline</span>
              <br />
              Someone's Waiting For.
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-base-content/70 max-w-lg mx-auto lg:mx-0">
              Join our network of life-saving donors or find a hero near you —
              in just a few clicks.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {user && role === "donor" ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/dashboard/create-donation-request"
                    className="btn btn-primary btn-lg px-8 group"
                  >
                    Create Donation Request
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </motion.div>
              ) : (
                !user && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/auth/register"
                      className="btn btn-primary btn-lg px-8 group"
                    >
                      <FiHeart className="w-5 h-5" />
                      Join as a Donor
                    </Link>
                  </motion.div>
                )
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/search-donor"
                  className="btn btn-outline btn-lg px-8 group"
                >
                  <FiUsers className="w-5 h-5" />
                  Search Donors
                </Link>
              </motion.div>
            </div>

            {/* Simple Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-8 text-sm text-base-content/60"
            >
              <div className="text-center lg:text-left">
                <div className="font-bold text-lg text-primary">50K+</div>
                <div>Active Donors</div>
              </div>
              <div className="w-px h-8 bg-base-content/20"></div>
              <div className="text-center lg:text-left">
                <div className="font-bold text-lg text-primary">10K+</div>
                <div>Lives Saved</div>
              </div>
              <div className="w-px h-8 bg-base-content/20"></div>
              <div className="text-center lg:text-left">
                <div className="font-bold text-lg text-primary">64</div>
                <div>Districts</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Desktop Image - Hidden on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end"
          >
            <div className="relative max-w-md">
              <motion.img
                src={bannerImg}
                alt="Blood Donation"
                className="w-full h-auto object-contain"
                animate={{ y: [0, -10, 0], x: [-20, 0, -20] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-1 h-8 bg-primary/30 rounded-full"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;
