"use client";

import { motion } from "framer-motion";

export default function LoadingSpinner() {

  return (

    <div className="flex items-center justify-center py-24">

      <div className="flex flex-col items-center gap-6">

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full"
        />

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Loading Data
          </h2>

          <p className="text-gray-400 mt-2">
            Fetching blockchain records...
          </p>

        </div>

      </div>

    </div>

  );

}