import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format, parseISO } from "date-fns";

const FundraiserPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["fundraiserPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/fundraiser-payments");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Fundraiser Payment History</h2>
      {payments.length === 0 ? (
        <p className="text-base-content/70">No donations received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200 text-base-content">
                <th>#</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Payment ID</th>
                <th>Status</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td className="font-medium">{item.email}</td>
                  <td className="text-green-600 font-bold">${item.amount}</td>
                  <td className="text-xs text-base-content/80">
                    {item.paymentIntentId}
                  </td>
                  <td>
                    {item.status === "completed" ? (
                      <span className="badge badge-success gap-1">
                        <FaCheckCircle /> Completed
                      </span>
                    ) : (
                      <span className="badge badge-error gap-1">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </td>
                  <td>
                    {item?.paidAt &&
                      format(parseISO(item.paidAt), "MMM dd, yyyy | p")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FundraiserPayments;
