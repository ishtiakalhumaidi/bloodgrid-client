import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaTint, FaHandHoldingUsd, FaUserShield } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/common/Loader";

const AdminVolunteerDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const { totalUsers, totalFunds, totalDonationRequests } = stats || {};

  const cards = [
    {
      title: "Total Donors",
      icon: <FaUsers className="text-3xl" />,
      value: totalUsers || 0,
      color: "bg-primary/10 text-primary",
      bgColor: "bg-primary",
    },
    {
      title: "Total Donations",
      icon: <FaTint className="text-3xl" />,
      value: totalDonationRequests || 0,
      color: "bg-secondary/10 text-secondary",
      bgColor: "bg-secondary",
    },
    {
      title: "Total Funds",
      icon: <FaHandHoldingUsd className="text-3xl" />,
      value: `$${(totalFunds || 0).toLocaleString()}`,
      color: "bg-accent/10 text-accent",
      bgColor: "bg-accent",
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-8 border border-base-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="avatar">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                {user?.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Admin" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUserShield className="text-2xl text-primary" />
                )}
              </div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">
                Welcome back, {user?.displayName || 'Admin'}!
              </h1>
              <p className="text-base-content/70 text-lg">
                Manage your blood donation platform
              </p>
            </div>
          </div>
          
          
          
         
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${card.color}`}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-base-content">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="text-3xl font-bold text-base-content mb-2">
                    {card.value}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${card.bgColor}`}></div>
                    <span className="text-sm text-base-content/70">
                      Updated recently
                    </span>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <div className={`w-16 h-16 rounded-full ${card.color} flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity`}>
                    {card.icon}
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`h-1 ${card.bgColor} group-hover:h-2 transition-all duration-300`}></div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <div className="bg-base-100 rounded-xl shadow-lg p-6 border border-base-300">
          <h2 className="text-xl font-bold text-base-content mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="btn btn-outline btn-primary">
              <FaUsers className="mr-2" />
              Manage Users
            </button>
            <button className="btn btn-outline btn-secondary">
              <FaTint className="mr-2" />
              View Requests
            </button>
            <button className="btn btn-outline btn-accent">
              <FaHandHoldingUsd className="mr-2" />
              Fund Management
            </button>
            <button className="btn btn-outline">
              <FaUserShield className="mr-2" />
              Admin Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVolunteerDashboardHome;