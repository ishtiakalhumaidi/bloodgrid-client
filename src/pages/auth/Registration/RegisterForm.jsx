import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaLock,
  FaUpload,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import sideImg from "../../../assets/images/RegisterSide.svg";
import { Link } from "react-router";
import axios from "axios";
import { imageUpload } from "../../../api/imageUpload";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { errorCap } from "../../../utils/errorMessageCap";

const RegisterForm = () => {
  const { createUser, updateUserProfile } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [uploadedImageError, setUploadedImageError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  // district fetch
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setImagePreview(null);
    const image = e.target.files[0];
    try {
      const imageURL = await imageUpload(image);
      setImagePreview(imageURL);
    } catch (err) {
      setUploadedImageError("Image Uploaded Failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const { avatar, ...rest } = data;
    const userData = { ...rest, photoUrl: imagePreview };
    setIsSubmitting(true);
    try {
      const res = await createUser(userData.email, userData.password);
      if (res.user) {
        const updateDate = {
          displayName: userData.name,
          photoURL: userData.photoUrl,
        };
        updateUserProfile(updateDate)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Registration Successful!",
              text: "Welcome to BloodGrid. You're all set to begin.",
              background: "#ffffff",
              color: "#2c3e50",
              iconColor: "#27ae60",
              showConfirmButton: false,
              timer: 1800,
              customClass: {
                popup: "shadow-lg rounded-md px-6 py-4",
                title: "text-lg font-semibold",
                htmlContainer: "text-sm",
              },
            });
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              background: "red",
              icon: "error",
              title: err,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    } catch (err) {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-7vh)] bg-base-200 py-6 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-base-100 shadow-2xl"
          >
            <div className="card-body p-8">
              {/* Form Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold">
                  Create an <span className="text-primary">Account</span>
                </h2>
                <p className="text-base-content/60 mt-2">
                  Join our community of life-savers today
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 p-1">
                      <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-12 h-12 text-primary/20" />
                        )}
                      </div>
                    </div>
                    <label
                      htmlFor="avatar"
                      className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <FaUpload
                        className={`w-4 h-4 ${isUploading && "animate-bounce"}`}
                      />
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      {...register("avatar", {
                        required: "Profile image is required",
                      })}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <span className="text-sm text-base-content/60">
                    Upload your photo
                  </span>
                  {errors.avatar && (
                    <span className="text-error text-sm">
                      {errors.avatar.message}
                    </span>
                  )}
                </div>

                {uploadedImageError && (
                  <p className="text-red-500 text-xs">{uploadedImageError}</p>
                )}

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaUser className="text-primary" /> Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className={`input input-bordered w-full pl-10 ${
                          errors.name ? "input-error" : "focus:input-primary"
                        }`}
                        placeholder="John Doe"
                      />
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.name && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.name.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaEnvelope className="text-primary" /> Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`input input-bordered w-full pl-10 ${
                          errors.email ? "input-error" : "focus:input-primary"
                        }`}
                        placeholder="john@example.com"
                      />
                      <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.email && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.email.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Blood Group Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaTint className="text-primary" /> Blood Group
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("bloodGroup", {
                          required: "Blood group is required",
                        })}
                        className={`select select-bordered w-full pl-10 ${
                          errors.bloodGroup
                            ? "select-error"
                            : "focus:select-primary"
                        }`}
                      >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          )
                        )}
                      </select>
                      <FaTint className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.bloodGroup && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.bloodGroup.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Address Section */}
                <div className="divider">Address</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* District Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaMapMarkerAlt className="text-primary" /> District
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("district", {
                          required: "District is required",
                        })}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className={`select select-bordered w-full pl-10 ${
                          errors.district
                            ? "select-error"
                            : "focus:select-primary"
                        }`}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.district && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.district.message}
                        </span>
                      </label>
                    )}
                  </div>
                  {/* Upazila Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaMapMarkerAlt className="text-primary" /> Upazila
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={!upazilas.length}
                        {...register("upazila", {
                          required: "Upazila is required",
                        })}
                        className={`select select-bordered w-full pl-10 ${
                          errors.upazila
                            ? "select-error"
                            : "focus:select-primary"
                        }`}
                      >
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila) => (
                          <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                      <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.district && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.district.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="divider">Security Information</div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaLock className="text-primary" /> Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`input input-bordered w-full pl-10 ${
                          errors.password
                            ? "input-error"
                            : "focus:input-primary"
                        }`}
                        placeholder="••••••••"
                      />
                      <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.password && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.password.message}
                        </span>
                      </label>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium">
                        <FaCheckCircle className="text-primary" /> Confirm
                        Password
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        className={`input input-bordered w-full pl-10 ${
                          errors.confirmPassword
                            ? "input-error"
                            : "focus:input-primary"
                        }`}
                        placeholder="••••••••"
                      />
                      <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30" />
                    </div>
                    {errors.confirmPassword && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.confirmPassword.message}
                        </span>
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full gap-2 mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaUser />
                      Complete Registration
                    </>
                  )}
                </button>
              </form>

              {/*Login Terms and Privacy */}

              <p className="text-center text-sm text-base-content/60">
                By registering, you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
              <div className="divider my-1"></div>
              <p className="text-center text-sm text-base-content/60 ">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="text-primary hover:underline"
                >
                  Login
                </Link>{" "}
              </p>
            </div>
          </motion.div>

          {/* Illustration Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden h-11/12 lg:flex sticky top-8 justify-center items-center"
          >
            <img className="" src={sideImg} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
