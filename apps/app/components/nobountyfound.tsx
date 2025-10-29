"use client";
import React from "react";
import { PackageSearch } from "lucide-react";
import { motion } from "framer-motion";

const NoBountyFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="p-6 bg-gray-100 rounded-full shadow-sm"
      >
        <PackageSearch className="w-12 h-12 text-gray-500" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xl font-semibold text-gray-800"
      >
        No Bounty Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-2 text-gray-500"
      >
        It looks like there are no bounties available right now.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition"
        onClick={() => window.location.reload()}
      >
        Refresh
      </motion.button>
    </div>
  );
};

export default NoBountyFound;
