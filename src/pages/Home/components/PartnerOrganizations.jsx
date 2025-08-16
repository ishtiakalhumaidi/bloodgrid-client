import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { FiHeart, FiUsers, FiShield, FiAward } from "react-icons/fi";

const PartnerOrganizations = () => {
  const partners = [
    {
      name: "Medical College Hospital",
      logo: "https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg?t=st=1755327902~exp=1755331502~hmac=0569fb17fe53aa297dff9624d5d97f018236f7fd76e4febb20dbadb1fc5e7121&w=1480",
    },
    {
      name: "Wound Care",
      logo: "https://img.freepik.com/premium-vector/unique-vector-design_517312-66515.jpg?w=1480",
    },
    {
      name: "Blood Care",
      logo: "https://img.freepik.com/premium-vector/blood-care-logo-template-design-vector-emblem-design-concept-creative-symbol-icon_20029-267.jpg?w=1480",
    },
    {
      name: "Blood Check",
      logo: "https://img.freepik.com/premium-vector/blood-check-logo-template-design-vector-emblem-design-concept-creative-symbol-icon_316488-2173.jpg?w=1480",
    },
    {
      name: "Blood donate",
      logo: "https://img.freepik.com/premium-vector/blood-hand-donate-drop-care-donation-logo-vector-icon-illustration_7688-3086.jpg?w=1480",
    },
    {
      name: "Donor day",
      logo: "https://img.freepik.com/free-vector/hands-saving-blood-drop_1017-19141.jpg?t=st=1755327751~exp=1755331351~hmac=331bb981b9243b603f44a63d55c9a3907765ed9ca0720b8c498dedbb8334c0f8&w=1480",
    },
    {
      name: "Save Life",
      logo: "https://img.freepik.com/free-vector/blood-donation-logo-branding-identity-corporate-vector-design_460848-13918.jpg?t=st=1755327848~exp=1755331448~hmac=fa67c0b7c9f5b7287d04395ca8051561558f941e602ff7b42ae01f0899199f67&w=1480",
    },
  ];

  const stats = [
    { number: "100+", label: "Partner Hospitals", icon: FiHeart },
    { number: "64", label: "Districts Covered", icon: FiUsers },
    { number: "24/7", label: "Emergency Support", icon: FiShield },
    { number: "99.9%", label: "Safety Record", icon: FiAward },
  ];

  return (
    <section className="py-20 bg-base-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-y-1/2" />
        <div className="absolute top-1/2 left-0 w-40 h-40 bg-primary rotate-45 -translate-x-20" />
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-accent rotate-45 translate-x-20" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted{" "}
            <span className="text-primary relative">
              Healthcare Partners
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
            </span>
          </h2>
          <p className="text-base md:text-xl text-base-content/80 max-w-3xl mx-auto mb-8">
            We collaborate with Bangladesh's leading hospitals, medical
            colleges, and healthcare institutions to ensure safe, reliable blood
            donation services across the country.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-base-content/70">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Partners Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="relative">
            {/* Gradient Overlays for seamless effect */}
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-base-200 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-base-200 to-transparent z-10"></div>

            {/* Marquee Container */}
            <div className="overflow-hidden">
              <Marquee
                pauseOnHover={true}
                onCycleComplete={true}
                autoFill={true}
                className="flex animate-marquee hover:pause-marquee"
              >
                {partners.map((partner, index) => (
                  <div key={index} className="flex-shrink-0 mx-8 group">
                    <div className="w-32 h-32 bg-base-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center group-hover:scale-105">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="card bg-gradient-to-r from-primary/10 to-accent/10 shadow-lg">
            <div className="card-body p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FiUsers className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold">Become a Partner</h3>
              </div>
              <p className="text-base-content/80 max-w-2xl mx-auto mb-6">
                Are you a healthcare institution interested in joining our
                network? Partner with us to expand access to life-saving blood
                donations in your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:partnerships@bloodgrid.org"
                  className="btn btn-primary"
                >
                  <FiHeart className="w-4 h-4" />
                  Partner With Us
                </a>
                <a href="#contact" className="btn btn-outline">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerOrganizations;
