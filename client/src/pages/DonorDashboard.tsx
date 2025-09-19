// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// export default function DonorDashboard(){
//   const { user, token } = useAuth();
//   const [requests, setRequests] = useState<any[]>([]);

//   useEffect(() => {
//     // fetch pending requests matching donor blood group or all
//     const load = async () => {
//       const res = await axios.get("http://localhost:5000/api/requests/pending");
//       setRequests(res.data);
//     };
//     load();
//   }, []);

//   const accept = async (id: string) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/requests/${id}/accept`, null, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       setRequests(prev => prev.filter(r => r._id !== id));
//       alert("Accepted — please contact recipient");
//     } catch (err) { console.error(err); alert("Accept failed"); }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold">Donor Dashboard</h2>
//       <p className="mb-4">Hello, {user?.name} ({user?.bloodGroup})</p>
//       <div>
//         {requests.map(r => (
//           <div key={r._id} className="border p-3 rounded mb-3">
//             <div><strong>{r.bloodGroup}</strong> — {r.units} units</div>
//             <div>Contact: {r.contact}</div>
//             <button onClick={() => accept(r._id)} className="mt-2 bg-red-600 text-white px-3 py-1 rounded">Accept</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
