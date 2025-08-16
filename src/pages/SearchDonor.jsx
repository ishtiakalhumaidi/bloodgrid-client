import { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import {
  FaSearch,
  FaTint,
  FaMapMarkerAlt,
  FaCircle,
  FaEnvelope,
} from "react-icons/fa";
import Loader from "../components/common/Loader";
import searchImg from "../assets/images/search.svg";
import { BiSearchAlt2 } from "react-icons/bi";
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
      setUpazilas([]); // Clear upazilas when district is cleared
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
    setResults([]); // Clear previous results
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

  return (
    <div data-aos="fade-up"
      // data-aos-delay="300"
      data-aos-duration="1200" className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex text-center flex-col md:flex-row items-center justify-center text-4xl  md:text-5xl gap-2">
        <BiSearchAlt2 className="text-primary" />
        <h2 className=" font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Search Blood Donors
        </h2>
      </div>
      <img
        className="max-w-xs mx-auto"
        src={searchImg}
        alt="Search illustration"
      />

      <form
        onSubmit={handleSearch}
        className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl border border-base-300 space-y-6 mt-6"
      >
        <div className="grid md:grid-cols-3 gap-4">
          {/* Blood Group */}
          <div>
            <label className="label font-medium mb-1 flex items-center gap-2">
              <FaTint className="text-red-500" /> Blood Group
            </label>
            <select
              className="select select-bordered w-full"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label font-medium mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" /> District
            </label>
            <select
              className="select select-bordered w-full"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila(""); // Reset upazila when district changes
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
          <div>
            <label className="label font-medium mb-1 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" /> Upazila
            </label>
            <select
              className="select select-bordered w-full"
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

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-wide gap-2">
            <FaSearch /> Search Donors
          </button>
        </div>
      </form>

      {/* Result Section */}
      <div className="mt-12">
        {isSearching ? (
          <Loader />
        ) : results.length > 0 ? (
          <>
            <div className="flex flex-row-reverse justify-between">
              <PDFDownloadLink
                document={<DonorPDFDocument donors={results} />}
                fileName={`donor-results-${Date.now()}-by_BloodGrid.pdf`}
                className="btn btn-sm btn-secondary"
              >
                {({ loading }) =>
                  loading ? "Preparing PDF..." : "Download PDF"
                }
              </PDFDownloadLink>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-base-content">
                  <FaCircle className="inline text-green-500 text-xs mr-2" />{" "}
                  Found {results.length} donor{results.length > 1 && "s"}
                </h3>
              </div>
            </div>

            {/* --- Ref is attached to the content wrapper --- */}
            <div
              id="invoice"
              className="overflow-x-auto rounded-xl border border-base-300 shadow-sm"
            >
              <table className="table table-zebra w-full text-sm">
                <thead className="bg-base-200 text-base font-medium">
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
                    <tr key={donor._id}>
                      <td>{index + 1}</td>
                      <td>{donor.name}</td>
                      <td className="flex items-center gap-1">
                        <FaEnvelope className="text-blue-400" />
                        <a
                          className="text-blue-400 hover:underline"
                          href={`mailto:${donor.email}`}
                        >
                          {donor.email}
                        </a>
                      </td>
                      <td>
                        <span className="badge badge-outline badge-primary">
                          {donor.bloodGroup}
                        </span>
                      </td>
                      <td>{donor.district}</td>
                      <td>{donor.upazila}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No donors found yet. Use the form to search for available donors.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
