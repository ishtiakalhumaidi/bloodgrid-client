import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import errorImage from "../../assets/images/404.svg";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-base-100">
      <div className="max-w-2xl mx-auto">
        {/* Error Illustration */}
        <div className="mb-2">
          <img
            src={errorImage}
            alt="404 Not Found"
            className="w-full max-w-md mx-auto drop-shadow-lg"
          />
        </div>

        {/* Error Content */}
        <div className="space-y-6 -mt-20">
          <div className="space-y-2">
            
            <h2 className="text-2xl lg:text-3xl font-semibold text-base-content">
              Oops! Page Not Found
            </h2>
          </div>

          <div className="max-w-lg mx-auto">
            <p className="text-base-content/70 text-lg leading-relaxed">
              The page you're looking for doesn't exist or was moved. Please
              check the URL or go back to the homepage.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <Link to="/" className="btn btn-primary gap-2 min-w-32">
              <FaArrowLeft />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-secondary gap-2 min-w-32"
            >
              Go Back
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default ErrorPage;
