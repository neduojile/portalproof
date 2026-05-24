"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  badge: string;
  badgeColor: string;
  valueColor?: string;
};

export default function DashboardStatCard({
  title,
  value,
  icon,
  badge,
  badgeColor,
  valueColor = "text-cyan-400",
}: Props) {

  return (

    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white/5 border border-white/10 rounded-[32px] p-8"
    >

      <div className="flex items-center justify-between mb-6">

        {icon}

        <div
          className={`px-4 py-2 rounded-full text-sm ${badgeColor}`}
        >

          {badge}

        </div>

      </div>

      <h2
        className={`text-5xl font-bold mb-4 ${valueColor}`}
      >

        {value}

      </h2>

      <p className="text-gray-400">
        {title}
      </p>

    </motion.div>

  );

}