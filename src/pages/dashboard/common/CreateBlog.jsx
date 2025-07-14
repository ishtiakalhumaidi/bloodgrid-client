import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaPenNib, FaImage, FaTag, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/imageUpload";
import useRole from "../../../hooks/useRole";

const CreateBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const role = useRole();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Preview image on select
  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      let imageURL = "";
      if (data.coverImage.length > 0) {
        imageURL = await imageUpload(data.coverImage[0]);
      }

      const blogData = {
        title: data.title,
        category: data.category,
        content: data.content,
        coverImage: imageURL,
        authorName: user?.displayName,
        authorEmail: user?.email,
        authorImage: user?.photoURL,
        authorRole: role.role,
      };

      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Blog Published",
          text: "Your blog has been successfully created!",
          confirmButtonColor: "#48484a",
        });
        reset();
        setCoverPreview(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while creating your blog.",
        confirmButtonColor: "#48484a",
        confirmButtonText: "Try again later",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary flex items-center justify-center gap-3">
          <FaPenNib className="text-primary" />
          Create a New Blog
        </h2>
        <p className="text-base-content/70 mt-2 text-lg">
          Share your insights and stories with the community
        </p>
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-base-100 rounded-2xl shadow-xl border border-base-200 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Blog Title */}
          <div className="form-control">
            <label className="label font-semibold text-base-content flex items-center gap-2">
              <FaPenNib className="text-primary" />
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              {...register("title", { required: true })}
              className={`input input-bordered w-full transition-colors duration-200 ${
                errors.title ? "input-error" : "focus:input-primary"
              }`}
            />
            {errors.title && (
              <p className="text-error text-sm mt-2">Title is required</p>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label font-semibold text-base-content flex items-center gap-2">
              <FaTag className="text-primary" />
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Health, Awareness, Tips"
              {...register("category", { required: true })}
              className={`input input-bordered w-full transition-colors duration-200 ${
                errors.category ? "input-error" : "focus:input-primary"
              }`}
            />
            {errors.category && (
              <p className="text-error text-sm mt-2">Category is required</p>
            )}
          </div>

          {/* Cover Image */}
          <div className="form-control">
            <label className="label font-semibold text-base-content flex items-center gap-2">
              <FaImage className="text-primary" />
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage", { required: true })}
              className={`file-input file-input-bordered w-full transition-colors duration-200 ${
                errors.coverImage
                  ? "file-input-error"
                  : "focus:file-input-primary"
              }`}
              onChange={handleImagePreview}
            />
            {errors.coverImage && (
              <p className="text-error text-sm mt-2">Cover image is required</p>
            )}
            {coverPreview && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={coverPreview}
                  alt="Preview"
                  className="rounded-lg w-full max-h-80 object-cover border border-base-200"
                />
              </motion.div>
            )}
          </div>

          {/* Blog Content */}
          <div className="form-control">
            <label className="label font-semibold text-base-content flex items-center gap-2">
              <FaLink className="text-primary" />
              Content
            </label>
            <textarea
              rows="10"
              placeholder="Write your blog content here..."
              {...register("content", { required: true })}
              className={`textarea textarea-bordered w-full min-h-[200px] transition-colors duration-200 ${
                errors.content ? "textarea-error" : "focus:textarea-primary"
              }`}
            ></textarea>
            {errors.content && (
              <p className="text-error text-sm mt-2">Content is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <motion.button
              type="submit"
              disabled={uploading}
              className="btn btn-primary btn-lg px-12 gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Publishing...
                </>
              ) : (
                <>
                  <FaPenNib />
                  Publish Blog
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateBlog;
