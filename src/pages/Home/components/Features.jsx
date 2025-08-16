import React from "react";
import { Link } from "react-router";

const Features = () => {
  return (
    <section className="py-20 bg-base-200 text-center px-4 relative overflow-hidden">
      {/* Background pattern - subtle geometric shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-40 h-40 bg-primary rotate-45 -translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent rotate-45 translate-x-20 translate-y-20" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          What Makes{" "}
          <span className="text-primary relative">
            BloodGrid
            <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
          </span>{" "}
          Different?
        </h2>

        <p className="text-base md:text-xl text-base-content/80 max-w-2xl mx-auto mb-16">
          A life-saving platform built for speed, trust, and real impact in
          every emergency.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Smart Donor Search Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="card-body p-8">
              <div className="text-4xl flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                <img
                  className="w-24 "
                  src="https://www.svgrepo.com/show/454709/search-seo-word.svg"
                  alt="Search"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Donor Search</h3>
              <p className="text-base-content/70">
                Find donors quickly by blood group, district, and upazila — no
                login required for emergency searches.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={"/search-donor"}
                  className="btn btn-ghost btn-sm text-primary"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>

          {/* Live Donation Requests Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="card-body p-8">
              <div className="text-4xl flex justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                <img
                  className="w-24 "
                  src="https://www.svgrepo.com/show/275741/blood-transfusion-donation.svg"
                  alt="Blood"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Live Donation Requests</h3>
              <p className="text-base-content/70">
                Browse real-time pending blood donation requests from across the
                country with live updates.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={"/donation-requests"}
                  className="btn btn-ghost btn-sm text-primary"
                >
                  View Requests →
                </Link>
              </div>
            </div>
          </div>

          {/* Secure Donation Workflow Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="card-body p-8">
              <div className="text-4xl mb-4 flex justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <img
                  className="w-24 "
                  src="https://www.svgrepo.com/show/284854/secure-shield-shield.svg"
                  alt="Secure"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Workflow</h3>
              <p className="text-base-content/70">
                Get verified request details, confirm donation intent, and track
                status in real-time.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={"/about"}
                  className="btn btn-ghost btn-sm text-primary"
                >
                  See Process →
                </Link>
              </div>
            </div>
          </div>

          {/* Community Funding Card */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <div className="card-body p-8">
              <div className="text-4xl mb-4 flex justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <img
                  className="w-24 "
                  src="https://www.svgrepo.com/show/251164/love-like.svg"
                  alt="Community"
                />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Funding</h3>
              <p className="text-base-content/70">
                Support our mission through secure Stripe donations with
                complete transparency.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={"/fundraiser"}
                  className="btn btn-ghost btn-sm text-primary"
                >
                  Donate Now →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Link
            to={"/donation-requests"}
            className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Saving Lives Today
          </Link>
          <p className="mt-4 text-sm text-base-content/60">
            Join thousands of donors making a difference every day
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
