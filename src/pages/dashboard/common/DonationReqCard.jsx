import React from "react";
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
import { Link } from "react-router";

const DonationReqCard = ({ req, setEditRequestId, handleDelete }) => {
  return (
    <>
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
            <Link
              to={`/donation-request/${req._id}`}
              className="btn btn-sm btn-outline btn-primary"
              title="View Details"
            >
              <FaEye />
            </Link>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationReqCard;
