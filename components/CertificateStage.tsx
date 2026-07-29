"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function CertificateStage({ onReveal }: { onReveal?: () => void }) {
  const [showBackground, setShowBackground] = useState(true);

  return (
    <section className="certificate-stage" aria-label="Vehicle certification">
      <AnimatePresence>
        {showBackground && (
          <motion.div
            className="certificate-popup-background"
            initial={{
              x: "-50%",
              y: "-50%",
              opacity: 0,
              scale: 0.58,
              filter: "blur(18px)",
            }}
            animate={{
              x: "-50%",
              y: "-50%",
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              x: "-50%",
              y: "-50%",
              opacity: 0,
              scale: 1.16,
              filter: "blur(16px)",
            }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="certificate-orbit"
        initial={{ opacity: 0, scale: 0.82, rotateY: 0, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          scale: [0.82, 1, 1, 1, 1, 1],
          rotateY: [0, 0, 90, 180, 270, 360],
          filter: "blur(0px)",
        }}
        transition={{
          opacity: { duration: 0.3, delay: 0.52 },
          filter: { duration: 0.45, delay: 0.52 },
          scale: {
            duration: 1.91,
            delay: 0.52,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          },
          rotateY: {
            duration: 1.65,
            delay: 0.78,
            times: [0, 0.08, 0.31, 0.54, 0.77, 1],
            ease: "easeInOut",
          },
        }}
        onAnimationComplete={() => {
          setShowBackground(false);
          onReveal?.();
        }}
      >
        <span className="certificate-ring" aria-hidden="true" />
        <img src="/car_avatar.png" alt="Certified red performance car" />
      </motion.div>
    </section>
  );
}
