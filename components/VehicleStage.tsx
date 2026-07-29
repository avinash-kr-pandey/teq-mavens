"use client";

import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const options = ["Customize", "Bodywork", "Paint Job", "Accessories"] as const;

const details = {
  Customize: {
    metricA: "352",
    metricALabel: "Top Speed",
    metricB: "620",
    metricBLabel: "Power (HP)",
    metricC: "780",
    metricCLabel: "Torque",
    metricD: "3.2 Sec",
    metricDLabel: "0-100 KM/H",
    metricE: "2,450 KM",
    metricELabel: "Oil Change",
    metricF: "520 KM",
    metricFLabel: "Range",
  },
  Bodywork: {
    metricA: "0.28",
    metricALabel: "Drag coefficient",
    metricB: "42%",
    metricBLabel: "Downforce",
    metricC: "68 KG",
    metricCLabel: "Weight saved",
    metricD: "Carbon",
    metricDLabel: "Aero package",
    metricE: "Active",
    metricELabel: "Rear wing",
    metricF: "Alloy",
    metricFLabel: "Chassis",
  },
  "Paint Job": {
    metricA: "24",
    metricALabel: "Color finishes",
    metricB: "4",
    metricBLabel: "Coat layers",
    metricC: "9H",
    metricCLabel: "Surface hardness",
    metricD: "Gloss",
    metricDLabel: "Selected finish",
    metricE: "Metallic",
    metricELabel: "Paint type",
    metricF: "Self-heal",
    metricFLabel: "Protection",
  },
  Accessories: {
    metricA: "18",
    metricALabel: "Cabin upgrades",
    metricB: "12",
    metricBLabel: "Exterior options",
    metricC: "960 W",
    metricCLabel: "Audio output",
    metricD: "Smart",
    metricDLabel: "Connected suite",
    metricE: "Alcantara",
    metricELabel: "Upholstery",
    metricF: "Level 2+",
    metricFLabel: "ADAS package",
  },
};

export function VehicleStage() {
  const [selected, setSelected] =
    useState<(typeof options)[number]>("Customize");
  const [playing, setPlaying] = useState(false);
  const data = details[selected];

  return (
    <motion.section
      className="vehicle-stage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28 }}
    >
      <div className="option-grid">
        {options.map((option, index) => {
          const fromCenter = [
            { x: 151, y: 75 },
            { x: -151, y: 75 },
            { x: 151, y: -75 },
            { x: -151, y: -75 },
          ][index];

          return (
          <motion.button
            type="button"
            key={option}
            className={cn("stage-option", selected === option && "selected")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            initial={{ ...fromCenter, opacity: 0, scale: 0.7 }}
            animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 17,
              delay: 0.22,
            }}
            onClick={() => setSelected(option)}
          >
            {option}
          </motion.button>
          );
        })}
      </div>
      
      {/* Center Car Portrait Circle */}
      <div className="center-car-portal">
        <div className="car-glow-ring" />
        <img src="/car.png" alt="Black sports car" className="portal-car-img" />
      </div>

      <div className="vehicle-stage-content">
        {/* Left Metrics */}
        <motion.div 
          className="metrics-col left-col"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <MetricItem value={data.metricA} label={data.metricALabel} />
          <MetricItem value={data.metricB} label={data.metricBLabel} />
          <MetricItem value={data.metricC} label={data.metricCLabel} />
        </motion.div>

        {/* Right Metrics */}
        <motion.div 
          className="metrics-col right-col"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <MetricItem value={data.metricD} label={data.metricDLabel} />
          <MetricItem value={data.metricE} label={data.metricELabel} />
          <MetricItem value={data.metricF} label={data.metricFLabel} />
        </motion.div>
      </div>

      <button
        type="button"
        className="play-button-center"
        aria-label={playing ? "Pause vehicle preview" : "Play vehicle preview"}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <Pause size={19} fill="currentColor" /> : <Play size={19} fill="currentColor" />}
      </button>
    </motion.section>
  );
}

function MetricItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="metric-item-box"
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <strong>{value}</strong>
      <span>{label}</span>
    </motion.div>
  );
}
