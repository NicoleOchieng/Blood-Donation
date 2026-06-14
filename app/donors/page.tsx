"use client";

import { useEffect, useState } from "react";

type Donor = {
  id: number;
  full_name: string;
  blood_group: string;
  phone: string;
  location: string;
};

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await fetch("/api/donors/list");
      const data = await res.json();
      setDonors(data);
      setLoading(false);
    };

    fetchDonors();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Loading available donors...
    </div>
  );
}

return (
  <main className="min-h-screen bg-gray-50 px-4 py-10">

    {/* HEADER */}
    <div className="max-w-4xl mx-auto text-center mb-10">
      <h1 className="text-3xl font-bold text-red-600">
        Available Donor Network 🩸
      </h1>

      <p className="text-gray-600 mt-2">
        Verified donors who can be contacted during emergencies
      </p>
    </div>

    {/* EMPTY STATE */}
    {donors.length === 0 ? (
      <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 text-center shadow-sm">
        <p className="text-gray-600 font-medium">
          No donors available right now
        </p>
        <p className="text-sm text-gray-500 mt-1">
          New donors will appear here after registration
        </p>
      </div>
    ) : (
      <div className="max-w-4xl mx-auto space-y-4">

        {donors.map((d) => (
          <div
            key={d.id}
            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition flex justify-between items-center"
          >

            {/* LEFT SIDE */}
            <div>

              <p className="text-lg font-bold text-gray-800">
                {d.full_name}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                🩸 {d.blood_group} • 📍 {d.location || "Location not specified"}
              </p>

              <p className="text-xs text-red-600 mt-1 font-semibold">
                ✔ Available for donation
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Registered donor in BloodConnect network
              </p>

            </div>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex flex-col items-end gap-2">

              <a
                href={`https://wa.me/${d.phone}`}
                target="_blank"
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition"
              >
                Contact
              </a>

              <p className="text-xs text-gray-400">
                WhatsApp direct
              </p>

            </div>

          </div>
        ))}

      </div>
    )}

  </main>
);
}