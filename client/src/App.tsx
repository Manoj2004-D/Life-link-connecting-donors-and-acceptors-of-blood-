import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./HomePage";  // already inside src
import Register from "./pages/Register";
import Login from "./pages/Login";
// import DonorDashboard from "./pages/DonorDashboard";
import RecipientDashboard from "./pages/RecipientDashboard";
import RequestsDashboard from "./RequestsDashboard"; // correct if in src/


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<RequestsDashboard />} /> {/* admin */}
      {/* Protected */}
      {/* <Route
        path="/donor-dashboard"
        element={
          <PrivateRoute allowedRole="donor">
            <DonorDashboard />
          </PrivateRoute>
        }
      /> */}
      <Route
        path="/recipient-dashboard"
        element={
          <PrivateRoute allowedRole="recipient">
            <RecipientDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
