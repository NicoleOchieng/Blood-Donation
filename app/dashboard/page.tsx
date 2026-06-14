"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const d = await fetch("/api/donors/list").then((r) => r.json());
      const r = await fetch("/api/requests/list").then((r) => r.json());

      setDonors(d);
      setRequests(r);
    };

    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-red-600 to-red-400 text-white p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold">BloodConnect Dashboard 🩸</h1>
          <p className="mt-2 text-white/90">
            Real-time overview of donors and blood requests
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Total Donors</p>
          <p className="text-3xl font-bold text-red-600">{donors.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Active Requests</p>
          <p className="text-3xl font-bold text-blue-600">{requests.length}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <p className="text-gray-500 text-sm">Critical Requests</p>
          <p className="text-3xl font-bold text-orange-500">
            {requests.filter((r: any) => r.urgency === "critical").length}
          </p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        
        {/* DONORS */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Recent Donors
          </h2>

          <div className="space-y-3">
            {donors.slice(0, 6).map((d: any) => (
              <div
                key={d.id}
                className="p-3 border rounded-lg hover:bg-gray-50"
              >
                <p className="font-semibold">{d.full_name}</p>
                <p className="text-sm text-gray-600">
                  🩸 {d.blood_group} • 📍 {d.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-bold mb-4 text-blue-600">
            Blood Requests
          </h2>

          <div className="space-y-3">
            {requests.slice(0, 6).map((r: any) => (
              <div
                key={r.id}
                className={`p-3 border rounded-lg ${
                  r.urgency === "critical"
                    ? "border-red-500 bg-red-50"
                    : r.urgency === "urgent"
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <p className="font-semibold text-red-600">
                  {r.blood_group_needed}
                </p>
                <p className="text-sm text-gray-600">
                  🏥 {r.hospital} • 📍 {r.location}
                </p>
                <p className="text-xs mt-1">
                  Urgency: <b>{r.urgency}</b>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}