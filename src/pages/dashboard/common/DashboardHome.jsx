import React from "react";
import useAuth from "../../../hooks/useAuth";
import DonorDashboardHome from "../Donor/DonorDashboardHome";
import useRole from "../../../hooks/useRole";
import AdminDashboardHome from "../Admin/AdminDashboardHome";

const DashboardHome = () => {
  const { user } = useAuth();

  const { role } = useRole();

  return (
    <div>
      {role === "admin" ? (
        <AdminDashboardHome />
      ) : role === "volunteer" ? (
        "" // <VolunteerDashboardHome />
      ) : (
        <DonorDashboardHome />
      )}
    </div>
  );
};

export default DashboardHome;
