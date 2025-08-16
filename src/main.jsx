import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthContext/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Tooltip } from "react-tooltip";

const stripePromise = loadStripe(import.meta.env.VITE_pk_key);

const queryClient = new QueryClient();

document.documentElement.setAttribute("data-theme", "light");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
           
          <Tooltip id="my-tooltip" />
        </AuthProvider>
      </QueryClientProvider>
    </Elements>
  </StrictMode>
);
