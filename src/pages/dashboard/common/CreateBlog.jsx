import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import { FaPenNib, FaImage, FaTag, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/imageUpload";
import useRole from "../../../hooks/useRole";
import JoditEditor from "jodit-react";

const CreateBlog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const role = useRole();
  const editorRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
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
        reset({
          title: "",
          category: "",
          coverImage: null,
          content: "",
        });
        setValue("content", "");

        Swal.fire({
          icon: "success",
          title: "Blog Submitted",
          text: "Your blog has been successfully created, an admin will review soon!",
          confirmButtonColor: "#48484a",
        });

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

  const joditConfig = {
    readonly: false,
    height: 400,
    theme: "default",
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h2
          className="text-5xl font-bold text-primary flex items-center justify-center gap-4 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaPenNib className="text-primary" />
          Create a New Blog
        </motion.h2>
        <motion.p
          className="text-base-content/70 text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Share your insights and stories with the community
        </motion.p>
      </div>

      {/* Form Container */}
      <motion.div
        className="bg-base-100 rounded-3xl shadow-2xl border border-base-200 p-10 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="space-y-10">
          {/* Blog Title */}
          <motion.div
            className="form-control"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <label className="label font-semibold text-base-content flex items-center gap-3 text-lg mb-2">
              <FaPenNib className="text-primary text-xl" />
              Blog Title
            </label>
            <input
              type="text"
              placeholder="Enter your compelling blog title..."
              {...register("title", { required: true })}
              className={`input input-bordered w-full h-14 text-lg transition-all duration-300 ${
                errors.title
                  ? "input-error border-2 shadow-lg shadow-error/20"
                  : "focus:input-primary focus:border-2 focus:shadow-lg focus:shadow-primary/20"
              }`}
            />
            {errors.title && (
              <motion.p
                className="text-error text-sm mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-error rounded-full"></span>
                Title is required
              </motion.p>
            )}
          </motion.div>

          {/* Category */}
          <motion.div
            className="form-control"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="label font-semibold text-base-content flex items-center gap-3 text-lg mb-2">
              <FaTag className="text-primary text-xl" />
              Category
            </label>
            <input
              type="text"
              placeholder="e.g. Health, Technology, Lifestyle, Business..."
              {...register("category", { required: true })}
              className={`input input-bordered w-full h-14 text-lg transition-all duration-300 ${
                errors.category
                  ? "input-error border-2 shadow-lg shadow-error/20"
                  : "focus:input-primary focus:border-2 focus:shadow-lg focus:shadow-primary/20"
              }`}
            />
            {errors.category && (
              <motion.p
                className="text-error text-sm mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-error rounded-full"></span>
                Category is required
              </motion.p>
            )}
          </motion.div>

          {/* Cover Image */}
          <motion.div
            className="form-control"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="label font-semibold text-base-content flex items-center gap-3 text-lg mb-2">
              <FaImage className="text-primary text-xl" />
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage", { required: true })}
              className={`file-input file-input-bordered w-full h-14 text-lg transition-all duration-300 ${
                errors.coverImage
                  ? "file-input-error border-2 shadow-lg shadow-error/20"
                  : "focus:file-input-primary focus:border-2 focus:shadow-lg focus:shadow-primary/20"
              }`}
              onChange={handleImagePreview}
            />
            {errors.coverImage && (
              <motion.p
                className="text-error text-sm mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-error rounded-full"></span>
                Cover image is required
              </motion.p>
            )}
            {coverPreview && (
              <motion.div
                className="mt-6 relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative overflow-hidden rounded-2xl border-2 border-base-200 shadow-xl">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-full max-h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-content px-3 py-1 rounded-full text-sm font-medium">
                  Preview
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Blog Content with Jodit */}
          <motion.div
            className="form-control"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="label font-semibold text-base-content flex items-center gap-3 text-lg mb-2">
              <FaLink className="text-primary text-xl" />
              Content
            </label>
            <div className="bg-base-200 rounded-2xl p-1 shadow-inner">
              <JoditEditor
                ref={editorRef}
                value={getValues("content")}
                onBlur={(newContent) => setValue("content", newContent)}
                config={joditConfig}
              />
            </div>
            {errors.content && (
              <motion.p
                className="text-error text-sm mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 bg-error rounded-full"></span>
                Content is required
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={uploading}
              className="btn btn-primary btn-lg px-16 h-16 gap-3 text-lg font-semibold rounded-2xl shadow-xl disabled:opacity-50"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaPenNib className="text-xl" />
                  <span>Submit Blog</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateBlog;
