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
        authorRole: role,
      };

      const res = await axiosSecure.post("/blogs", blogData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Blog Published",
          text: "Your blog has been successfully created!",
          background: "#fff",
          color: "#333",
        });
        reset();
        setCoverPreview(null);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Something went wrong while creating your blog.",
        background: "#fff",
        color: "#333",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        ✍️ Create a New Blog
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-base-100 p-8 rounded-xl shadow space-y-6 border border-base-300"
      >
        {/* Blog Title */}
        <div className="form-control">
          <label className="label font-semibold flex items-center gap-2">
            <FaPenNib /> Blog Title
          </label>
          <input
            type="text"
            placeholder="Enter blog title"
            {...register("title", { required: true })}
            className={`input input-bordered ${
              errors.title ? "input-error" : "focus:input-primary"
            }`}
          />
          {errors.title && (
            <p className="text-error text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-semibold flex items-center gap-2">
            <FaTag /> Category
          </label>
          <input
            type="text"
            placeholder="e.g. Health, Awareness, Tips"
            {...register("category", { required: true })}
            className={`input input-bordered ${
              errors.category ? "input-error" : "focus:input-primary"
            }`}
          />
          {errors.category && (
            <p className="text-error text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Cover Image */}
        <div className="form-control">
          <label className="label font-semibold flex items-center gap-2">
            <FaImage /> Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("coverImage", { required: true })}
            className="file-input file-input-bordered w-full"
            onChange={handleImagePreview}
          />
          {errors.coverImage && (
            <p className="text-error text-sm mt-1">Cover image is required</p>
          )}
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Preview"
              className="mt-4 rounded-lg w-full max-h-64 object-cover border"
            />
          )}
        </div>

        {/* Blog Content */}
        <div className="form-control">
          <label className="label font-semibold flex items-center gap-2">
            <FaLink /> Content
          </label>
          <textarea
            rows="8"
            placeholder="Write your blog content here..."
            {...register("content", { required: true })}
            className={`textarea textarea-bordered ${
              errors.content ? "textarea-error" : "focus:textarea-primary"
            }`}
          ></textarea>
          {errors.content && (
            <p className="text-error text-sm mt-1">Content is required</p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            className="btn btn-primary btn-wide"
            disabled={uploading}
            type="submit"
          >
            {uploading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Publishing...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateBlog;
