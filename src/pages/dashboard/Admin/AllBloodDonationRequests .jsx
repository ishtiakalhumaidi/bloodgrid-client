import React from "react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaUser,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";
import EditDonationRequest from "../Donor/EditDonationRequest";
import DonationReqCard from "../common/DonationReqCard";
import { BiSolidDonateBlood } from "react-icons/bi";

const statuses = ["all", "pending", "inprogress", "done", "canceled"];
const limit = 5;

const AllBloodDonationRequests = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const [editRequestId, setEditRequestId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["allDonationRequests", statusFilter, page],
    queryFn: async () => {
      const statusQuery =
        statusFilter !== "all" ? `&status=${statusFilter}` : "";
      const res = await axiosSecure.get(
        `/admin/donation-requests?page=${page}&limit=${limit}${statusQuery}`
      );
      return res.data;
    },
  });

  const requests = data?.requests || [];
  const totalPages = data?.totalPages || 1;

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

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-center text-error">Failed to load requests</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">🩸 All Blood Donation Requests</h2>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            className={`btn btn-sm capitalize ${
              statusFilter === status ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => {
              setPage(1);
              setStatusFilter(status);
            }}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Requests list */}
      {requests.length === 0 ? (
        <div className="col-span-full">
          <div className="bg-base-100 rounded-xl shadow-lg p-12 text-center border border-base-300">
            <BiSolidDonateBlood className="text-6xl text-base-content/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-base-content mb-2">
              No blood donation requests found.
            </h3>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="btn btn-sm btn-outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>
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
  );
};

export default AllBloodDonationRequests;
