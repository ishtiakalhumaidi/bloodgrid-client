import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import {
  FaPenNib,
  FaTrash,
  FaCheck,
  FaTimes,
  FaClock,
  FaEdit,
  FaEye,
  FaFileAlt,
  FaFilter,
} from "react-icons/fa";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";
import EditBlog from "./EditBlog";

const ContentManage = () => {
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const queryClient = useQueryClient();
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id) => {
    setSelectedBlogId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBlogId(null);
    setIsModalOpen(false);
  };
  const getPlainText = (html) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = DOMPurify.sanitize(html);
    return tmp.textContent || tmp.innerText || "";
  };

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs", filter, role],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (filter !== "all") {
        queryParams.append("status", filter);
      }
      queryParams.append("role", role);

      const res = await axiosSecure.get(`/blogs?${queryParams.toString()}`);
      return res.data;
    },
    enabled: !!role,
  });

  const { data: stateData = [] } = useQuery({
    queryKey: ["blogStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs/stats");
      return res.data;
    },
  });
  console.log(stateData);
  const deleteBlog = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      Swal.fire("Deleted!", "Blog has been deleted.", "success");
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) =>
      await axiosSecure.patch(`/blogs/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog.mutate(id);
      }
    });
  };

  const getStatusBadge = (status) => {
    if (status === "published") {
      return "badge-success";
    } else if (status === "draft") {
      return "badge-warning";
    } else {
      return "badge-ghost";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "published") {
      return <FaCheck className="text-success" />;
    } else if (status === "draft") {
      return <FaEdit className="text-warning" />;
    } else {
      return <FaClock className="text-base-content/50" />;
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* Header Section */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6 border border-base-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <FaFileAlt className="text-xl text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                Content Management
              </h1>
              <p className="text-base-content/70">
                Manage your blog posts and articles
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/content-management/add-blog"
            className="btn btn-primary gap-2"
          >
            <FaPenNib />
            Add New Blog
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <FaFileAlt className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-base-content/70">Total Blogs</div>
              <div className="text-2xl font-bold text-primary">
                {stateData?.total || 0}
              </div>
            </div>
          </div>
        </div>

        {stateData?.statusBreakdown?.map((stat) => (
          <div
            key={stat._id}
            className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  stat._id === "published" ? "bg-success/10" : "bg-warning/10"
                }`}
              >
                {stat._id === "published" ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaEdit className="text-warning" />
                )}
              </div>
              <div>
                <div className="text-sm text-base-content/70">
                  {stat._id === "published" ? "Published" : "Drafts"}
                </div>
                <div
                  className={`text-2xl font-bold ${
                    stat._id === "published" ? "text-success" : "text-warning"
                  }`}
                >
                  {stat.count}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6 border border-base-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-base-content/50" />
            <span className="text-base-content font-medium">
              Filter by status:
            </span>
          </div>
          <div className="btn-group bg-secondary rounded-2xl">
            {["all", "draft", "published"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`btn btn-sm capitalize ${
                  filter === status ? "btn-primary" : "btn bg-transparent"
                }`}
              >
                {status === "all" ? "All Posts" : status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {blogs.length === 0 ? (
          <div className="col-span-full">
            <div className="bg-base-100 rounded-xl shadow-lg p-12 text-center border border-base-300">
              <FaFileAlt className="text-6xl text-base-content/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-base-content mb-2">
                No blogs found
              </h3>
              <p className="text-base-content/70 mb-4">
                {filter === "all"
                  ? "You haven't created any blog posts yet."
                  : `No ${filter} blog posts found.`}
              </p>
              <Link
                to="/dashboard/content-management/add-blog"
                className="btn btn-primary gap-2"
              >
                <FaPenNib />
                Create Your First Blog
              </Link>
            </div>
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-base-100 rounded-xl shadow-lg border border-base-300 overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.coverImage || "/default-blog-image.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`badge ${getStatusBadge(
                      blog.status
                    )} badge-sm gap-1`}
                  >
                    {getStatusIcon(blog.status)}
                    {blog.status}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs text-base-content/50">
                  <FaClock className="text-primary" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>

                <h3 className="font-bold text-lg text-base-content line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="badge badge-outline badge-sm">
                    {blog.category}
                  </span>
                </div>

                <div>{getPlainText(blog.content).slice(0, 150)}...</div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-3 border-t border-base-300">
                  <div className="flex gap-2">
                    <Link
                      to={`/blogs/${blog._id}`}
                      className="btn btn-sm btn-ghost btn-square hover:bg-primary/10"
                    >
                      <FaEye className="text-base-content/70 hover:text-primary" />
                    </Link>
                    <button
                      onClick={() => openModal(blog._id)}
                      className="btn btn-sm btn-ghost btn-square hover:bg-secondary/10"
                    >
                      <FaEdit className="text-base-content/70 hover:text-secondary" />
                    </button>
                  </div>

                  {/* Admin-only actions */}
                  {role === "admin" && (
                    <div className="flex gap-2">
                      {blog.status === "draft" ? (
                        <button
                          onClick={() =>
                            updateStatus.mutate({
                              id: blog._id,
                              status: "published",
                            })
                          }
                          className="btn btn-sm btn-success gap-1"
                          title="Publish"
                        >
                          <FaCheck />
                          Publish
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            updateStatus.mutate({
                              id: blog._id,
                              status: "draft",
                            })
                          }
                          className="btn btn-sm btn-warning gap-1"
                          title="Unpublish"
                        >
                          <FaTimes />
                          Draft
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="btn btn-sm btn-error btn-square"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Info */}
      {blogs.length > 0 && (
        <div className="bg-base-100 rounded-xl shadow-lg p-4 mt-6 border border-base-300">
          <div className="flex items-center justify-between text-sm text-base-content/70">
            <span>
              Showing {blogs.length}{" "}
              {filter === "all" ? "blog posts" : `${filter} posts`}
            </span>
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      )}
      {/* Modal logic */}
      {isModalOpen && selectedBlogId && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-4xl p-0 overflow-y-auto">
            <EditBlog blogId={selectedBlogId} onClose={closeModal} />
          </div>
          <form method="dialog" className="modal-backdrop" onClick={closeModal}>
            <button>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ContentManage;
