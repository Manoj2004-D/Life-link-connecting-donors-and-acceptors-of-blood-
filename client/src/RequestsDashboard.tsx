// client/src/RequestsDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Request {
  _id: string;
  name: string;
  bloodGroup: string;
  units: number;
  contact: string;
  createdAt: string;
}

export default function RequestsDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("All");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // Fetch requests
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get<Request[]>("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  // Delete request
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
      alert("❌ Failed to delete request.");
    }
  };

  // Apply filters & sorting
  const filteredRequests = requests
    .filter(
      (req) =>
        (filterGroup === "All" || req.bloodGroup === filterGroup) &&
        (req.name.toLowerCase().includes(search.toLowerCase()) ||
          req.contact.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 py-12 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center w-full">
          Blood Requests Dashboard
        </h1>
        {/* Redirect button */}
<Link
  to="/"
  className="bg-red-600 text-white px-2.5 py-1 rounded text-xs font-normal hover:bg-red-700 transition flex wrap items-center gap-1"
>
  ← Home
</Link>


      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-12 items-center justify-center w-full max-w-5xl">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name or contact"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-72 shadow-sm focus:ring-2 focus:ring-red-500 text-base text-center"
        />

        {/* Blood Group Filter */}
        <select
          value={filterGroup}
          onChange={(e) => setFilterGroup(e.target.value)}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-red-500 text-base text-center"
        >
          <option value="All">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        {/* Sort Button */}
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
          }
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition text-base"
        >
          Sort: {sortOrder === "latest" ? "Latest First" : "Oldest First"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white w-full max-w-6xl">
        <table className="min-w-full border-collapse text-base">
          <thead>
            <tr className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <th className="px-4 py-3 text-center">Name</th>
              <th className="px-4 py-3 text-center">Blood Group</th>
              <th className="px-4 py-3 text-center">Units</th>
              <th className="px-4 py-3 text-center">Contact</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Time</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500 text-base"
                >
                  🚫 No matching requests found
                </td>
              </tr>
            ) : (
              filteredRequests.map((req, idx) => {
                const dateObj = new Date(req.createdAt);
                const date = dateObj.toLocaleDateString();
                const time = dateObj.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <tr
                    key={req._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-red-50 transition`}
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium text-center">
                      {req.name}
                    </td>
                    <td className="px-4 py-3 font-semibold text-red-600 text-center">
                      {req.bloodGroup}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-center">
                      {req.units}
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-center">
                      {req.contact}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {date}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-center">
                      {time}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
