import React from "react";
import useAuth from "../../../hooks/useAuth";
import DonorDashboardHome from "../Donor/DonorDashboardHome";


const DashboardHome = () => {
  const { user, userInfo } = useAuth();

  const role = userInfo?.role || user?.role || "donor";

  return (
    <div>
      {role === "admin" ? (
        ""
      ) : // <AdminDashboardHome />
      role === "volunteer" ? (
        ""
      ) : (
        // <VolunteerDashboardHome />
        <DonorDashboardHome />
      )}
    </div>
  );
};

export default DashboardHome;
