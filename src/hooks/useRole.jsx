import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: isRoleLoading,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-role?email=${user?.email}`);
      return res.data.role;
    },
  });

  return { role, isRoleLoading, error };
};

export default useRole;
