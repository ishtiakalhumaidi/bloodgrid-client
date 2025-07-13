import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaUpload,
  FaEdit,
  FaSave,
  FaTimes,
  FaShieldAlt,
  FaCalendarAlt,
  FaHeart,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import Loader from "../../../components/common/Loader";
import { imageUpload } from "../../../api/imageUpload";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isEditable, setIsEditable] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [originalFormData, setOriginalFormData] = useState({});

  // Fetch districts
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

  // Fetch upazilas based on selected district
  useEffect(() => {
    const fetchUpazilas = async () => {
      if (!selectedDistrict) return;
      try {
        const res = await axios.get("/upazilas.json");
        const filteredUpazilas = res.data.filter(
          (upazila) => String(upazila.district_id) === String(selectedDistrict)
        );
        setUpazilas(filteredUpazilas);
      } catch (err) {
        console.error("Error fetching upazilas:", err);
      }
    };
    fetchUpazilas();
  }, [selectedDistrict]);

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo && districts.length > 0) {
      const formData = {
        name: userInfo.name || "",
        email: userInfo.email || "",
        bloodGroup: userInfo.bloodGroup || "",
        avatar: null,
      };
      
      reset(formData);
      setOriginalFormData(formData);

      const districtData = districts.find((d) => d.name === userInfo.district);
      if (districtData) {
        setSelectedDistrict(districtData.id);
        setValue("district", districtData.id);
      }

      setValue("upazila", userInfo.upazila || "");
      setImagePreview(userInfo.photoUrl || user?.photoURL);
    }
  }, [userInfo, user, districts, reset, setValue]);

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.put(`/user/update/${userInfo.email}`, data);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Profile Updated Successfully",
        text: "Your donor profile has been updated!",
        background: "#ffffff",
        color: "#2c3e50",
        iconColor: "#c02427",
        confirmButtonColor: "#c02427",
        showConfirmButton: true,
        timer: 2000,
      });
      setIsEditable(false);
      queryClient.invalidateQueries(["userProfile", user?.email]);
    },
    onError: (err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Update Failed",
        text: err.message || "Something went wrong. Please try again.",
        color: "#333",
        iconColor: "#e74c3c",
        confirmButtonColor: "#c02427",
        showConfirmButton: true,
      });
    },
  });

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setIsUploading(true);
    setUploadError("");
    setImagePreview(null);

    try {
      const imageURL = await imageUpload(image);
      setImagePreview(imageURL);
      setValue("avatar", imageURL);
    } catch (err) {
      console.error("Image Upload Failed:", err);
      setUploadError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    reset(originalFormData);
    setIsEditable(false);
    setImagePreview(userInfo.photoUrl || user?.photoURL);
    setUploadError("");
    
    // Reset district and upazila selections
    const districtData = districts.find((d) => d.name === userInfo.district);
    if (districtData) {
      setSelectedDistrict(districtData.id);
      setValue("district", districtData.id);
    }
    setValue("upazila", userInfo.upazila || "");
  };

  const onSubmit = (data) => {
    const selectedDistrictData = districts.find(
      (district) => district.id === data.district
    );
    updateMutation.mutate({
      name: data.name,
      bloodGroup: data.bloodGroup,
      district: selectedDistrictData?.name || data.district,
      upazila: data.upazila,
      photoUrl: data.avatar,
    });
    const updateData = {
      displayName: data.name,
      photoURL: data.avatar,
    };
    updateUserProfile(updateData)
      .then(() => {
        console.log("Profile updated successfully");
      })
      .catch((err) => {
        console.log("Update error:", err);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

 const getRoleColor = (role) => {
  if (role === "admin") {
    return "badge-primary";
  } else if (role === "volunteer") {
    return "badge-secondary";
  } else {
    return "badge-neutral";
  }
};

const getStatusColor = (status) => {
  if (status === "active") {
    return "text-success";
  } else if (status === "blocked") {
    return "text-error";
  } else {
    return "text-base-content";
  }
};


  if (isLoading) return <Loader />;

  return (
    <section className="min-h-[calc(100vh-7vh)] bg-base-200 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-content p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FaHeart className="text-3xl animate-pulse" />
                <div>
                  <h1 className="text-3xl font-bold">Donor Profile</h1>
                  <p className="text-primary-content/80 mt-1">
                    Manage your blood donor information
                  </p>
                </div>
              </div>
              
              {/* Status and Role Badges */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-accent" />
                  <span className={`badge ${getRoleColor(userInfo.role)} text-white font-medium`}>
                    {userInfo.role?.toUpperCase() || "DONOR"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${userInfo.status === 'active' ? 'bg-accent' : 'bg-error'}`}></div>
                  <span className={`text-sm font-medium ${getStatusColor(userInfo.status)}`}>
                    {userInfo.status?.toUpperCase() || "ACTIVE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mb-6">
              {isEditable ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="btn btn-outline btn-error btn-sm flex items-center gap-2 hover:bg-accent/20"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn btn-primary btn-sm flex items-center gap-2"
                    disabled={updateMutation.isLoading}
                  >
                    {updateMutation.isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave /> Save Changes
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditable(true)}
                  className="btn btn-primary btn-sm flex items-center gap-2"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture and Basic Info */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Avatar Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-primary/70 p-1 shadow-lg">
                      <div className="w-full h-full rounded-full bg-base-100 flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-16 h-16 text-base-content/30" />
                        )}
                      </div>
                    </div>
                    {isEditable && (
                      <>
                        <label
                          htmlFor="avatar"
                          className="absolute bottom-0 right-0 w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:bg-primary/80 shadow-lg"
                        >
                          <FaUpload
                            className={`w-5 h-5 ${isUploading && "animate-bounce"}`}
                          />
                        </label>
                        <input
                          type="file"
                          id="avatar"
                          accept="image/*"
                          {...register("avatar", {
                            required:
                              isEditable && !imagePreview
                                ? "Profile image is required"
                                : false,
                          })}
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-base-content/60">
                      {isEditable ? "Upload your photo" : "Profile Photo"}
                    </p>
                    {errors.avatar && (
                      <span className="text-error text-sm block mt-1">
                        {errors.avatar.message}
                      </span>
                    )}
                    {uploadError && (
                      <span className="text-error text-sm block mt-1">{uploadError}</span>
                    )}
                  </div>
                </div>

                {/* Account Information */}
                <div className="flex-1 bg-base-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-base-content/60">Member Since:</span>
                      <p className="font-medium text-base-content">
                        {formatDate(userInfo.createAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-base-content/60">Last Login:</span>
                      <p className="font-medium text-base-content">
                        {formatDate(userInfo.loginAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-base-content border-b border-base-300 pb-2">
                    Personal Information
                  </h3>
                  
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium text-base-content">
                        <FaUser className="text-primary" /> Full Name
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        disabled={!isEditable}
                        {...register("name", { required: "Name is required" })}
                        className={`input input-bordered w-full pl-12 bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-all ${
                          errors.name ? "border-error" : ""
                        }`}
                        placeholder="Enter your full name"
                      />
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                    {errors.name && (
                      <span className="text-error text-sm mt-1">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium text-base-content">
                        <FaEnvelope className="text-primary" /> Email Address
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        {...register("email")}
                        className="input input-bordered w-full pl-12 bg-base-200 border-base-300"
                        placeholder="your@email.com"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                    <span className="text-xs text-base-content/60 mt-1">
                      Email cannot be changed
                    </span>
                  </div>

                  {/* Blood Group Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium text-base-content">
                        <FaTint className="text-primary" /> Blood Group
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={!isEditable}
                        {...register("bloodGroup", {
                          required: "Blood group is required",
                        })}
                        className={`select select-bordered w-full pl-12 bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-all ${
                          errors.bloodGroup ? "border-error" : ""
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
                      <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                    {errors.bloodGroup && (
                      <span className="text-error text-sm mt-1">
                        {errors.bloodGroup.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-base-content border-b border-base-300 pb-2">
                    Location Information
                  </h3>
                  
                  {/* District Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium text-base-content">
                        <FaMapMarkerAlt className="text-primary" /> District
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={!isEditable}
                        {...register("district", {
                          required: "District is required",
                        })}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className={`select select-bordered w-full pl-12 bg-base-100 border-base-300 focus:border-primary focus:outline-none transition-all ${
                          errors.district ? "border-error" : ""
                        }`}
                      >
                        <option value="">Select District</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                    </div>
                    {errors.district && (
                      <span className="text-error text-sm mt-1">
                        {errors.district.message}
                      </span>
                    )}
                  </div>

                  {/* Upazila Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2 font-medium text-base-content">
                        <FaMapMarkerAlt className="text-primary" /> Upazila
                      </span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={!isEditable || !upazilas.length}
                        {...register("upazila", {
                          required: "Upazila is required",
                        })}
                        className={`select select-bordered w-full pl-12 bg-white border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all ${
                          errors.upazila ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">Select Upazila</option>
                        {upazilas.map((upazila) => (
                          <option key={upazila.id} value={upazila.name}>
                            {upazila.name}
                          </option>
                        ))}
                      </select>
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.upazila && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors.upazila.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button for Mobile */}
              {isEditable && (
                <div className="flex justify-center pt-6">
                  <button
                    type="submit"
                    className="btn btn-error btn-wide gap-2 shadow-lg hover:shadow-xl transition-all"
                    disabled={updateMutation.isLoading}
                  >
                    {updateMutation.isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Profile;