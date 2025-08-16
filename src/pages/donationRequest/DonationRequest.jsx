import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
import React, { useState } from "react";
import Loader from "../../components/common/Loader";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { BiSolidDonateBlood } from "react-icons/bi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const DonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("all");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const {
    data: requests = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["donationRequests", "pending", selectedBloodGroup],
    queryFn: async () => {
      const res = await axiosInstance.get("/donation-requests", {
        params: {
          status: "pending",
          bloodGroup: selectedBloodGroup,
        },
      });
      return res.data;
    },
    keepPreviousData: false, // don’t reuse stale data
    staleTime: 0, // always refetch
  });

  if (isError)
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl font-semibold text-error">
            Failed to load requests
          </p>
          <p className="text-base-content/70 mt-2">Please try again later</p>
        </div>
      </div>
    );

  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-primary rotate-45 -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-accent rotate-45 -translate-y-1/2" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Blood Donation{" "}
            <span className="text-primary relative">
              Requests
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
            </span>
          </h2>
          <p className="text-base md:text-xl text-base-content/80 max-w-2xl mx-auto">
            Help save lives by donating blood to those in critical need. Every
            donation makes a difference.
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <FaFilter className="text-primary w-5 h-5" />
              <span className="text-lg font-semibold">
                Filter by Blood Group:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBloodGroup("all")}
                className={`btn btn-sm ${
                  selectedBloodGroup === "all"
                    ? "btn-primary"
                    : "btn-outline btn-primary"
                }`}
              >
                All Groups
              </button>

              {bloodGroups.map((bloodGroup) => (
                <button
                  key={bloodGroup}
                  onClick={() => setSelectedBloodGroup(bloodGroup)}
                  className={`btn btn-sm ${
                    selectedBloodGroup === bloodGroup
                      ? "btn-primary"
                      : "btn-outline btn-primary"
                  }`}
                >
                  {bloodGroup}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-center">
            <p className="text-base-content/70">
              {isFetching
                ? "Loading..."
                : selectedBloodGroup === "all"
                ? `Showing all ${requests.length} requests`
                : `Showing ${requests.length} requests for ${selectedBloodGroup} blood group`}
            </p>
          </div>
        </motion.div>

        {/* Requests Grid */}
        <div className="min-h-[300px]">
          {isLoading || isFetching ? (
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          ) : requests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="card bg-base-200 shadow-lg max-w-md mx-auto">
                <div className="card-body p-12 text-center">
                  <BiSolidDonateBlood className="text-6xl text-base-content/30 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-base-content mb-2">
                    {selectedBloodGroup === "all"
                      ? "No blood donation requests found"
                      : `No requests found for ${selectedBloodGroup} blood group`}
                  </h3>
                  <p className="text-base-content/70">
                    {selectedBloodGroup !== "all" &&
                      "Try selecting a different blood group or check back later."}
                  </p>
                  {selectedBloodGroup !== "all" && (
                    <button
                      onClick={() => setSelectedBloodGroup("all")}
                      className="btn btn-primary btn-sm mt-4"
                    >
                      Show All Requests
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {requests.map((request) => (
                <motion.div
                  key={request._id}
                  variants={itemVariants}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group border border-base-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="card-body p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-base-content mb-1 group-hover:text-primary transition-colors">
                          {request.recipientName}
                        </h3>
                        <p className="text-sm text-base-content/70">
                          Requested by {request.requesterName}
                        </p>
                      </div>
                      <div className="badge badge-primary badge-lg gap-2">
                        <FaTint className="w-3 h-3" />
                        {request.bloodGroup}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 mb-3 text-base-content/80">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <FaMapMarkerAlt className="text-primary text-sm" />
                      </div>
                      <span className="text-sm">
                        {request.recipientUpazila}, {request.recipientDistrict}
                      </span>
                    </div>

                    {/* Hospital */}
                    <div className="flex items-center gap-2 mb-3 text-base-content/80">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <FaHospital className="text-primary text-sm" />
                      </div>
                      <span className="text-sm">{request.hospitalName}</span>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-base-content/80">
                        <FaCalendarAlt className="text-primary text-sm" />
                        <span className="text-sm">{request.donationDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base-content/80">
                        <FaClock className="text-primary text-sm" />
                        <span className="text-sm">{request.donationTime}</span>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <p className="text-sm text-base-content/70 line-clamp-2">
                        {request.requestMessage}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/donation-request/${request._id}`}
                      className="btn btn-primary w-full group-hover:btn-secondary transition-all duration-300"
                    >
                      <span>View Details</span>
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="card bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg">
            <div className="card-body p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Save a Life?</h3>
              <p className="text-base-content/80 max-w-2xl mx-auto mb-6">
                Every blood donation can save up to three lives. Join our
                community of heroes and make a difference today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <Link
                    to="/dashboard/create-donation-request"
                    className="btn btn-primary"
                  >
                    <BiSolidDonateBlood className="w-5 h-5" />
                    Create Request
                  </Link>
                ) : (
                  <Link to="/auth/register" className="btn btn-primary">
                    Join as Donor
                  </Link>
                )}
                <Link to="/search-donor" className="btn btn-outline">
                  Find Donors
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationRequest;
