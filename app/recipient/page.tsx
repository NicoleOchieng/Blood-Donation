"use client";

import { useState } from "react";

export default function RecipientPage() {
  const [form, setForm] = useState({
    name: "",
    bloodGroupNeeded: "",
    hospital: "",
    location: "",
    urgency: "normal",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("RECIPIENT REQUEST:", form);

    alert("Blood request submitted!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-blue-50 px-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Request Blood
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroupNeeded"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group Needed</option>
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
            name="hospital"
            placeholder="Hospital Name"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="urgency"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </select>

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Submit Request
          </button>

        </form>
      </div>
    </main>
  );
}