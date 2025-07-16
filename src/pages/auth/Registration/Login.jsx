import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaClock,
  FaUser,
  FaGithub,
  FaGoogle,
  FaFacebook,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import sideImg from "../../../assets/images/authentication.svg";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const toRedirect = location.state?.from || "/";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const axiosInstance = useAxios();

  const { mutate: updateLastLogin } = useMutation({
    mutationFn: async (email) => {
      return await axiosInstance.patch(`/users/${email}/last-login`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data.email, data.password);
      if (res.user) {
        updateLastLogin(res.user?.email);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successful",
          text: "Welcome back to BloodGrid!",
          background: "#ffffff",
          color: "#2c3e50",
          iconColor: "#3498db",
          showConfirmButton: false,
          timer: 1600,
          customClass: {
            popup: "shadow-lg rounded-md px-6 py-4",
            title: "text-lg font-semibold",
            htmlContainer: "text-sm",
          },
        });
        navigate(toRedirect);
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        text:
          err.code == "auth/invalid-credential"
            ? "The email or password you entered is incorrect."
            : "Something went wrong. Please try again.",
        background: "#fff",
        color: "#2c3e50",
        iconColor: "#e74c3c",
        showConfirmButton: false,
        timer: 1800,
        customClass: {
          popup: "shadow-lg rounded-md px-6 py-4",
          title: "text-lg font-semibold",
          htmlContainer: "text-sm",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-7vh)]  bg-base-200 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="flex gap-16 items-center justify-center h-full">
          {/* Login Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1/2"
          >
            <div className="card bg-base-100 shadow-2xl">
              <div className="card-body p-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
                  <p className="text-base-content/60">
                    Continue your journey of saving lives
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        Email Address
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

                  {/* Password Field */}
                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaLock className="text-primary" />
                        Password
                      </span>
                      <Link
                        to="/forgot-password"
                        className="label-text-alt link link-primary"
                      >
                        Forgot Password?
                      </Link>
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
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
                    {showPass ? (
                      <FaEyeSlash
                        onClick={() => setShowPass(!showPass)}
                        className="text-secondary text-lg absolute right-2 top-8"
                      />
                    ) : (
                      <FaEye
                        onClick={() => setShowPass(!showPass)}
                        className="text-secondary absolute text-lg right-2 top-8"
                      />
                    )}
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm"
                      {...register("rememberMe")}
                    />
                    <span className="text-sm text-base-content/70">
                      Remember me for 30 days
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </form>
                <div className="divider my-1"></div>

                {/* Registration Link */}
                <p className="text-center text-sm text-base-content/60 ">
                  Don't have an account?{" "}
                  <Link
                    state={{ from: toRedirect }}
                    to="/auth/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Register as Donor
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Illustration Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block flex-1/2"
          >
            <img src={sideImg} alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Login;
