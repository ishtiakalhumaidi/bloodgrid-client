import { Link } from "react-router";
import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHeartbeat,
  FaHandsHelping,
  FaUserFriends,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../Logo/Logo";

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-base-200 text-base-content relative">
      <div className="pt-16 pb-8 px-4 border-t border-base-300">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Logo & About */}
            <motion.div variants={itemVariants} className="space-y-4">
              <Logo />
              <p className="text-base-content/70 text-sm leading-relaxed">
                Connecting lifesavers across Bangladesh through our smart and
                secure blood donation platform. Every drop counts, every life
                matters.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebook, href: "https://facebook.com" },
                  { Icon: FaTwitter, href: "https://twitter.com" },
                  { Icon: FaLinkedin, href: "https://linkedin.com" },
                  { Icon: FaInstagram, href: "https://instagram.com" },
                  { Icon: FaGithub, href: "https://github.com" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-base-100 flex items-center justify-center 
                             text-primary hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <social.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { to: "/search-donor", text: "Search Donors" },
                  { to: "/donation-requests", text: "Donation Requests" },

                  { to: "/blogs", text: "Blood Donation Blog" },
                  { to: "/about", text: "About Us" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="text-base-content/70 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-primary mt-1" />
                  <p className="text-sm text-base-content/70">
                    123 Blood Drive, Mirpur-10
                    <br />
                    Dhaka 1216, Bangladesh
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="w-4 h-4 text-primary" />
                  <a
                    href="tel:+8801234567890"
                    className="text-sm text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    +880 1234 567 890
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="w-4 h-4 text-primary" />
                  <a
                    href="mailto:support@bloodgrid.com"
                    className="text-sm text-base-content/70 hover:text-primary transition-colors duration-300"
                  >
                    support@bloodgrid.com
                  </a>
                </div>
              </div>

              {/* Newsletter */}
              <div className="pt-4">
                <h5 className="text-sm font-semibold mb-2">
                  Subscribe to Newsletter
                </h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input input-bordered input-sm flex-1"
                  />
                  <button className="btn btn-primary btn-sm">Subscribe</button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-6 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-base-content/70">
              © {new Date().getFullYear()} BloodGrid. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-base-content/70">
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors duration-300"
              >
                Terms of Service
              </Link>
             
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
