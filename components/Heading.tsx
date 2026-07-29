"use client";

import { motion } from "framer-motion";

export function Heading() {
  return (
    <motion.header
      className="hero-heading"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
    >
      <h1>
        ENGINEERED FOR <span>PASSION</span>
      </h1>
      <p>Precision. Power. Performance</p>
      <i />
    </motion.header>
  );
}
