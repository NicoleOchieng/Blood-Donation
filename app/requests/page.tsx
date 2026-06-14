"use client";

import { useEffect, useState } from "react";

type Request = {
  id: number;
  blood_group_needed: string;
  hospital: string;
  location: string;
  urgency: string;
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch("/api/requests/list");
      const data = await res.json();
      setRequests(data);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Loading emergency requests...
    </div>
  );
}

return (
  <main className="min-h-screen bg-gray-50 px-4 py-10">

    {/* HEADER */}
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h1 className="text-3xl font-bold text-red-600">
        Live Blood Requests 🏥
      </h1>

      <p className="text-gray-600 mt-2">
        Active emergency and scheduled requests from hospitals and patients
      </p>
    </div>

    {/* EMPTY STATE */}
    {requests.length === 0 ? (
      <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 text-center shadow-sm">
        <p className="text-gray-600 font-medium">
          No active requests at the moment
        </p>
        <p className="text-sm text-gray-500 mt-1">
          New emergencies will appear here in real time
        </p>
      </div>
    ) : (
      <div className="max-w-4xl mx-auto space-y-4">

        {requests.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* TOP ROW */}
            <div className="flex items-start justify-between">

              <div>
                <p className="text-lg font-bold text-red-600">
                  {r.blood_group_needed} Required
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  🏥 {r.hospital} • 📍 {r.location}
                </p>
              </div>

              {/* URGENCY BADGE */}
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  r.urgency === "critical"
                    ? "bg-red-100 text-red-700"
                    : r.urgency === "urgent"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {r.urgency.toUpperCase()}
              </span>

            </div>

            {/* BOTTOM ROW */}
            <div className="mt-4 flex items-center justify-between">

              <p className="text-xs text-gray-500">
                Request ID: #{r.id}
              </p>

              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
                View Matches
              </button>

            </div>

          </div>
        ))}

      </div>
    )}

  </main>
);
}