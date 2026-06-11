"use client";

import Link from "next/link";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">

        <Link href="/" className="text-xl font-bold text-red-600">
          🩸 BloodConnect
        </Link>

        <div className="flex items-center gap-3">

          {/* NOT SIGNED IN */}
          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}

          {/* SIGNED IN */}
          {isSignedIn && <UserButton />}

        </div>
      </nav>

      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto px-6 pt-20">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">
          Blood Donation Platform
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Save lives by becoming a donor or request blood as a recipient.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/donor"
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700"
          >
            Become a Donor
          </Link>

          <Link
            href="/recipient"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Request Blood
          </Link>
        </div>
      </section>

    </main>
  );
}