"use client";

import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <main className="min-h-screen bg-[#FFF8F6] text-[#1A1A1A]">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50 border-b border-[#FFE5E5]">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[#C8102E]">
          <span className="text-2xl">🩸</span>
          <span style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            BloodConnect
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {!isLoaded ? null : (
            <>
              {!isSignedIn ? (
                <>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 border border-[#C8102E]/30 text-[#C8102E] rounded-lg hover:bg-[#FFE5E5] transition-colors">
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A50D26] transition-colors">
                      Sign Up
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <UserButton />
              )}
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 pt-20 pb-24 max-w-5xl mx-auto text-center">
        <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-[#C8102E] bg-[#FFE5E5] rounded-full">
          A new donor signs up every few minutes
        </span>

        <h1
          className="text-5xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Your blood type could be
          <br />
          someone&apos;s <span className="text-[#C8102E]">last hope</span> today.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          BloodConnect links willing donors with patients who need blood right now.
          One donation can support up to three people — it takes less time than your coffee break.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/donor"
            className="px-8 py-3 bg-[#C8102E] text-white rounded-xl font-semibold hover:bg-[#A50D26] transition-colors shadow-lg shadow-[#C8102E]/20"
          >
            Become a Donor
          </Link>

          <Link
            href="/recipient"
            className="px-8 py-3 bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] rounded-xl font-semibold hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            Request Blood
          </Link>
        </div>
      </section>

      {/* PULSE DIVIDER */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1200 60" className="w-full h-12" preserveAspectRatio="none">
          <path
            d="M0 30 L300 30 L330 10 L360 50 L390 5 L420 55 L450 30 L1200 30"
            fill="none"
            stroke="#C8102E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* STATS STRIP */}
      <section className="px-6 py-16 bg-[#1A1A1A] text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { stat: "1 in 7", label: "hospital patients need blood" },
            { stat: "3", label: "lives saved per donation" },
            { stat: "56", label: "days until you can donate again" },
            { stat: "<10 min", label: "average donation time" },
          ].map((item) => (
            <div key={item.label}>
              <p
                className="text-3xl md:text-4xl font-bold text-[#F4B942]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {item.stat}
              </p>
              <p className="mt-2 text-sm text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          How it works
        </h2>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Donor path */}
          <div className="bg-white rounded-2xl p-8 border border-[#FFE5E5] shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-[#C8102E] mb-4">For Donors</h3>
            <ol className="space-y-4 text-gray-700 flex-1">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFE5E5] text-[#C8102E] text-sm font-bold flex items-center justify-center">1</span>
                <span>Sign up and register your profile with your blood type, phone number, and location.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFE5E5] text-[#C8102E] text-sm font-bold flex items-center justify-center">2</span>
                <span>Your profile appears in the donor list, visible to recipients searching for your blood type.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFE5E5] text-[#C8102E] text-sm font-bold flex items-center justify-center">3</span>
                <span>Recipients can reach you directly by phone when they need your help.</span>
              </li>
            </ol>
            <Link
              href="/requests"
              className="mt-6 inline-block text-[#C8102E] font-semibold hover:underline"
            >
              See who needs blood right now →
            </Link>
          </div>

          {/* Recipient path */}
          <div className="bg-white rounded-2xl p-8 border border-blue-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-blue-600 mb-4">For Recipients</h3>
            <ol className="space-y-4 text-gray-700 flex-1">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-bold flex items-center justify-center">1</span>
                <span>Sign up and post a request with the blood type needed, hospital, and urgency level.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-bold flex items-center justify-center">2</span>
                <span>Browse the donor list, filtered by the blood type you need.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-sm font-bold flex items-center justify-center">3</span>
                <span>Contact a matching donor directly using the phone number on their profile.</span>
              </li>
            </ol>
            <Link
              href="/receiver"
              className="mt-6 inline-block text-blue-600 font-semibold hover:underline"
            >
              Browse available donors →
            </Link>
          </div>
        </div>
      </section>

      {/* URGENT CALLOUT */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto bg-[#F4B942]/15 border border-[#F4B942] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg text-[#1A1A1A]">
              Type O-negative is needed in your area right now.
            </p>
            <p className="text-gray-600 mt-1">
              O-negative can be given to anyone, making it critical in emergencies.
            </p>
          </div>
          <Link
            href="/receiver"
            className="px-6 py-3 bg-[#1A1A1A] text-white rounded-xl font-semibold hover:bg-black transition-colors whitespace-nowrap"
          >
            Check if I match
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-bold text-center"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Stories from our community
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              quote: "I donated during my lunch break and got a message two days later that it helped a new mother after surgery. I didn't expect it to feel that personal.",
              name: "Amina, Donor",
            },
            {
              quote: "My father needed an emergency transfusion and we found a match within hours through this platform. I'm grateful beyond words.",
              name: "James, Recipient's family",
            },
            {
              quote: "Tracking my donation history and getting reminders when I'm eligible again has made giving blood a habit, not a one-time thing.",
              name: "Brian, Donor",
            },
          ].map((t) => (
            <div key={t.name} className="bg-white rounded-2xl p-6 border border-[#FFE5E5] shadow-sm flex flex-col">
              <p className="text-gray-700 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-[#C8102E]">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 bg-[#C8102E] text-white text-center">
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Ready to make a difference?
        </h2>
        <p className="mt-4 text-lg text-white/90 max-w-xl mx-auto">
          Sign up takes less than two minutes. Your next donation could be someone&apos;s lifeline.
        </p>
        <div className="mt-8">
          {!isLoaded ? null : !isSignedIn ? (
            <SignUpButton mode="modal">
              <button className="px-8 py-3 bg-white text-[#C8102E] rounded-xl font-semibold hover:bg-[#FFE5E5] transition-colors">
                Get Started
              </button>
            </SignUpButton>
          ) : (
            <Link
              href="/receiver"
              className="px-8 py-3 bg-white text-[#C8102E] rounded-xl font-semibold hover:bg-[#FFE5E5] transition-colors inline-block"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 bg-[#1A1A1A] text-gray-400 text-center text-sm">
        <p>🩸 BloodConnect — Connecting donors and recipients, one match at a time.</p>
        <p className="mt-2">© {new Date().getFullYear()} BloodConnect. All rights reserved.</p>
      </footer>

    </main>
  );
}
