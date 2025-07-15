import React from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import Loader from "../components/common/Loader";
import { Navigate } from "react-router";

const VolunteerRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const { role, isRoleLoading } = useRole();
  if (isLoading || isRoleLoading) {
    return <Loader />;
  }
  if (!user || role !== "volunteer") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }
  return children;
};

export default VolunteerRoute;
