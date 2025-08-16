import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaTint,
  FaMapMarkerAlt,
  FaCircle,
  FaEnvelope,
  FaDownload,
  FaUsers,
} from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiHeart, FiUser, FiPhone } from "react-icons/fi";
import Loader from "../components/common/Loader";
import searchImg from "../assets/images/search.svg";
import useAxios from "../hooks/useAxios";
import DonorPDFDocument from "../components/pdf/DonorPDFDocument";

const SearchDonor = () => {
  const axiosInstance = useAxios();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get("/districts.json").then((res) => setDistricts(res.data));
  }, []);

  useEffect(() => {
    if (!district) {
      setUpazilas([]);
      return;
    }
    axios.get("/upazilas.json").then((res) => {
      const filtered = res.data.filter(
        (u) => String(u.district_id) === String(district)
      );
      setUpazilas(filtered);
    });
  }, [district]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setResults([]);
    const selectedDis = districts.find((dis) => dis.id == district);

    try {
      const res = await axiosInstance.get("/donors", {
        params: {
          bloodGroup,
          district: selectedDis.name,
          upazila,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen bg-base-100 py-20 relative overflow-hidden">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <BiSearchAlt2 className="text-4xl md:text-5xl text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Find Blood{" "}
              <span className="text-primary relative">
                Donors
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/20"></span>
              </span>
            </h1>
          </div>
          <p className="text-base md:text-xl text-base-content/80 max-w-2xl mx-auto mb-8">
            Search for available blood donors in your area quickly and easily.
            No registration required for emergency searches.
          </p>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <img
              className="max-w-xs w-full h-auto object-contain"
              src={searchImg}
              alt="Search illustration"
            />
          </motion.div>
        </motion.div>

        {/* Search Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto mb-12"
        >
          <motion.div variants={itemVariants}>
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FaSearch className="w-5 h-5 text-primary" />
                  Search Criteria
                </h2>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Blood Group */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FaTint className="text-red-500 w-4 h-4" />
                          Blood Group
                        </span>
                      </label>
                      <select
                        className="select select-bordered focus:border-primary"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        required
                      >
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                          (bg) => (
                            <option key={bg} value={bg}>
                              {bg}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    {/* District */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                          District
                        </span>
                      </label>
                      <select
                        className="select select-bordered focus:border-primary"
                        value={district}
                        onChange={(e) => {
                          setDistrict(e.target.value);
                          setUpazila("");
                        }}
                        required
                      >
                        <option value="">Select District</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Upazila */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-500 w-4 h-4" />
                          Upazila
                        </span>
                      </label>
                      <select
                        className="select select-bordered focus:border-primary"
                        value={upazila}
                        onChange={(e) => setUpazila(e.target.value)}
                        required
                        disabled={!upazilas.length}
                      >
                        <option value="">Select Upazila</option>
                        {upazilas.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSearching}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`btn btn-primary gap-2 `}
                    >
                      <FaSearch className="w-4 h-4" />
                      {isSearching ? "Searching..." : "Search Donors"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {isSearching ? (
            <div className="flex justify-center py-16">
              <Loader />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <FaCircle className="text-green-500 text-xs" />
                  <h3 className="text-lg font-semibold">
                    Found {results.length} donor{results.length > 1 ? "s" : ""}
                  </h3>
                </div>

                <PDFDownloadLink
                  document={<DonorPDFDocument donors={results} />}
                  fileName={`donor-results-${Date.now()}-by_BloodGrid.pdf`}
                  className="btn btn-outline btn-sm gap-2"
                >
                  {({ loading }) => (
                    <>
                      <FaDownload className="w-4 h-4" />
                      {loading ? "Preparing..." : "Download PDF"}
                    </>
                  )}
                </PDFDownloadLink>
              </div>

              {/* Results Table */}
              <div className="card bg-base-100 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Blood Group</th>
                        <th>District</th>
                        <th>Upazila</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((donor, index) => (
                        <motion.tr
                          key={donor._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-base-200/50"
                        >
                          <td>{index + 1}</td>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="w-10 h-10 rounded-full">
                                  {donor.photoUrl ? (
                                    <img
                                      className="object-cover w-full h-full rounded-full"
                                      src={donor.photoUrl}
                                      alt={donor.name}
                                    />
                                  ) : (
                                    <div className="bg-base-200 flex items-center justify-center w-full h-full rounded-full">
                                      <span className="text-sm font-bold text-base-content">
                                        {donor.name.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="font-medium">{donor.name}</span>
                            </div>
                          </td>
                          <td>
                            <a
                              className="text-primary hover:underline flex items-center gap-2"
                              href={`mailto:${donor.email}`}
                            >
                              <FaEnvelope className="w-4 h-4" />
                              {donor.email}
                            </a>
                          </td>
                          <td>
                            <span className="badge badge-primary badge-outline">
                              {donor.bloodGroup}
                            </span>
                          </td>
                          <td>{donor.district}</td>
                          <td>{donor.upazila}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            
            </div>
          ) : (
            !isSearching && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="max-w-md mx-auto">
                  <div className="flex justify-center mb-4">
                    <FaSearch className="w-12 h-12 text-base-content/40" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Search Yet</h3>
                  <p className="text-base-content/60">
                    Use the search form above to find available blood donors in
                    your area.
                  </p>
                </div>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SearchDonor;
