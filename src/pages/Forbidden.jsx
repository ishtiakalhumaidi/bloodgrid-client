import React from 'react';
import { Link } from 'react-router';
import { FaLock } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-base-200 text-center px-4">
      <div className="text-red-500 mb-4">
        <FaLock className="text-6xl" />
      </div>
      <h1 className="text-5xl font-bold text-base-content mb-4">403 - Forbidden</h1>
      <p className="text-base-content/70 mb-6">
        Sorry, you don't have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
