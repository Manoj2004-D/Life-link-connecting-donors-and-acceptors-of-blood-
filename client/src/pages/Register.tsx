import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // 👈 Added Link

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"donor" | "recipient">("recipient");
  const [bloodGroup, setBloodGroup] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
        bloodGroup: role === "donor" ? bloodGroup : undefined,
        
      });
      alert("Registered — please login");
      navigate("/login");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Register
        </h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-3"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="recipient">Recipient</option>
          <option value="donor">Donor</option>
        </select>

        {role === "donor" && (
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border p-2 rounded mb-3"
            required
          >
            <option value="">Choose blood group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        )}

        <button className="w-full bg-red-600 text-white py-2 rounded">
          Register
        </button>

        {/* 👇 Back to Home button */}
        <Link
          to="/"
          className="mt-4 block text-center bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
        >
          ⬅ Back to Home
        </Link>
      </form>
    </div>
  );
}
