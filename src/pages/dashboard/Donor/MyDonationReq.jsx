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
import DonationReqCard from "../common/DonationReqCard";

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
      queryClient.invalidateQueries(["myDonationRequests","dashboardStats", "donationRequestStats"]);
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
                : `No ${statusFilter} requests found.`}
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
              <DonationReqCard
                req={req}
                setEditRequestId={setEditRequestId}
                handleDelete={handleDelete}
                updateStatus={updateStatus}
              />
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
