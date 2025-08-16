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
} from "react-icons/fa";
import React from "react";
import Loader from "../../components/common/Loader";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { BiSolidDonateBlood } from "react-icons/bi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const {
    data: requests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["donationRequests", "pending"],
    queryFn: async () => {
      const res = await axiosInstance.get("/donation-requests?status=pending");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (isError)
    return (
      <div className="min-h-96 flex justify-center items-center">
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
    <div
      data-aos="fade-up"
      // data-aos-delay="300"
      data-aos-duration="1200"
      className="px-4 py-12 lg:max-w-10/12 mx-auto"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaTint className="text-4xl text-red-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Blood Donation Requests
          </h1>
        </div>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Help save lives by donating blood to those in critical need. Every
          donation makes a difference.
        </p>
      </motion.div>

      {/* Requests Grid */}
      {requests.length === 0 ? (
        <div className="col-span-full">
          <div className="bg-base-100 rounded-xl shadow-lg p-12 text-center border border-base-300">
            <BiSolidDonateBlood className="text-6xl text-base-content/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-base-content mb-2">
              No blood donation requests found.
            </h3>
          </div>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {requests.map((request) => (
            <motion.div
              key={request._id}
              variants={itemVariants}
              className="bg-base-200  rounded-2xl shadow-lg border border-b-0 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-base-content mb-1">
                      {request.recipientName}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      Requested by {request.requesterName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-base-300  rounded-full">
                    <FaTint className="text-red-600 text-sm" />
                    <span className="font-bold text-red-600 ">
                      {request.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-base-content/80">
                  <FaMapMarkerAlt className="text-primary text-sm" />
                  <span className="text-sm">
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-base-content/80">
                  <FaHospital className=" text-sm" />
                  <span className="text-sm">{request.hospitalName}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-base-content/80">
                    <FaCalendarAlt className=" text-sm" />
                    <span className="text-sm">{request.donationDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base-content/80">
                    <FaClock className="text-orange-500 text-sm" />
                    <span className="text-sm">{request.donationTime}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    {request.requestMessage}
                  </p>
                </div>

                <Link
                  to={`/donation-request/${request._id}`}
                  className="btn btn-primary w-full group-hover:btn-secondary transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>View Details</span>
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              <div className="h-1 bg-gradient-to-r from-red-500 to-pink-500"></div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default DonationRequest;
