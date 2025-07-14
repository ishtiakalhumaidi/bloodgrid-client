import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaTint,
  FaMapMarkerAlt,
  FaCircle,
  FaEnvelope,
} from "react-icons/fa";
import Loader from "../components/common/Loader";

const SearchDonor = () => {
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
    if (!district) return;
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
    const selectedDis = districts.find((dis) => dis.id == district);

    try {
      const res = await axios.get("http://localhost:5000/donors", {
        params: {
          bloodGroup,
          district: selectedDis.name,
          upazila,
        },
      });

      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching donors:", err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        🔍 Search Blood Donors
      </h2>

      <form
        onSubmit={handleSearch}
        className="bg-base-100 p-6 md:p-8 rounded-2xl shadow-xl border border-base-300 space-y-6"
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
          <button className="btn btn-primary btn-wide gap-2">
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
            <h3 className="text-xl font-semibold text-base-content mb-4">
              <FaCircle className="inline text-green-500" /> Found{" "}
              {results.length} donor
              {results.length > 1 && "s"}
            </h3>
            <div className="overflow-x-auto rounded-xl border border-base-300 shadow-sm">
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
            No donors found yet. Try adjusting your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchDonor;
