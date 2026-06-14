"use client";

import { useState } from "react";

export default function RecipientPage() {
  const [form, setForm] = useState({
    blood_group_needed: "",
    hospital: "",
    location: "",
    urgency: "normal",
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

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Blood request submitted successfully 🏥");
      setForm({
        blood_group_needed: "",
        hospital: "",
        location: "",
        urgency: "normal",
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
          Request Blood 🏥
        </h1>

        <p className="text-gray-600 mt-2 text-sm">
          Submit an emergency or scheduled blood requirement. We’ll help match you with donors.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* BLOOD GROUP */}
        <select
          name="blood_group_needed"
          value={form.blood_group_needed}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option value="">Select Blood Group Needed</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        {/* HOSPITAL */}
        <input
          name="hospital"
          placeholder="Hospital Name (e.g. Kenyatta Hospital)"
          value={form.hospital}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        {/* LOCATION */}
        <input
          name="location"
          placeholder="Location (City / Area)"
          value={form.location}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        {/* URGENCY */}
        <select
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
          className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
          <option value="critical">Critical</option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red
          -700 transition disabled:opacity-50"
        >
          {loading ? "Submitting Request..." : "Submit Emergency Request 🚨"}
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
        Your request will be visible to matching donors in your area.
      </p>

    </div>

  </main>
  );
}