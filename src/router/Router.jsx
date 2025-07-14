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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
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
        Component: DonationRequestDetails,
      },
      {
        path: "blogs",
        Component: BlogsPage,
      },
      {
        path: "blogs/:id",
        Component: BlogDetails,
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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "create-donation-request",
        Component: CreateDonationRequest,
      },
      {
        path: "write-blog",
        Component: CreateBlog,
      },
      {
        path: "my-donation-requests",
        Component: MyDonationReq,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "admin/all-blood-donation-request",
        Component: AllBloodDonationRequests,
      },
      {
        path: "admin/all-users",
        Component: AllUsersPage,
      },
    ],
  },
]);
