"use client";

import { useState } from "react";

export default function MatchPage() {
  const [blood, setBlood] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const findMatches = async () => {
    if (!blood) return;

    setLoading(true);
    setResults([]);
    setSearched(true);

    const res = await fetch(`/api/match?blood=${blood}`);
    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-red-50 px-6 py-10">

      {/* HEADER (EMERGENCY STYLE) */}
      <div className="max-w-3xl mx-auto text-center mb-8">
        <div className="inline-block px-4 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold animate-pulse">
          🚨 Emergency Matching System
        </div>

        <h1 className="text-4xl font-bold text-red-700 mt-4">
          Find Blood Donors Instantly 🩸
        </h1>

        <p className="text-gray-700 mt-3">
          We will search for compatible donors who can help save a life right now.
        </p>
      </div>

      {/* STEP CARD */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-red-100">

        <h2 className="font-semibold mb-3 text-gray-800">
          Step 1: Select Blood Type Needed
        </h2>

        {/* BLOOD SELECTOR */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {bloodTypes.map((b) => (
            <button
              key={b}
              onClick={() => setBlood(b)}
              className={`py-2 rounded-lg border font-semibold transition ${
                blood === b
                  ? "bg-red-600 text-white border-red-600"
                  : "hover:bg-red-50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* ACTION */}
        <button
          onClick={findMatches}
          disabled={!blood || loading}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Searching emergency network..." : "Find Emergency Donors 🚨"}
        </button>

        {/* STATUS */}
        {loading && (
          <p className="text-center text-gray-600 mt-4 animate-pulse">
            Contacting donor network...
          </p>
        )}
      </div>

      {/* RESULTS SECTION */}
      {searched && (
        <div className="max-w-3xl mx-auto mt-8">

          {/* HEADER */}
          {!loading && (
            <div className="text-center mb-4">
              <p className="text-gray-700">
                Found{" "}
                <span className="font-bold text-red-600">
                  {results.length}
                </span>{" "}
                compatible donor(s) for{" "}
                <span className="font-bold">{blood}</span>
              </p>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && results.length === 0 && (
            <div className="bg-white p-6 rounded-xl shadow border text-center">
              <p className="text-gray-600 font-medium">
                No compatible donors available right now.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Try another blood group or check again later.
              </p>
            </div>
          )}

          {/* DONOR CARDS */}
          <div className="space-y-4">
            {results.map((d: any) => (
              <div
                key={d.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-100 flex justify-between items-center"
              >

                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {d.full_name}
                  </p>

                  <p className="text-gray-600 text-sm">
                    🩸 {d.blood_group} • 📍 {d.location}
                  </p>

                  <p className="text-xs text-green-600 mt-1 font-semibold">
                    Available for donation
                  </p>
                </div>

                <a
                  href={`https://wa.me/${d.phone}`}
                  target="_blank"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 font-semibold"
                >
                  Contact
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}