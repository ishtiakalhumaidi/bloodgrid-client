import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { FaPenNib, FaImage, FaTag, FaLink } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

import JoditEditor from "jodit-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../api/imageUpload";
import useAxios from "../../../hooks/useAxios";

const EditBlog = ({ blogId, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios()
  const [coverPreview, setCoverPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const editorRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch blog data
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${blogId}`);
      return res.data;
    },
    enabled: !!blogId,
  });

  useEffect(() => {
    if (blog) {
      reset({
        title: blog.title,
        category: blog.category,
        content: blog.content,
      });
      setCoverPreview(blog.coverImage);
    }
  }, [blog, reset]);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const { mutateAsync: updateBlogMutation } = useMutation({
    mutationFn: async ({ blogId, updatedBlog }) => {
      console.log("Sending PATCH to", `/blogs/${blogId}`);
      console.log("Payload:", updatedBlog);
      const res = await axiosInstance.patch(`/blogs/${blogId}`, updatedBlog);
      console.log(res.data)
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const onSubmit = async (data) => {
    console.log(blogId);
    try {
      setUploading(true);
      let imageURL = blog.coverImage;

      if (data.coverImage.length > 0) {
        imageURL = await imageUpload(data.coverImage[0]);
      }

      const updatedBlog = {
        title: data.title,
        category: data.category,
        content: data.content,
        coverImage: imageURL,
      };

      const result = await updateBlogMutation({ blogId, updatedBlog });

      if (result.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Blog Updated",
          text: "Your blog has been updated successfully!",
          confirmButtonColor: "#48484a",
        });
        onClose(); // close modal
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong.",
        confirmButtonColor: "#48484a",
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
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="w-full p-8 rounded-xl shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex gap-2 items-center text-primary">
          <FaPenNib /> Edit Blog
        </h2>
        <button onClick={onClose} className="btn btn-sm btn-error">
          Close
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="form-control  flex items-center gap-2">
          <label className="label font-semibold">
            <FaPenNib className="mr-2 text-primary" /> Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered"
          />
          {errors.title && (
            <p className="text-error text-sm">*Title is required</p>
          )}
        </div>

        {/* Category */}
        <div className="form-control flex items-center gap-2">
          <label className="label font-semibold">
            <FaTag className="mr-2 text-primary" /> Category
          </label>
          <input
            type="text"
            {...register("category", { required: true })}
            className="input input-bordered"
          />
          {errors.category && (
            <p className="text-error text-sm">Category is required</p>
          )}
        </div>

        {/* Cover Image */}
        <div className="form-control  ">
          <div className="flex items-center gap-2">
            <label className="label font-semibold">
              <FaImage className="mr-2 text-primary" /> Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="file-input file-input-bordered"
              onChange={handleImagePreview}
            />
          </div>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Preview"
              className="rounded-lg mt-4 max-h-60 object-cover"
            />
          )}
        </div>

        {/* Content */}
        <div className="form-control ">
          <label className="label font-semibold">
            <FaLink className="mr-2 text-primary" /> Content
          </label>
          <div className="bg-base-200 rounded-md p-1">
            <JoditEditor
              ref={editorRef}
              value={getValues("content")}
              onBlur={(newContent) => setValue("content", newContent)}
              config={joditConfig}
            />
          </div>
          {errors.content && (
            <p className="text-error text-sm">Content is required</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn btn-primary px-10"
            disabled={uploading}
          >
            {uploading ? "Updating..." : "Update Blog"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditBlog;
