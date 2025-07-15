import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import RegisterForm from "../pages/auth/Registration/RegisterForm";
import Login from "../pages/auth/Registration/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/dashboard/common/Profile";
import DashboardHome from "../pages/dashboard/common/DashboardHome";
import SearchDonor from "../pages/SearchDonor";
import CreateDonationRequest from "../pages/dashboard/Donor/CreateDonationRequest";
import DonationRequest from "../pages/donationRequest/DonationRequest";
import DonationRequestDetails from "../pages/donationRequest/DonationRequestDetails";
import CreateBlog from "../pages/dashboard/common/CreateBlog";
import BlogsPage from "../pages/blogs/BlogsPage";
import BlogDetails from "../pages/blogs/BlogDetails";
import MyDonationReq from "../pages/dashboard/Donor/MyDonationReq";
import AllUsersPage from "../pages/dashboard/Admin/AllUser";
import AllBloodDonationRequests from "../pages/dashboard/Admin/AllBloodDonationRequests ";
import ContentManage from "../pages/dashboard/common/ContentManage";
import Fundraiser from "../pages/Fund/Fundraiser";
import FundraiserPayments from "../pages/dashboard/common/FundraiserPayments";
import AboutUs from "../pages/AboutUs";
import Forbidden from "../pages/Forbidden";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import AdminVolunteerDashboardHome from "../pages/dashboard/common/AdminVolunteerDashboardHome";
import AdminVolunteerRoute from "../routes/AdminVolunteerRoute";
import DonorRoute from "../routes/DonorRoute";
import ErrorPage from "../pages/Error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/forbidden",
        Component: Forbidden,
      },
      {
        path: "search-donor",
        Component: SearchDonor,
      },
      {
        path: "donation-requests",
        Component: DonationRequest,
      },
      {
        path: "donation-request/:id",

        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs",
        Component: BlogsPage,
      },
      {
        path: "blogs/:id",
        Component: BlogDetails,
      },
      {
        path: "fundraiser",
        element: (
          <PrivateRoute>
            <Fundraiser />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: RegisterForm,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "create-donation-request",
        element: (
          <DonorRoute>
            <CreateDonationRequest />
          </DonorRoute>
        ),
      },
      {
        path: "my-donation-requests",
        element: (
          <DonorRoute>
            <MyDonationReq />
          </DonorRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminVolunteerRoute>
            <ContentManage />
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        Component: CreateBlog,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "fund-records",
        Component: FundraiserPayments,
        element: (
          <AdminRoute>
            <FundraiserPayments />
          </AdminRoute>
        ),
      },
      {
        path: "admin/all-blood-donation-request",
        element: (
          <AdminVolunteerRoute>
            <AllBloodDonationRequests />
          </AdminVolunteerRoute>
        ),
      },
      {
        path: "admin/all-users",
        element: (
          <AdminRoute>
            <AllUsersPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);
