"use client";

import Link from "next/link";

import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import {
  motion,
} from "framer-motion";

import {
  useWallet,
} from "../context/walletcontext";

import {
  useEffect,
  useState,
} from "react";

export default function Home() {

  const {

    walletAddress,

    walletConnected,

    connectWallet,

    disconnectWallet,

  } = useWallet();

  const [
    verifiedCount,
    setVerifiedCount,
  ] = useState(0);

  const [
    orgCount,
    setOrgCount,
  ] = useState(0);

  const [
    usersCount,
    setUsersCount,
  ] = useState(0);

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          const response =
            await fetch(
              "/api/stats"
            );

          const data =
            await response.json();

          if (
            data.success
          ) {

            setVerifiedCount(
              data.stats.credentialsCount
            );

            setOrgCount(
              data.stats.institutionsCount
            );

            setUsersCount(
              data.stats.usersCount
            );
          }

        } catch (error) {

          console.log(error);
        }
      };

    fetchStats();

  }, []);

  return (

    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>

      {/* NAVBAR */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10">

        <div className="flex items-center gap-2">

          <ShieldCheck className="text-cyan-400" />

          <h1 className="text-2xl font-bold">

            PortalProof

          </h1>

        </div>

        <div className="flex items-center gap-6 text-sm">

          <a
            href="#features"
            className="hover:text-cyan-400 transition duration-300"
          >

            Features

          </a>

          <Link
            href="/dashboard"
            className="hover:text-cyan-400 transition duration-300"
          >

            Dashboard

          </Link>

          <a
            href="#footer"
            className="hover:text-cyan-400 transition duration-300"
          >

            Docs

          </a>

          {walletConnected ? (

            <button
              onClick={
                disconnectWallet
              }
              className="bg-green-500 hover:bg-red-500 transition px-4 py-2 rounded-lg text-black font-semibold"
            >

              {walletAddress.slice(
                0,
                6
              )}

              ...

              {walletAddress.slice(
                -4
              )}

            </button>

          ) : (

            <button
              onClick={
                connectWallet
              }
              className="bg-cyan-500 hover:bg-cyan-400 transition px-4 py-2 rounded-lg text-black font-semibold"
            >

              Connect Wallet

            </button>

          )}

        </div>

      </nav>

      {/* HERO */}
      <motion.section
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32"
      >

        <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full text-cyan-300 text-sm mb-8">

          Built on Portaldot Blockchain

        </div>

        <h1 className="text-6xl md:text-7xl font-bold max-w-5xl leading-tight">

          Verify Credentials

          <span className="text-cyan-400">

            {" "}On-Chain

          </span>

        </h1>

        <p className="text-gray-400 text-lg mt-8 max-w-2xl">

          PortalProof helps organizations, students, and communities issue and verify trusted blockchain-powered credentials instantly.

        </p>

        <div className="flex gap-4 mt-10">

          <Link
            href="/dashboard"
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          >

            Launch App

            <ArrowRight
              size={18}
            />

          </Link>

          <button className="border border-white/10 hover:border-cyan-400 transition-all duration-300 px-6 py-3 rounded-xl hover:scale-110">

            Explore Docs

          </button>

        </div>

      </motion.section>

      {/* STATS */}
      <motion.section
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{
          once: true,
        }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-24"
      >

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

          <h2 className="text-4xl font-bold text-cyan-400">

            {verifiedCount.toLocaleString()}+

          </h2>

          <p className="text-gray-400 mt-2">

            Credentials Verified

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

          <h2 className="text-4xl font-bold text-cyan-400">

            {orgCount}+

          </h2>

          <p className="text-gray-400 mt-2">

            Organizations Onboarded

          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">

          <h2 className="text-4xl font-bold text-cyan-400">

            {usersCount}+

          </h2>

          <p className="text-gray-400 mt-2">

            Registered Users

          </p>

        </div>

      </motion.section>

      {/* FOOTER */}
      <footer
        id="footer"
        className="relative z-10 border-t border-white/10 px-8 py-16"
      >

        <div className="text-center text-gray-500">

          © 2026 PortalProof. All rights reserved.

        </div>

      </footer>

    </main>
  );
}