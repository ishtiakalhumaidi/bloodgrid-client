import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaTint,
  FaHeart,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";
import { useState } from "react";
import EditDonationRequest from "./EditDonationRequest";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [editRequest, setEditRequest] = useState(null);

  const {
    data: donationData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["dashboardRecentDonations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-requests/user?email=${user?.email}&page=1&limit=3`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: statsData } = useQuery({
    queryKey: ["donationRequestStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/request-status-count?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
  const statusMap = {};
  statsData?.statusBreakdown?.forEach((item) => {
    statusMap[item._id] = item.count;
  });

  const stateData = {
    totalRequests: statsData?.total[0]?.total || 0,
    completedDonations: statusMap["done"] || 0,
    pendingRequests: statusMap["pending"] || 0,
    inprogress: statusMap["inprogress"] || 0,
    canceled: statusMap["canceled"] || 0,
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await axiosSecure.delete(`/donation-requests/${id}`);
      refetch();
      Swal.fire("Deleted!", "Donation request has been deleted.", "success");
    }
  };

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation-requests/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries(["dashboardStats", "donationRequestStats"]);
      Swal.fire("Updated!", `Donation marked as ${status}.`, "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update donation status.", "error");
    },
  });

  const handleStatusUpdate = (id, status) => {
    updateStatus({ id, status });
  };

  const requests = donationData?.requests || [];

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-error p-8">
        Failed to load dashboard data
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-content shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-primary-content/20 rounded-full flex items-center justify-center">
                <FaHeart className="text-3xl text-primary-content" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {user?.displayName || "Donor"}!
                </h1>
                <p className="text-primary-content/90 text-lg">
                  Thank you for being a life-saver. Your donations make a
                  difference.
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <FaTint className="text-6xl text-primary-content/30" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm font-medium">
                  Total Requests
                </p>
                <p className="text-2xl font-bold text-base-content">
                  {stateData.totalRequests}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <FaChartLine className="text-xl text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm font-medium">
                  Completed
                </p>
                <p className="text-2xl font-bold text-success">
                  {stateData.completedDonations}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <FaCheck className="text-xl text-success" />
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm font-medium">
                  Pending
                </p>
                <p className="text-2xl font-bold text-warning">
                  {stateData.pendingRequests}
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <FaClock className="text-xl text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base-content/70 text-sm font-medium">
                  Inprogress
                </p>
                <p className="text-2xl font-bold text-info">
                  {stateData.inprogress}
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <FaHeart className="text-xl text-info" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests Section */}
        {requests.length > 0 && (
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-base-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <FaTint className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-base-content">
                      Recent Donation Requests
                    </h2>
                    <p className="text-base-content/70">
                      Your latest 3 donation requests
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/dashboard/my-donation-requests")}
                  className="btn btn-outline btn-primary gap-2"
                >
                  View All
                  <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-base-200 text-base-content">
                    <th className="font-semibold">#</th>
                    <th className="font-semibold">Recipient</th>
                    <th className="font-semibold">Location</th>
                    <th className="font-semibold">Blood Group</th>
                    <th className="font-semibold">Date & Time</th>
                    <th className="font-semibold">Status</th>
                    <th className="font-semibold">Donor</th>
                    <th className="font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, index) => (
                    <tr key={req._id} className="hover:bg-base-50">
                      <td className="font-medium">{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <FaUser className="text-xs text-primary" />
                          </div>
                          <span className="font-medium">
                            {req.recipientName}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 text-sm">
                          <FaMapMarkerAlt className="text-primary text-xs" />
                          {req.recipientUpazila}, {req.recipientDistrict}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-primary font-medium">
                          {req.bloodGroup}
                        </span>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <FaCalendarAlt className="text-primary text-xs" />
                            {req.donationDate}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <FaClock className="text-primary text-xs" />
                            {req.donationTime}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge font-medium capitalize ${
                            req.status === "pending"
                              ? "badge-warning"
                              : req.status === "inprogress"
                              ? "badge-info"
                              : req.status === "done"
                              ? "badge-success"
                              : "badge-error"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td>
                        {req.status === "inprogress" ||
                        req.status === "done" ? (
                          <div className="space-y-1">
                            <p className="font-medium text-sm text-base-content">
                              {req?.donor?.name}
                            </p>
                            <a
                              href={`mailto:${req?.donor?.email}`}
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <FaEnvelope className="text-xs" />
                              {req?.donor?.email}
                            </a>
                          </div>
                        ) : req.status === "pending" ? (
                          <span className="badge badge-outline badge-accent text-xs">
                            No response yet
                          </span>
                        ) : (
                          <span className="text-xs text-error">
                            Request canceled
                          </span>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              navigate(`/donation-request/${req._id}`)
                            }
                            className="btn btn-xs btn-outline btn-primary"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => setEditRequest(req)}
                            className="btn btn-xs btn-info text-info-content"
                            title="Edit Request"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(req._id)}
                            className="btn btn-xs btn-error text-error-content"
                            title="Delete Request"
                          >
                            <FaTrash />
                          </button>
                          {req.status === "inprogress" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "done")
                                }
                                className="btn btn-xs btn-success text-success-content"
                                title="Mark as Done"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusUpdate(req._id, "canceled")
                                }
                                className="btn btn-xs btn-warning text-warning-content"
                                title="Cancel Request"
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden p-6 space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-base-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <FaUser className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base-content">
                          {req.recipientName}
                        </h3>
                        <span className="badge badge-primary badge-sm">
                          {req.bloodGroup}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`badge font-medium capitalize ${
                        req.status === "pending"
                          ? "badge-warning"
                          : req.status === "inprogress"
                          ? "badge-info"
                          : req.status === "done"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-base-content/80">
                      <FaMapMarkerAlt className="text-primary" />
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <FaCalendarAlt className="text-primary" />
                      {req.donationDate}
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <FaClock className="text-primary" />
                      {req.donationTime}
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="bg-base-100 rounded-lg p-3">
                    <h4 className="font-semibold text-sm mb-1">
                      Donor Information
                    </h4>
                    {req.status === "inprogress" || req.status === "done" ? (
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {req?.donor?.name}
                        </p>
                        <a
                          href={`mailto:${req?.donor?.email}`}
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <FaEnvelope className="text-xs" />
                          {req?.donor?.email}
                        </a>
                      </div>
                    ) : req.status === "pending" ? (
                      <span className="badge badge-outline badge-accent text-xs">
                        No response yet
                      </span>
                    ) : (
                      <span className="text-xs text-error">
                        Request canceled
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/donation-request/${req._id}`)}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => setEditRequest(req)}
                      className="btn btn-xs btn-info text-info-content"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-error text-error-content"
                    >
                      <FaTrash />
                    </button>
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-xs btn-success text-success-content"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="btn btn-xs btn-warning text-warning-content"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-12 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTint className="text-4xl text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-base-content mb-2">
              No donation requests yet
            </h3>
            <p className="text-base-content/70 mb-6">
              Start making a difference by creating your first donation request.
            </p>
            <button
              onClick={() => navigate("/dashboard/create-donation-request")}
              className="btn btn-primary gap-2"
            >
              Create Request
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* Edit Modal */}
        {editRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <div className="sticky top-0 bg-base-100 border-b border-base-300 p-4 flex justify-between items-center rounded-t-2xl">
                <h3 className="text-xl font-bold text-base-content">
                  Edit Donation Request
                </h3>
                <button
                  onClick={() => setEditRequest(null)}
                  className="btn btn-sm btn-circle btn-error text-error-content"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <EditDonationRequest
                  requestId={editRequest?._id}
                  onClose={() => setEditRequest(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboardHome;
