"use client";

import { useState } from "react";

export default function DonorPage() {
  const [form, setForm] = useState({
    full_name: "",
    blood_group: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Donor registered successfully 🎉");
      setForm({
        full_name: "",
        blood_group: "",
        phone: "",
        location: "",
      });
    } else {
      setMessage(data.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
  <main className="min-h-screen bg-red-50 flex items-center justify-center px-4">

    <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg border border-red-100 p-8">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">
          Become a Donor 🩸
        </h1>

        <p className="text-gray-600 mt-2 text-sm">
          Join the emergency donor network and help save lives in your area
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <select
          name="blood_group"
          value={form.blood_group}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <input
          name="phone"
          placeholder="Phone Number (for emergency contact)"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <input
          name="location"
          placeholder="Location (e.g. Nairobi)"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Join Donor Network 🚨"}
        </button>

        {/* MESSAGE */}
        {message && (
          <div className="text-center text-sm mt-3">
            <p className="text-green-600 font-medium">
              {message}
            </p>
          </div>
        )}

      </form>

      {/* FOOTER NOTE */}
      <p className="text-xs text-gray-500 text-center mt-6">
        You may be contacted during emergencies based on your availability.
      </p>

    </div>

  </main>
  );
}