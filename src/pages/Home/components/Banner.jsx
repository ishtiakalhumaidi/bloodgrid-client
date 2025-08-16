import React from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import bannerImg from "../../../assets/images/banner.png";

const Banner = () => {
  const { user } = useAuth();
  const { role } = useRole();
  return (
    <section className="relative min-h-[93vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="1200"
        className="absolute inset-0 bg-cover bg-right   -z-10"
        style={{ backgroundImage: "url('/BannerBG.svg')" }}
      ></div>
      <img
        data-aos="fade-down"
        data-aos-delay="300"
        data-aos-duration="1200"
        className="max-w-50"
        src={bannerImg}
        alt=""
      />
      <h1
        data-aos="fade-up"
        data-aos-delay="300"
        data-aos-duration="1200"
        className="text-3xl md:text-5xl font-bold leading-tight mb-4"
      >
        Be the <span className="text-primary">Lifeline</span> Someone's Waiting
        For.
      </h1>
      <p
        data-aos="zoom-in"
        data-aos-delay="600"
        data-aos-duration="1200"
        className="text-base md:text-lg text-base-content mb-8 max-w-xl"
      >
        Join our network of life-saving donors or find a hero near you — in just
        a few clicks.
      </p>
      <div
        data-aos="fade-left"
        data-aos-delay="300"
        data-aos-duration="1200"
        className="flex flex-col md:flex-row gap-4"
      >
        {user && role == "donor" ? (
          <Link
            to={"/dashboard/create-donation-request"}
            className="btn btn-primary px-6"
          >
            Create Donation Request
          </Link>
        ) : (
          !user && (
            <Link to={"/auth/register"} className="btn btn-primary px-6">
              Join as a Donor
            </Link>
          )
        )}

        <Link to={"/search-donor"} className="btn btn-outline px-6">
          Search Donors
        </Link>
      </div>
    </section>
  );
};

export default Banner;
