import React from "react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative min-h-[93vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
         <div
    className="absolute inset-0 bg-cover bg-bottom  -z-10"
    style={{ backgroundImage: "url('/BannerBG.svg')" }}
  ></div>
      <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
        Be the <span className="text-primary">Lifeline</span> Someone's Waiting
        For.
      </h1>
      <p className="text-base md:text-lg text-base-content mb-8 max-w-xl">
        Join our network of life-saving donors or find a hero near you — in just
        a few clicks.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link className="btn btn-primary px-6">Join as a Donor</Link>
        <Link className="btn btn-outline px-6">Search Donors</Link>
      </div>
    </section>
  );
};

export default Banner;
