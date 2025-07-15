import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../components/common/Loader";
import { Navigate } from "react-router";

const AdminVolunteerRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, isRoleLoading } = useRole();
  if (isLoading || isRoleLoading) {
    return <Loader />;
  }
  if (!user || (role !== "admin" && role !== "volunteer")) {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }
  return children;
};

export default AdminVolunteerRoute;
