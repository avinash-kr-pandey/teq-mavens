"use client";

import { motion } from "framer-motion";

export function HomeStage() {
  const metrics = [
    { value: "352", label: "Top Speed", position: "left-top" },
    { value: "620", label: "Power (HP)", position: "left-middle" },
    { value: "780", label: "Torque", position: "left-bottom" },
    { value: "3.2 Sec", label: "0-100 KM/H", position: "right-top" },
    { value: "2,450 KM", label: "Oil Change", position: "right-middle" },
    { value: "520 KM", label: "Range", position: "right-bottom" },
  ];

  return (
    <motion.section
      className="home-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      <div className="home-performance-metrics">
        {metrics.map((metric, index) => (
          <motion.div
            className={`home-performance-metric ${metric.position}`}
            key={metric.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.36,
              delay: 0.14 + (index % 3) * 0.07,
              ease: "easeOut",
            }}
          >
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Center Car Portrait Circle */}
      <div className="center-car-portal">
        <div className="car-glow-ring" />
        <img src="/car.png" alt="Black sports car" className="portal-car-img" />
      </div>
    </motion.section>
  );
}
