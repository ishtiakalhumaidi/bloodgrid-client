import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaHospital,
  FaUser,
  FaEnvelope,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import EditDonationRequest from "./EditDonationRequest";

const statuses = ["all", "pending", "inprogress", "done", "canceled"];

const MyDonationReq = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editRequestId, setEditRequestId] = useState(null);
  const limit = 6;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myDonationRequests", user?.email, statusFilter, page],
    queryFn: async () => {
      const statusQuery =
        statusFilter !== "all" ? `&status=${statusFilter}` : "";
      const res = await axiosSecure.get(
        `/my-donation-requests/user?email=${user?.email}&page=${page}&limit=${limit}${statusQuery}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/donation-requests/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Donation request has been deleted.", "success");
      queryClient.invalidateQueries(["myDonationRequests"]);
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/donation-requests/${id}`, { status });
    },
    onSuccess: (_, { status }) => {
      Swal.fire("Updated!", `Marked as ${status}.`, "success");
      queryClient.invalidateQueries(["myDonationRequests"]);
    },
  });

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
      deleteMutation.mutate(id);
    }
  };

  const requests = data?.requests || [];
  const totalPages = data?.totalPages || 1;

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-error">Failed to load</p>;

  return (
    <div className="min-h-screen bg-base-200 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-2xl text-primary-content">🩸</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                My Donation Requests
              </h1>
              <p className="text-base-content/70 mt-1">
                Manage your blood donation requests
              </p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setPage(1);
                  setStatusFilter(status);
                }}
                className={`btn btn-sm capitalize font-medium transition-all ${
                  statusFilter === status 
                    ? "btn-primary shadow-lg" 
                    : "btn-outline btn-primary hover:btn-primary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-3xl text-base-content/50" />
            </div>
            <h3 className="text-xl font-semibold text-base-content mb-2">
              No requests found
            </h3>
            <p className="text-base-content/70">
              {statusFilter === "all" 
                ? "You haven't created any donation requests yet." 
                : `No ${statusFilter} requests found.`
              }
            </p>
          </div>
        )}

        {/* Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-base-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <FaUser className="text-primary text-sm" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-base-content">
                        {req.recipientName}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={`badge badge-lg font-medium capitalize ${
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
              </div>

              {/* Card Body */}
              <div className="p-6 ">
                <div className="flex flex-col justify-between">
                  {/* Location Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaMapMarkerAlt className="text-primary flex-shrink-0" />
                    <span className="text-sm">
                      {req.recipientUpazila}, {req.recipientDistrict}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaHospital className="text-primary flex-shrink-0" />
                    <span className="text-sm">{req.hospitalName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaCalendarAlt className="text-primary flex-shrink-0" />
                    <span className="text-sm">{req.donationDate}</span>
                  </div>
                  <div className="flex items-center gap-3 text-base-content/80">
                    <FaClock className="text-primary flex-shrink-0" />
                    <span className="text-sm">{req.donationTime}</span>
                  </div>
                </div>

                {/* Donor Info */}
                <div className="flex-1/2 bg-base-200 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-base-content mb-2 flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Donor Information
                  </h4>
                  {req.status === "inprogress" || req.status === "done" ? (
                    <div className="space-y-1">
                      <p className="text-base-content font-medium">
                        {req?.donor?.name}
                      </p>
                      <a
                        href={`mailto:${req?.donor?.email}`}
                        className="text-primary text-sm hover:underline flex items-center gap-1"
                      >
                        <FaEnvelope className="text-xs" />
                        {req?.donor?.email}
                      </a>
                    </div>
                  ) : req.status === "pending" ? (
                    <span className="badge badge-outline badge-secondary my-3">
                      No response yet
                    </span>
                  ) : (
                    <span className="text-error text-sm">Request canceled</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 ">
                  <button
                    onClick={() => navigate(`/donation-request/${req._id}`)}
                    className="btn btn-sm btn-outline btn-primary"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => setEditRequestId(req._id)}
                    className="btn btn-sm btn-info text-info-content"
                    title="Edit Request"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm btn-error text-error-content"
                    title="Delete Request"
                  >
                    <FaTrash />
                  </button>
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus.mutate({ id: req._id, status: "done" })
                        }
                        className="btn btn-sm btn-success text-success-content"
                        title="Mark as Done"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() =>
                          updateStatus.mutate({ id: req._id, status: "canceled" })
                        }
                        className="btn btn-sm btn-warning text-warning-content"
                        title="Cancel Request"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-base-100 rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex justify-center items-center gap-4">
              <button
                className="btn btn-outline btn-primary"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                <span className="text-base-content/70">Page</span>
                <span className="font-bold text-primary text-lg">{page}</span>
                <span className="text-base-content/70">of {totalPages}</span>
              </div>
              <button
                className="btn btn-outline btn-primary"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editRequestId && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-base-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
              <div className="sticky top-0 bg-base-100 border-b border-base-300 p-4 flex justify-between items-center rounded-t-2xl">
                <h3 className="text-xl font-bold text-base-content">
                  Edit Donation Request
                </h3>
                <button
                  onClick={() => setEditRequestId(null)}
                  className="btn btn-sm btn-circle btn-error text-error-content"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <EditDonationRequest
                  requestId={editRequestId}
                  onClose={() => {
                    setEditRequestId(null);
                    queryClient.invalidateQueries(["myDonationRequests"]);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationReq;