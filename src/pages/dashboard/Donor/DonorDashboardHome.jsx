// DonorDashboardHome.jsx

import { useQuery } from "@tanstack/react-query";


import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DonorDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["recentRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/recent/${user?.email}`);
      return res.data;
    },
  });

  const handleStatusUpdate = async (id, status) => {
    const confirm = await Swal.fire({
      icon: "question",
      title: `Mark as ${status}?`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, mark as ${status}`,
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.patch(`/donation-requests/status/${id}`, { status });
        Swal.fire("Updated!", `Request marked as ${status}.`, "success");
        refetch();
      } catch (err) {
        Swal.fire("Error", "Could not update status.", "error");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/donation-requests/${id}`);
      Swal.fire("Deleted!", "Your request has been deleted.", "success");
      refetch();
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName}</h2>

      {requests.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.recipientName}</td>
                  <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                  <td>{req.donationDate}</td>
                  <td>{req.donationTime}</td>
                  <td>{req.bloodGroup}</td>
                  <td className="capitalize font-medium">{req.status}</td>
                  <td>
                    {req.status === "inprogress" && req.donor ? (
                      <div>
                        <p>{req.donor.name}</p>
                        <p className="text-xs text-gray-500">{req.donor.email}</p>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="flex flex-wrap gap-2">
                    <Link
                      to={`/dashboard/edit-request/${req._id}`}
                      className="btn btn-xs btn-outline"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-xs btn-error"
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/dashboard/view-request/${req._id}`}
                      className="btn btn-xs btn-accent"
                    >
                      <FaEye />
                    </Link>
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="btn btn-xs btn-success"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "canceled")}
                          className="btn btn-xs btn-warning"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {requests.length > 0 && (
        <div className="text-center mt-6">
          <Link to="/dashboard/my-donation-requests" className="btn btn-primary">
            View My All Requests
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonorDashboardHome;
