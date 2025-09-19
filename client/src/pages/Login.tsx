import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";  // 👈 Added Link
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data.user, res.data.token);
      if (res.data.user.role === "donor") navigate("/donor-dashboard");
      else navigate("/recipient-dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
          Login
        </h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button className="w-full bg-red-600 text-white py-2 rounded">
          Login
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
