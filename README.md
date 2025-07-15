# 🌟 BloodGrid - A Full Stack Blood Donation Platform

Live Site: [https://bloodgrid-bd.web.app](https://bloodgrid-bd.web.app)

## 📄 Project Description

**BloodGrid** is a feature-rich full-stack blood donation platform that helps users request and donate blood efficiently. Built with React, Tailwind CSS, Firebase, and Node.js with MongoDB, the platform includes a dashboard for different roles like **Admin**, **Volunteer**, and **Donor**.

---

## 🎯 Features Implemented

### 👤 Authentication & Authorization

- Protected routes
- Role-based access control (Donor, Volunteer, Admin)

### 🚑 Blood Donation Requests

- Donors can:

  - Create a new donation request
  - View their own donation requests
  - Edit/Delete requests
  - Filter by status (pending, inprogress, done, canceled)
  - Paginated list of requests

- Admins can:

  - View all donation requests
  - Perform all actions like donor
  - Update status

- Volunteers can:

  - View all donation requests
  - Only update donation status

### ✍️ Blog Management

- Anyone (Donor/Volunteer/Admin) can add a blog (status is `draft` by default)
- Blogs can be:

  - Viewed by all users (only `published` status)
  - Filtered by status (`draft`, `published`)

- Admin Only:

  - Can publish/unpublish blogs
  - Can delete blogs

### 📈 Dashboard

- Role-specific homepages with welcome messages
- Admin Dashboard:

  - Total users, total blood requests, total funds (future scope)
  - Content management
  - All users page with actions:

    - Block/Unblock
    - Make Volunteer/Admin
    - Pagination & Filtering

### 🔎 Search & Filters

- Filter blood requests by status
- Paginated user and blog views

### 💼 PDF Reports

- Generate and download PDF reports for search results using `@react-pdf/renderer`

### 🌐 Public Pages

- Home page
- Blogs page (shows only published blogs)
- Blog details
- Blood donor list

### 🌟 Rich Text Editor

- Used `jodit-react` for creating rich blog content

### ⬆️ Stripe Integration (Bonus Scope)

- Stripe packages included for future donation-based funding system

---

## 🧰 Tech Stack

- **Frontend:** React 19, Tailwind CSS 4, DaisyUI, React Router 7, Axios
- **Backend:** Node.js, Express.js, MongoDB (no Mongoose)
- **Authentication:** Firebase
- **State Management:** TanStack Query v5
- **Rich Editor:** Jodit React
- **PDF:** @react-pdf/renderer
- **UI Animations:** Framer Motion
- **Image Upload:** imgbb API
- **Alerts:** SweetAlert2

---

## ⚖️ Roles Summary

| Role      | Blood Request | Blog Actions               | User Management |
| --------- | ------------- | -------------------------- | --------------- |
| Donor     | Full CRUD     | Create (draft only)        | No access       |
| Volunteer | View, Update  | View Only                  | No access       |
| Admin     | Full CRUD     | Publish, Unpublish, Delete | Full access     |

---

## 🔧 Setup

1. Clone the repo
2. Run `npm install`
3. Add `.env` and configure Firebase & imgbb keys
4. Run dev server: `npm run dev`

---

## 🚀 Deployment

- Frontend: Firebase Hosting
- Backend: Vercel

---

## 🎓 License

This project is part of an assignment and challenge.

---

Happy Donating! ❤️
