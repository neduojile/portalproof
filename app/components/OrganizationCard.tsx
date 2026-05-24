"use client";

import {
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

type Props = {
  organization: {
    name: string;
    credentials: number;
    verified: number;
    joined: string;
    type: string;
    description: string;
  };
};

export default function OrganizationCard({
  organization,
}: Props) {

  return (

    <motion.div
      whileHover={{
        y: -10,
      }}
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 rounded-[36px] p-8 transition-all duration-300 relative overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* Top */}
        <div className="flex items-start justify-between mb-10">

          <div>

            <div className="flex items-center gap-3 mb-5 flex-wrap">

              <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">

                <CheckCircle2 size={16} />

                Verified

              </div>

              <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                {organization.type}

              </div>

            </div>

            <h2 className="text-4xl font-bold leading-tight">
              {organization.name}
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              {organization.description}
            </p>

          </div>

          <div className="bg-cyan-500/10 p-4 rounded-2xl">

            <Sparkles
              className="text-cyan-400"
              size={28}
            />

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mb-10">

          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

            <p className="text-gray-400 mb-3">
              Credentials Issued
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {organization.credentials}
            </h3>

          </div>

          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

            <p className="text-gray-400 mb-3">
              Verified Credentials
            </p>

            <h3 className="text-3xl font-bold text-cyan-400">
              {organization.verified}
            </h3>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-6 flex-wrap">

          <div>

            <p className="text-gray-400 text-sm">
              Joined PortalProof
            </p>

            <p className="font-semibold mt-1">
              {organization.joined}
            </p>

          </div>

          <button className="bg-cyan-500 hover:bg-cyan-400 transition-all duration-300 px-6 py-3 rounded-2xl text-black font-semibold hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/20">

            View Organization

            <ArrowUpRight
              size={18}
            />

          </button>

        </div>

      </div>

    </motion.div>

  );

}