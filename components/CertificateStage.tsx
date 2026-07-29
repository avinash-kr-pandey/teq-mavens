"use client";

import { motion } from "framer-motion";

export function CertificateStage({ onReveal }: { onReveal: () => void }) {
  return (
    <section className="certificate-stage" aria-label="Vehicle certification">
      <motion.div
        className="certificate-orbit"
        initial={{ opacity: 0, scale: 0.72, rotate: 0 }}
        animate={{
          opacity: 1,
          scale: [0.72, 1, 1, 1.04, 1],
          rotate: [0, 0, 360, 360, 360],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.2, 0.72, 0.86, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={onReveal}
      >
        <span className="certificate-ring" aria-hidden="true" />
        <img src="/car_avatar.png" alt="Certified red performance car" />
      </motion.div>
    </section>
  );
}
