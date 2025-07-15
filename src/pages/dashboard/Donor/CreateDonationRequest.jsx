import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHospital,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaCommentMedical,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get("/districts.json");
        setDistricts(res.data);
      } catch (err) {
        console.error("Error fetching districts:", err);
      }
    };

    fetchDistricts();
  }, []);

  // upazila fetch
  useEffect(() => {
    const fetchUpazilas = async () => {
      if (!selectedDistrict) return;

      try {
        const res = await axios.get("/upazilas.json");
        const filteredUpazilas = res.data.filter(
          (upazila) => String(upazila.district_id) === String(selectedDistrict) // ensure type match
        );
        setUpazilas(filteredUpazilas);
      } catch (err) {
        console.error("Error fetching upazilas:", err);
      }
    };

    fetchUpazilas();
  }, [selectedDistrict]);

  const { data: userInfo, isLoading } = useQuery({
    queryKey: [user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (userInfo?.status === "blocked") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are currently blocked and cannot create a donation request.",
        background: "var(--fallback-b1,oklch(var(--b1)/1))",
        color: "var(--fallback-bc,oklch(var(--bc)/1))",
      });
      return;
    }

    setIsSubmitting(true);
    const selectedDistrictData = districts.find(
      (district) => district.id == data.recipientDistrict
    );

    const requestData = {
      ...data,
      recipientDistrict: selectedDistrictData.name,
      requesterName: user.displayName,
      requesterEmail: user?.email,
    };

    try {
      const res = await axiosSecure.post("/donation-requests", requestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created!",
          text: "Your blood donation request has been submitted successfully.",
          background: "#ffffff",
          color: "#333333",
          confirmButtonColor: "#48484a",
          confirmButtonText: "Great!",
        });

        reset();
        setSelectedDistrict("");
        setUpazilas([]);
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not submit the donation request.",
        background: "var(--fallback-b1,oklch(var(--b1)/1))",
        color: "var(--fallback-bc,oklch(var(--bc)/1))",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const InputWrapper = ({ children, icon: Icon, error, label }) => (
    <div className="relative">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 z-10" />
        )}
        <div className={Icon ? "pl-10" : ""}>{children}</div>
      </div>
      {error && (
        <p className="text-error text-sm mt-1 transition-opacity duration-200">
          {label} is required
        </p>
      )}
    </div>
  );

  if (isLoading) return <Loader />;

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
        variants={itemVariants}
      >
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-6 border-b border-base-300"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaHandHoldingHeart className="text-3xl text-primary" />
            </motion.div>
            <h2 className="text-3xl font-bold text-base-content">
              Create Donation Request
            </h2>
          </div>
          <p className="text-base-content/70 text-center">
            Help save lives by creating a blood donation request
          </p>
        </motion.div>

        {/* Form */}
        <motion.div className="py-8" variants={itemVariants}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* User Info Section */}
            <div className="bg-base-200/50 rounded-xl p-6 border border-base-300">
              <h3 className="text-lg font-semibold mb-4 text-base-content flex items-center gap-2">
                <FaUser className="text-primary" />
                Requester Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputWrapper icon={FaUser} label="Name">
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-bordered w-full bg-base-300/50 cursor-not-allowed"
                  />
                </InputWrapper>
                <InputWrapper icon={FaEnvelope} label="Email">
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full bg-base-300/50 cursor-not-allowed"
                  />
                </InputWrapper>
              </div>
            </div>

            {/* Recipient Info Section */}
            <div className="bg-base-200/50 rounded-xl p-6 border border-base-300">
              <h3 className="text-lg font-semibold mb-4 text-base-content flex items-center gap-2">
                <FaCommentMedical className="text-secondary" />
                Recipient & Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Recipient Name */}
                <InputWrapper
                  icon={FaUser}
                  error={errors.recipientName}
                  label="Recipient Name"
                >
                  <input
                    type="text"
                    placeholder="Enter recipient's name"
                    {...register("recipientName", { required: true })}
                    className={`input input-bordered w-full transition-colors duration-200 ${
                      errors.recipientName
                        ? "input-error"
                        : "focus:input-primary"
                    }`}
                  />
                </InputWrapper>

                {/* District */}
                <InputWrapper
                  icon={FaMapMarkerAlt}
                  error={errors.recipientDistrict}
                  label="District"
                >
                  <select
                    {...register("recipientDistrict", {
                      required: true,
                      onChange: (e) => {
                        const districtId = e.target.value;
                        if (districtId) {
                          setSelectedDistrict(districtId);
                        } else {
                          setUpazilas([]);
                        }
                      },
                    })}
                    className={`select select-bordered w-full transition-colors duration-200 ${
                      errors.recipientDistrict
                        ? "select-error"
                        : "focus:select-primary"
                    }`}
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </InputWrapper>

                {/* Upazila */}
                <InputWrapper
                  icon={FaMapMarkerAlt}
                  error={errors.recipientUpazila}
                  label="Upazila"
                >
                  <select
                    {...register("recipientUpazila", { required: true })}
                    className={`select select-bordered w-full transition-colors duration-200 ${
                      errors.recipientUpazila
                        ? "select-error"
                        : "focus:select-primary"
                    }`}
                    disabled={!selectedDistrict}
                  >
                    <option value="">Select Upazila</option>
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </InputWrapper>

                {/* Hospital Name */}
                <InputWrapper
                  icon={FaHospital}
                  error={errors.hospitalName}
                  label="Hospital"
                >
                  <input
                    type="text"
                    placeholder="Enter hospital name"
                    {...register("hospitalName", { required: true })}
                    className={`input input-bordered w-full transition-colors duration-200 ${
                      errors.hospitalName
                        ? "input-error"
                        : "focus:input-primary"
                    }`}
                  />
                </InputWrapper>

                {/* Address */}
                <InputWrapper
                  icon={FaMapMarkerAlt}
                  error={errors.addressLine}
                  label="Address"
                >
                  <input
                    type="text"
                    placeholder="Enter full address"
                    {...register("addressLine", { required: true })}
                    className={`input input-bordered w-full transition-colors duration-200 ${
                      errors.addressLine ? "input-error" : "focus:input-primary"
                    }`}
                  />
                </InputWrapper>

                {/* Blood Group */}
                <InputWrapper
                  icon={FaTint}
                  error={errors.bloodGroup}
                  label="Blood Group"
                >
                  <select
                    {...register("bloodGroup", { required: true })}
                    className={`select select-bordered w-full transition-colors duration-200 ${
                      errors.bloodGroup
                        ? "select-error"
                        : "focus:select-primary"
                    }`}
                  >
                    <option value="">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </InputWrapper>

                {/* Donation Date */}
                <InputWrapper
                  icon={FaCalendarAlt}
                  error={errors.donationDate}
                  label="Date"
                >
                  <input
                    type="date"
                    {...register("donationDate", { required: true })}
                    className={`input input-bordered w-full transition-colors duration-200 ${
                      errors.donationDate
                        ? "input-error"
                        : "focus:input-primary"
                    }`}
                  />
                </InputWrapper>

                {/* Donation Time */}
                <InputWrapper
                  icon={FaClock}
                  error={errors.donationTime}
                  label="Time"
                >
                  <input
                    type="time"
                    {...register("donationTime", { required: true })}
                    className={`input input-bordered w-full transition-colors duration-200 ${
                      errors.donationTime
                        ? "input-error"
                        : "focus:input-primary"
                    }`}
                  />
                </InputWrapper>
              </div>
            </div>

            {/* Message Section */}
            <div className="bg-base-200/50 rounded-xl p-6 border border-base-300">
              <h3 className="text-lg font-semibold mb-4 text-base-content flex items-center gap-2">
                <FaCommentMedical className="text-accent" />
                Request Message
              </h3>
              <InputWrapper error={errors.requestMessage} label="Message">
                <textarea
                  {...register("requestMessage", { required: true })}
                  placeholder="Write your reason for blood request in detail..."
                  className={`textarea textarea-bordered w-full transition-colors duration-200 min-h-[120px] ${
                    errors.requestMessage
                      ? "textarea-error"
                      : "focus:textarea-primary"
                  }`}
                  rows={5}
                />
              </InputWrapper>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg px-12 gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm" />
                    Creating Request...
                  </>
                ) : (
                  <>
                    <FaHandHoldingHeart />
                    Create Request
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CreateDonationRequest;
