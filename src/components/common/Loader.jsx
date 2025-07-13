import React from "react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <PropagateLoader color="#c02427" />
    </div>
  );
};

export default Loader;
