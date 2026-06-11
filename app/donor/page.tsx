"use client";

import { useState } from "react";

export default function DonorPage() {
  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    phone: "",
    available: "yes",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Next.js client-side action (temporary)
    console.log("DONOR DATA:", form);

    alert("Donor registered successfully!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-red-50 px-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Become a Donor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-red-600 text-white py-2 rounded">
            Register as Donor
          </button>

        </form>
      </div>
    </main>
  );
}