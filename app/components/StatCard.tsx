"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
};

export default function StatCard({
  title,
  value,
  icon,
  badge,
  badgeColor,
}: Props) {

  return (

    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      className="bg-white/5 border border-white/10 hover:border-cyan-500/30 rounded-[32px] p-8 transition-all duration-300 relative overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div className="text-cyan-400">
            {icon}
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm ${badgeColor}`}
          >

            {badge}

          </div>

        </div>

        {/* Value */}
        <h2 className="text-5xl font-bold mb-3 text-white">

          {value}

        </h2>

        {/* Title */}
        <p className="text-gray-400 text-lg">

          {title}

        </p>

      </div>

    </motion.div>

  );

}