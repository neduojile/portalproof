"use client";

import { motion } from "framer-motion";

import {
  Activity,
} from "lucide-react";

type Credential = {
  recipient: string;
  title: string;
  institution: string;
  status: string;
};

type Props = {
  credentials: Credential[];
};

export default function ActivityFeed({
  credentials,
}: Props) {

  return (

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
        duration: 0.4,
      }}
      className="bg-white/5 border border-white/10 hover:border-cyan-500/20 rounded-[32px] p-8 transition-all duration-300"
    >

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">

        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>

        <Activity className="text-cyan-400" />

        <h2 className="text-3xl font-bold">
          Recent Activity
        </h2>

      </div>

      {/* Feed */}
      <div className="space-y-6">

        {credentials
          .slice(0, 5)
          .map(
            (
              credential,
              index
            ) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.08,
                }}
                className="bg-black/30 border border-white/10 hover:border-cyan-500/20 rounded-3xl p-5 transition-all duration-300"
              >

                <h3 className="text-xl font-semibold">
                  {credential.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  {credential.recipient}
                </p>

                <div className="flex items-center gap-3 mt-4 flex-wrap">

                  <div className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">

                    {credential.institution}

                  </div>

                  <div
                    className={`px-4 py-2 rounded-full text-sm ${
                      credential.status ===
                      "Verified"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >

                    {credential.status}

                  </div>

                </div>

              </motion.div>

            )
          )}

      </div>

    </motion.div>

  );

}