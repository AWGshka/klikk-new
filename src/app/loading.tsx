"use client";

import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="page-container loading-state" aria-live="polite">
      <motion.div
        className="loading-mark"
        animate={{ scale: [1, 1.35, 1], rotate: [0, 90, 180] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <p>Preparing your Klikk experience</p>
    </div>
  );
}
