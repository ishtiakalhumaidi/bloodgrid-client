import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaHospital,
  FaMapMarkerAlt,
  FaTint,
  FaUser,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaHeart,
  FaInfoCircle,
  FaPhone,
  FaCommentMedical,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/common/Loader";
import useRole from "../../hooks/useRole";

const DonationRequestDetails = () => {
  const { role } = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data: request, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return axiosSecure.patch(`/donation-requests/${id}/donate`, {
        donorName: user.displayName,
        donorEmail: user?.email,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["donation-request", id]);
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your interest to donate has been recorded.",
        background: "#fff",
        color: "#333",
      });
      setShowModal(false);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again later.",
        background: "#fff",
        color: "#333",
      });
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  if (isLoading)
    return (
      <div className="h-96 flex justify-center items-center">
        <Loader />
      </div>
    );
  if (!request)
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <div className="text-center">
          <FaExclamationTriangle className="text-6xl text-warning mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-base-content mb-2">
            Request not found
          </h2>
          <p className="text-base-content/70 mb-6">
            The requested donation request could not be found.
          </p>
          <button
            onClick={() => navigate("/donation-requests")}
            className="btn btn-primary"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    iconColor = "text-primary",
  }) => (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-3 p-4 bg-base-100 rounded-xl border border-base-300 hover:shadow-md transition-shadow duration-200"
    >
      <Icon className={`text-xl ${iconColor} mt-1 flex-shrink-0`} />
      <div className="flex-1">
        <p className="font-medium text-base-content/80 text-sm">{label}</p>
        <p className="text-base-content font-semibold">{value}</p>
      </div>
    </motion.div>
  );
  return (
    <div className="min-h-screen bg-base-200">
      <motion.div
        className="max-w-4xl mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <button
            onClick={() => navigate("/donation-requests")}
            className="btn btn-ghost btn-sm mb-4 gap-2"
          >
            <FaArrowLeft />
            Back to Requests
          </button>

          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-4"
            >
              <FaTint className="text-5xl text-primary" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
              Blood Donation Request
            </h1>
            <p className="text-base-content/70">
              Help save a life by donating blood
            </p>
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-8"
        >
          <div
            className={`badge badge-lg px-4 py-2 gap-2 ${
              request.status === "pending"
                ? "badge-warning"
                : request.status === "inprogress"
                ? "badge-info"
                : "badge-success"
            }`}
          >
            <FaInfoCircle />
            {request.status === "pending"
              ? "Pending"
              : request.status === "inprogress"
              ? "In Progress"
              : "Completed"}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipient Information */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FaUser className="text-xl text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Recipient Information
                  </h3>
                  <p className="text-base-content/70">
                    Patient details and requirements
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem
                  icon={FaUser}
                  label="Recipient Name"
                  value={request.recipientName}
                  iconColor="text-primary"
                />
                <InfoItem
                  icon={FaTint}
                  label="Required Blood Group"
                  value={request.bloodGroup}
                  iconColor="text-error"
                />
                <InfoItem
                  icon={FaMapMarkerAlt}
                  label="Location"
                  value={`${request.recipientUpazila}, ${request.recipientDistrict}`}
                  iconColor="text-success"
                />
                <InfoItem
                  icon={FaHospital}
                  label="Hospital"
                  value={request.hospitalName}
                  iconColor="text-info"
                />
                <InfoItem
                  icon={FaCalendarAlt}
                  label="Required Date"
                  value={request.donationDate}
                  iconColor="text-secondary"
                />
                <InfoItem
                  icon={FaClock}
                  label="Required Time"
                  value={request.donationTime}
                  iconColor="text-accent"
                />
              </div>
            </motion.div>

            {/* Request Message */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <FaCommentMedical className="text-xl text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Request Message
                  </h3>
                  <p className="text-base-content/70">
                    Details about the blood requirement
                  </p>
                </div>
              </div>
              <div className="bg-base-200 rounded-xl p-4 border-l-4 border-primary">
                <p className="text-base-content leading-relaxed">
                  {request.requestMessage}
                </p>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <FaMapMarkerAlt className="text-xl text-success" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Full Address
                  </h3>
                  <p className="text-base-content/70">
                    Complete location details
                  </p>
                </div>
              </div>
              <div className="bg-base-200 rounded-xl p-4">
                <p className="text-base-content">{request.addressLine}</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Requester & Action */}
          <div className="space-y-6">
            {/* Requester Information */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-accent/10 rounded-full">
                  <FaUser className="text-xl text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-base-content">
                    Requester
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaUser className="text-primary" />
                  <div>
                    <p className="font-medium text-base-content">
                      {request.requesterName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />
                  <div>
                    <p className="font-medium text-base-content">
                      {request.requesterEmail}
                    </p>
                    <p className="text-sm text-base-content/70">
                      Email Contact
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Donation Action */}
            {request.donor ? (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 shadow-lg border border-base-300"
              >
                <div className="text-center mb-6">
                  <FaHeart className="text-4xl text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-info mb-2">Donor</h3>
                  <p className="text-base-content/70">{request?.donor?.name}</p>
                  <a
                    href={`mailto:${request?.donor?.email}`}
                    className="text-blue-300 hover:underline"
                  >
                    {request?.donor?.email}
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 shadow-lg border border-base-300"
              >
                <div className="text-center mb-6">
                  <FaHeart className="text-4xl text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-base-content mb-2">
                    Ready to Save a Life?
                  </h3>
                  <p className="text-base-content/70">
                    Your blood donation can make all the difference.
                  </p>
                </div>

                {role === "admin" ? (
                  <button
                    className="btn btn-disabled w-full btn-lg gap-2 text-gray-500 text-xs"
                    disabled
                  >
                    Admins cannot donate blood
                  </button>
                ) : user?.email === request.requesterEmail ? (
                  <button
                    className="btn btn-disabled w-full btn-lg gap-2 text-red-500 text-xs"
                    disabled
                  >
                    You can't donate to your own request
                  </button>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary w-full btn-lg gap-2"
                  >
                    <FaHeart />
                    Donate Blood
                  </button>
                )}
              </motion.div>
            )}

            {/* Help Information */}
            <motion.div
              variants={itemVariants}
              className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-info/10 rounded-full">
                  <FaInfoCircle className="text-xl text-info" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-base-content">
                    Important Notes
                  </h3>
                </div>
              </div>
              <div className="space-y-3 text-sm text-base-content/70">
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-success mt-0.5 flex-shrink-0" />
                  <p>Ensure you meet all donation requirements</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-success mt-0.5 flex-shrink-0" />
                  <p>Bring a valid ID when donating</p>
                </div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle className="text-success mt-0.5 flex-shrink-0" />
                  <p>Stay hydrated before donation</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Donation Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-base-100 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-base-300"
              >
                <div className="text-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                    <FaHeart className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-base-content mb-2">
                    Confirm Your Donation
                  </h3>
                  <p className="text-base-content/70">
                    Thank you for your willingness to help save a life
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-base-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FaUser className="text-primary" />
                      <span className="font-medium text-base-content">
                        Your Name
                      </span>
                    </div>
                    <p className="text-base-content/80 ml-6">
                      {user.displayName}
                    </p>
                  </div>
                  <div className="bg-base-200 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <FaEnvelope className="text-primary" />
                      <span className="font-medium text-base-content">
                        Your Email
                      </span>
                    </div>
                    <p className="text-base-content/80 ml-6">{user?.email}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn btn-ghost flex-1"
                  >
                    <FaTimes />
                    Cancel
                  </button>
                  <button
                    onClick={() => mutation.mutate()}
                    className="btn btn-primary flex-1"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        Confirm
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DonationRequestDetails;
