import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaUser, FaClock, FaCalendarAlt, FaTag, FaEye, FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/common/Loader";
import DOMPurify from "dompurify";
import { format } from "date-fns";

const BlogDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <motion.div
        className="flex justify-center items-center h-80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-4">
          <Loader />
        </div>
      </motion.div>
    );
  }

  if (error || !blog) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-base-100 border border-base-300 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
          <div className="text-error text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-base-content mb-2">
            Failed to Load Blog
          </h3>
          <p className="text-base-content/70">
            Please check your connection and try again later.
          </p>
        </div>
      </motion.div>
    );
  }

  const cleanContent = DOMPurify.sanitize(blog.content);
  const getPlainText = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = DOMPurify.sanitize(html);
    return tmp.textContent || tmp.innerText || "";
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      style={{ opacity: 1 }}
      className="max-w-5xl mx-auto p-6 space-y-8"
      variants={containerVariants}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.1,
        },
      }}
    >
      {/* Blog Header Card */}
      <motion.div
        className="bg-base-100 border border-base-300/50 rounded-3xl p-8 shadow-xl"
        variants={itemVariants}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Category Badge */}
        {blog.category && (
          <motion.div className="mb-4" variants={itemVariants}>
            <div className="badge badge-primary badge-lg gap-2 font-medium">
              <FaTag className="text-xs" />
              {blog.category}
            </div>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-base-content leading-tight mb-6"
          variants={itemVariants}
        >
          {blog.title}
        </motion.h1>

        {/* Author Info */}
        <motion.div
          className="flex flex-wrap items-center gap-6 text-base-content/80"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={blog.authorImage}
                  alt={blog.authorName}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="font-semibold text-base-content text-lg">
                {blog.authorName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`badge badge-sm capitalize font-medium ${
                    blog.authorRole === "donor"
                      ? "badge-info"
                      : blog.authorRole === "volunteer"
                      ? "badge-success"
                      : blog.authorRole === "admin"
                      ? "badge-error"
                      : "badge-neutral"
                  }`}
                >
                  {blog.authorRole}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-base-content/70">
            <FaCalendarAlt className="text-secondary" />
            <span className="font-medium">
              {format(new Date(blog.createdAt), "MMMM d, yyyy, p")}
            </span>
          </div>
          {blog.updatedAt && (
            <div className="flex items-center gap-2 text-base-content/70">
              <FaEdit className="text-secondary" />
              <span className="font-medium">
                {format(new Date(blog.updatedAt), "MMMM d, yyyy, p")} (edited)
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-base-content/70">
            <FaClock className="text-accent" />
            <span className="font-medium">
              {Math.ceil(getPlainText(blog.content)?.length / 1000) || 1} min
              read
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Cover Image */}
      {blog.coverImage && (
        <motion.div
          className="overflow-hidden rounded-3xl shadow-2xl"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <img
            src={blog.coverImage}
            alt="Blog Cover"
            className="w-full max-h-[400px] md:max-h-[500px] object-cover"
          />
        </motion.div>
      )}

      {/* Blog Content */}
      <motion.div
        className="bg-base-100 border border-base-300/50 rounded-3xl p-8 md:p-12 shadow-xl"
        variants={itemVariants}
      >
        <motion.article
          className="prose prose-lg max-w-none text-base-content"
          variants={itemVariants}
        >
          <div dangerouslySetInnerHTML={{ __html: cleanContent }} />
        </motion.article>
      </motion.div>

      {/* Blog Footer */}
      <motion.div
        className="bg-base-200/50 border border-base-300/30 rounded-2xl p-6 text-center"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-4 text-base-content/70">
          <div className="flex items-center gap-2">
            <FaEye className="text-secondary" />
            <span>
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Status:</span>
            <div
              className={`badge badge-sm ${
                blog.status === "published"
                  ? "badge-success"
                  : blog.status === "pending"
                  ? "badge-warning"
                  : "badge-neutral"
              }`}
            >
              {blog.status}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogDetails;
