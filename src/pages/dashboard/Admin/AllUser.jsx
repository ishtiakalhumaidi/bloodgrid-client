import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaEllipsisV,
  FaUser,
  FaUserShield,
  FaUserTimes,
  FaUserCheck,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";

const AllUsersPage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", statusFilter, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      const res = await axiosSecure.get(`/admin/users?${params.toString()}`);
      return res.data;
    },
  });

  const updateUser = useMutation({
    mutationFn: async ({ id, payload }) => {
      await axiosSecure.patch(`/admin/users/${id}`, payload);
    },
    onSuccess: () => queryClient.invalidateQueries(["allUsers"]),
  });

  const handleAction = (id, action) => {
    const payload =
      action === "block"
        ? { status: "blocked" }
        : action === "unblock"
        ? { status: "active" }
        : action === "volunteer"
        ? { role: "volunteer" }
        : action === "admin"
        ? { role: "admin" }
        : action === "donor"
        ? { role: "donor" }
        : {};
    updateUser.mutate({ id, payload });
  };

  if (isLoading) return <Loader />;

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === "active" ? "badge-success" : "badge-error";
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-primary" />;
      case "volunteer":
        return <FaUserCheck className="text-secondary" />;
      default:
        return <FaUser className="text-accent" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "badge-primary";
      case "volunteer":
        return "badge-secondary";
      default:
        return "badge-accent";
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* Header Section */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6 border border-base-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <FaUser className="text-xl text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                All Users Management
              </h1>
              <p className="text-base-content/70">
                Manage user accounts, roles, and permissions
              </p>
            </div>
          </div>

          <div className="stats shadow bg-base-200">
            <div className="stat place-items-center">
              <div className="stat-title text-xs">Total Users</div>
              <div className="stat-value text-primary text-2xl">
                {data?.total || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 mb-6 border border-base-300">
        <div className="flex flex-col justify-between lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-">
            <div className="form-control">
              <div className="input-group flex justify-center items-center gap-2">
                <span className="bg-base-200">
                  <FaSearch className="text-base-content/50" />
                </span>
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="input input-bordered flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-base-content/50" />
            <div className="btn-group bg-secondary rounded-2xl">
              {["all", "active", "blocked"].map((status) => (
                <button
                  key={status}
                  className={`btn btn-sm ${
                    statusFilter === status
                      ? "btn-primary"
                      : "btn bg-transparent"
                  }`}
                  onClick={() => {
                    setPage(1);
                    setStatusFilter(status);
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-100 rounded-xl shadow-lg border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th className="text-base-content font-semibold">User</th>
                <th className="text-base-content font-semibold">Contact</th>
                <th className="text-base-content font-semibold">Role</th>
                <th className="text-base-content font-semibold">Status</th>
                <th className="text-base-content font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="flex flex-col items-center gap-2">
                      <FaUser className="text-4xl text-base-content/30" />
                      <p className="text-base-content/70">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-base-200/50">
                    {/* User Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={user.photoUrl || "/default-avatar.png"}
                              alt="User avatar"
                              className="rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-base-content">
                            {user.name}
                          </div>
                          <div className="text-sm text-base-content/70">
                            ID: {user._id.slice(-6)}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td>
                      <div className="text-sm">
                        <div className="text-base-content">{user?.email}</div>
                        <div className="text-base-content/70">
                          {user.phone || "No phone"}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span
                          className={`badge ${getRoleColor(
                            user.role
                          )} badge-sm`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${getStatusColor(
                          user.status
                        )} badge-sm`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="dropdown dropdown-end">
                        <button
                          tabIndex={0}
                          className="btn btn-sm btn-ghost hover:bg-base-300"
                        >
                          <FaEllipsisV />
                        </button>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
                        >
                          {user.status === "active" && (
                            <li>
                              <button
                                onClick={() => handleAction(user._id, "block")}
                                className="text-error hover:bg-error/10"
                              >
                                <FaUserTimes />
                                Block User
                              </button>
                            </li>
                          )}
                          {user.status === "blocked" && (
                            <li>
                              <button
                                onClick={() =>
                                  handleAction(user._id, "unblock")
                                }
                                className="text-success hover:bg-success/10"
                              >
                                <FaUserCheck />
                                Unblock User
                              </button>
                            </li>
                          )}
                          {user.role !== "volunteer" && (
                            <li>
                              <button
                                onClick={() =>
                                  handleAction(user._id, "volunteer")
                                }
                                className="text-secondary hover:bg-secondary/10"
                              >
                                <FaUserCheck />
                                Make Volunteer
                              </button>
                            </li>
                          )}
                          {user.role !== "admin" && (
                            <li>
                              <button
                                onClick={() => handleAction(user._id, "admin")}
                                className="text-primary hover:bg-primary/10"
                              >
                                <FaUserShield />
                                Make Admin
                              </button>
                            </li>
                          )}
                          {user.role !== "donor" && (
                            <li>
                              <button
                                onClick={() => handleAction(user._id, "donor")}
                                className="text-primary hover:bg-primary/10"
                              >
                                <FaUser />
                                Make donor
                              </button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 p-4 bg-base-200 border-t border-base-300">
            <button
              className="btn btn-sm btn-outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  className={`btn btn-sm ${
                    page === i + 1 ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              className="btn btn-sm btn-outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <FaUserShield className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-base-content/70">Admins</div>
              <div className="text-xl font-bold text-primary">
                {users.filter((u) => u.role === "admin").length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/10 rounded-full">
              <FaUserCheck className="text-secondary" />
            </div>
            <div>
              <div className="text-sm text-base-content/70">Volunteers</div>
              <div className="text-xl font-bold text-secondary">
                {users.filter((u) => u.role === "volunteer").length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-lg p-4 border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-full">
              <FaUser className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-base-content/70">Donors</div>
              <div className="text-xl font-bold text-accent">
                {users.filter((u) => u.role === "donor").length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
