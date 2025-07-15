import React from "react";
import useAuth from "../../../hooks/useAuth";
import DonorDashboardHome from "../Donor/DonorDashboardHome";
import useRole from "../../../hooks/useRole";
import AdminVolunteerDashboardHome from "./AdminVolunteerDashboardHome";

const DashboardHome = () => {
  const { user } = useAuth();

  const { role } = useRole();

  return (
    <div>
      {role === "admin" || role === "volunteer" ? (
        <AdminVolunteerDashboardHome />
      ) : (
        <DonorDashboardHome />
      )}
    </div>
  );
};

export default DashboardHome;
