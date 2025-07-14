import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaPenNib, FaUser } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Loader from "../../components/common/Loader";

const BlogsPage = () => {
  const axiosInstance = useAxios();

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/blogs");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-base-100 rounded-xl shadow-lg border border-base-300">
          <div className="text-error text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">Oops! Something went wrong</h2>
          <p className="text-base-content/70">Failed to load blogs. Please try again later.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200/30">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-4">
            <div className="bg-primary/10 rounded-full px-6 py-2 border border-primary/20">
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Our Blog
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-6 leading-tight">
            Latest Blog <span className="text-primary">Posts</span>
          </h1>
          <p className="text-base-content/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Stay informed and inspired through our community stories & health tips.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="group bg-base-100 rounded-2xl overflow-hidden border border-base-300 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-content/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Author Role Badge */}
                <div className="absolute top-4 left-4">
                  <div
                    className={`badge badge-lg font-semibold capitalize shadow-lg ${
                      blog.authorRole === "donor"
                        ? "badge-info"
                        : blog.authorRole === "volunteer"
                        ? "badge-success"
                        : blog.authorRole === "admin"
                        ? "badge-error"
                        : "badge-neutral"
                    }`}
                  >
                    {blog.authorRole} blog
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-base-content line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {blog.title}
                </h2>
                
                <p className="text-base-content/70 line-clamp-3 leading-relaxed">
                  {blog.content?.slice(0, 150)}...
                </p>

                {/* Author and Date Info */}
                <div className="flex items-center justify-between pt-4 border-t border-base-300">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-8 h-8 rounded-full ring-2 ring-base-300">
                        <img
                          src={blog.authorImage}
                          alt={blog.authorName}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-base-content">
                      {blog.authorName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-base-content/60">
                    <FaCalendarAlt className="text-secondary" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Link
                  to={`/blogs/${blog._id}`}
                  className="btn btn-primary btn-outline w-full group-hover:btn-primary group-hover:text-base-content transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Write Blog Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link
            to="/dashboard/write-blog"
            className="group flex items-center gap-3 bg-secondary hover:bg-secondary/90 text-base-100 px-6 py-3 rounded-full shadow-2xl hover:shadow-secondary/30 transition-all duration-300 hover:scale-105"
          >
            <FaPenNib className="text-lg group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-semibold hidden md:block">Write Your Blog</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogsPage;