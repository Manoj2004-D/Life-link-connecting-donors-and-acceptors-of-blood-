import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Request {
  _id: string;
  name: string;
  bloodGroup: string;
  units: number;
  contact: string;
  status: string; // e.g., "Pending", "Accepted", "Completed"
  createdAt: string;
}

export default function RecipientDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipient requests (later: filter by logged-in user’s ID/email)
  const fetchRequests = async () => {
    try {
      const res = await axios.get<Request[]>("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Cancel/Delete request
  const cancelRequest = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error deleting request:", err);
      alert("❌ Failed to cancel request.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 py-12 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Recipient Dashboard
        </h1>
        <Link
          to="/"
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
        >
          ⬅ Back to Home
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading requests...</p>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-2xl bg-white">
          <table className="min-w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-red-600 to-red-500 text-white">
                <th className="px-4 py-3 text-lg text-center">Blood Group</th>
                <th className="px-4 py-3 text-lg text-center">Units</th>
                <th className="px-4 py-3 text-lg text-center">Contact</th>
                <th className="px-4 py-3 text-lg text-center">Status</th>
                <th className="px-4 py-3 text-lg text-center">Date</th>
                <th className="px-4 py-3 text-lg text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500 text-lg"
                  >
                    🚫 No blood requests yet
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-red-50 transition`}
                  >
                    <td className="px-4 py-3 text-center font-bold text-red-600">
                      {req.bloodGroup}
                    </td>
                    <td className="px-4 py-3 text-center">{req.units}</td>
                    <td className="px-4 py-3 text-center">{req.contact}</td>
                    <td
                      className={`px-4 py-3 text-center font-semibold ${
                        req.status === "Accepted"
                          ? "text-green-600"
                          : req.status === "Completed"
                          ? "text-blue-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status || "Pending"}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {req.status === "Pending" && (
                        <button
                          onClick={() => cancelRequest(req._id)}
                          className="bg-red-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-700 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
