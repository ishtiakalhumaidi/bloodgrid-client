import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

import Swal from "sweetalert2";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/common/Loader";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to access this page.",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setRedirect(true);
      });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <Loader />;
  }

  if (redirect) {
    return <Navigate state={{ from: location.pathname }} to="/auth/login" replace />;
  }

  return children;
};

export default PrivateRoute;
