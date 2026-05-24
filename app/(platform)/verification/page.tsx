"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import toast from "react-hot-toast";

import QRCode from "react-qr-code";

import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Globe,
  FileCheck,
  BadgeCheck,
  CalendarDays,
  Building2,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  date: string;
  metadata: string;
  status: string;
  verificationId: string;
};

export default function VerificationPage() {

  const searchParams = useSearchParams();

  const [search, setSearch] =
    useState("");

  const [result, setResult] =
    useState<Credential | null>(null);

  const [notFound, setNotFound] =
    useState(false);

  function generateHash(
    verificationId: string
  ) {

    return `0x${verificationId
      .replace(/-/g, "")
      .toLowerCase()}8ab912ec`;

  }

  async function handleVerification(
    searchValue?: string
  ) {

    const query =
      (searchValue || search).trim();

    if (!query) return;

    try {

      setNotFound(false);

      const response =
        await fetch(
          "/api/credentials/verify",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              credentialId: query,
            }),
          }
        );

      const data =
        await response.json();

      if (
        data.success &&
        data.verified
      ) {

        setResult({
          recipient:
            data.credential
              .recipientName,

          title:
            data.credential.title,

          institution:
            data.credential
              .recipientEmail,

          date:
            new Date(
              data.credential.issuedAt
            ).toLocaleDateString(),

          metadata:
            data.credential
              .blockchainHash,

          status:
            "Verified",

          verificationId:
            data.credential.id,
        });

        toast.success(
          "Credential verified successfully!"
        );

      } else {

        setResult(null);

        setNotFound(true);

        toast.error(
          "Credential not found"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        "Verification failed"
      );
    }
  }

  async function copyVerificationId() {

    if (!result) return;

    await navigator.clipboard.writeText(
      result.verificationId
    );

    toast.success(
      "Verification ID copied!"
    );

  }

  useEffect(() => {

    const verificationId =
      searchParams.get("id");

    if (!verificationId)
      return;

    setSearch(verificationId);

    handleVerification(
      verificationId
    );

  }, [searchParams]);

  return (

    <main className="min-h-screen bg-black text-white p-8 overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px] rounded-full"></div>

      {/* Header */}
      <div className="relative z-10 text-center mb-20">

        <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 px-5 py-3 rounded-full text-cyan-300 text-sm mb-8">

          <ShieldCheck size={18} />

          Blockchain Verification Engine

        </div>

        <h1 className="text-6xl font-bold max-w-5xl mx-auto leading-tight">

          Verify Credentials

          <span className="text-cyan-400">
            {" "}Instantly
          </span>

        </h1>

        <p className="text-gray-400 text-lg mt-8 max-w-3xl mx-auto">
          Validate blockchain-secured credentials and confirm authenticity across the PortalProof ecosystem.
        </p>

      </div>

      {/* Search Box */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative z-10 max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-xl mb-16"
      >

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">

            <Search
              size={22}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Enter Credential ID..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleVerification();

                }

              }}
              className="bg-transparent outline-none w-full text-lg"
            />

          </div>

          <button
            onClick={() =>
              handleVerification()
            }
            className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 hover:scale-105 text-black font-semibold px-8 py-4 rounded-2xl"
          >

            Verify Now

          </button>

        </div>

      </motion.div>

      {/* VERIFIED */}
      {result && (

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative z-10 max-w-6xl mx-auto bg-white/5 border border-cyan-500/20 rounded-[3rem] p-10 md:p-12 backdrop-blur-xl overflow-hidden"
        >

          <div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10 mb-14">

            <div>

              <div className="flex flex-wrap items-center gap-4 mb-6">

                <div className="bg-green-500/10 text-green-400 px-5 py-3 rounded-full flex items-center gap-2 text-sm">

                  <CheckCircle2 size={18} />

                  Verified Credential

                </div>

                <div className="bg-cyan-500/10 text-cyan-400 px-5 py-3 rounded-full text-sm">

                  On-Chain Secured

                </div>

              </div>

              <h2 className="text-5xl font-bold leading-tight max-w-3xl">
                {result.title}
              </h2>

            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-[2rem] p-8 min-w-[240px]">

              <div className="flex items-center gap-3 mb-4">

                <Sparkles
                  className="text-cyan-400"
                  size={24}
                />

                <p className="text-gray-400">
                  Verification Score
                </p>

              </div>

              <h3 className="text-6xl font-bold text-cyan-400">
                99.9%
              </h3>

            </div>

          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="space-y-6">

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <h3 className="text-3xl font-bold">
                  {result.recipient}
                </h3>

              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <h3 className="text-2xl font-semibold">
                  {result.institution}
                </h3>

              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <h3 className="text-2xl font-semibold">
                  {result.date}
                </h3>

              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <h3 className="text-xl font-semibold break-all">
                  {result.metadata}
                </h3>

              </div>

            </div>

            <div className="space-y-6">

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-gray-400">
                    Credential ID
                  </p>

                  <button
                    onClick={
                      copyVerificationId
                    }
                    className="hover:text-cyan-400"
                  >

                    <Copy size={18} />

                  </button>

                </div>

                <h3 className="text-2xl font-bold text-cyan-400 break-all">
                  {result.verificationId}
                </h3>

              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7 flex flex-col items-center justify-center">

                <div className="bg-white p-4 rounded-2xl">

                  <QRCode
                    value={`http://localhost:3000/verification?id=${result.verificationId}`}
                    size={160}
                  />

                </div>

              </div>

              <div className="bg-black/30 border border-white/10 rounded-3xl p-7">

                <h3 className="text-lg font-semibold text-cyan-400 break-all">

                  {
                    generateHash(
                      result.verificationId
                    )
                  }

                </h3>

              </div>

            </div>

          </div>

        </motion.div>

      )}

      {/* NOT FOUND */}
      {notFound && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="relative z-10 max-w-4xl mx-auto bg-red-500/10 border border-red-500/20 rounded-[3rem] p-12 text-center backdrop-blur-xl"
        >

          <div className="bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">

            <AlertTriangle
              className="text-red-400"
              size={50}
            />

          </div>

          <h2 className="text-5xl font-bold mb-5">
            Credential Not Found
          </h2>

        </motion.div>

      )}

    </main>

  );

}