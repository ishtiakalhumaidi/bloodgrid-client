import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Data:", data);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => reset({ keepValues: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <section className="bg-base-200 py-20 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-16"
        >
          Get in{" "}
          <span className="text-primary relative">
            Touch
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
          </span>
        </motion.h2>
        <div className="max-w-none">
          <h3 className="text-2xl font-semibold">Let's Connect</h3>
          <p className="text-base-content/70 mb-6">
            Have questions about donating blood or need assistance? Our
            dedicated team is here to help you 24/7. Reach out to us through any
            of these channels.
          </p>
        </div>

        {/* Contact Information Side */}

        <div className="flex w-full flex-col lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 flex-1/2"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="card-body flex flex-row items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FiPhone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a
                      href="tel:+880123456789"
                      className="text-primary hover:underline"
                    >
                      +880 1234 567 89
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="card-body flex flex-row items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FiMail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a
                      href="mailto:support@bloodgrid.org"
                      className="text-primary hover:underline"
                    >
                      support@bloodgrid.org
                    </a>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="card-body flex flex-row items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FiMapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-base-content/70">
                      123 Blood Drive, Dhaka 1200, Bangladesh
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="card-body flex flex-row items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <FiClock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Working Hours</h4>
                    <p className="text-base-content/70">
                      24/7 Emergency Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="font-medium mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebookF, href: "https://www.facebook.com/" },
                  { Icon: FaXTwitter, href: "https://x.com/home" },

                  { Icon: FaInstagram, href: "https://www.instagram.com/" },
                ].map((social, index) => (
                  <a
                    key={index}
                    target="_blank"
                    href={social.href}
                    className="p-3 bg-base-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-primary hover:text-white"
                  >
                    <social.Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          <div className="divider lg:divider-horizontal"></div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1/2"
          >
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      {...register("name", { required: "Name is required" })}
                      className={`input input-bordered w-full ${
                        errors.name ? "input-error" : ""
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-error text-sm mt-1"
                        >
                          {errors.name.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiMail className="w-4 h-4" />
                        Your Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`input input-bordered w-full ${
                        errors.email ? "input-error" : ""
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-error text-sm mt-1"
                        >
                          {errors.email.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text flex items-center gap-2">
                        <FiMessageSquare className="w-4 h-4" />
                        Your Message
                      </span>
                    </label>
                    <textarea
                      placeholder="How can we help you?"
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className={`textarea textarea-bordered w-full min-h-[150px] ${
                        errors.message ? "textarea-error" : ""
                      }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-error text-sm mt-1"
                        >
                          {errors.message.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full gap-2 ${
                      isSubmitting ? "loading" : ""
                    }`}
                  >
                    <FiSend className="w-4 h-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>

                  <AnimatePresence>
                    {isSubmitSuccessful && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="alert alert-success shadow-lg"
                      >
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current flex-shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>Your message has been sent successfully!</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Contact Form Side */}
      </div>
    </section>
  );
};

export default ContactUs;
