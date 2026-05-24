"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function ChartCard({
  title,
  children,
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
      whileHover={{
        y: -4,
      }}
      className="bg-white/5 border border-white/10 hover:border-cyan-500/20 rounded-[32px] p-8 transition-all duration-300 relative overflow-hidden"
    >

      {/* Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full"></div>

      <div className="relative z-10">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">

          {title}

        </h2>

        {/* Content */}
        <div className="h-[350px]">

          {children}

        </div>

      </div>

    </motion.div>

  );

}