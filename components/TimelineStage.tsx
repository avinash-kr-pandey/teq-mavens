import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const WAYPOINTS = [
  { label: "Registration", sub: "Fill form for submission", x: "0%" },
  { label: "Consultation", sub: "Planning and pricing", x: "33%" },
  { label: "Artist assign", sub: "according to task", x: "66%" },
  { label: "Vehicle Pickup", sub: "Payment & dropoff", x: "100%" },
];

export function TimelineStage({ onGoHome }: { onGoHome?: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= 9) return;

    let delay = 2600;
    if (step === 3) delay = 2200;
    else if (step === 4) delay = 700; // Road clears
    else if (step === 5) delay = 2700; // Van arrives
    else if (step === 6) delay = 900; // Van makes a U-turn
    else if (step === 7) delay = 2100; // Website badge travels in and loads
    else if (step === 8) delay = 2800; // Van returns

    const timer = setTimeout(() => {
      setStep((s) => s + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [step]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  return (
    <>
      {isClient &&
        createPortal(
          <AnimatePresence>
            {step >= 9 && (
              <motion.div
                className="timeline-thank-you"
                initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                transition={{ duration: 0.8 }}
              >
                <h2>THANK YOU</h2>
                <button onClick={onGoHome} className="timeline-home-btn">
                  Home
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      <section className="timeline-stage">
        <div className="timeline-track">
          <div className="timeline-line-bg" style={{ opacity: step >= 4 ? 0 : 1, transition: "opacity 0.5s ease" }} />

          <motion.div
            className="timeline-line-fg"
            initial={{ width: "0%" }}
            animate={{ 
              width: WAYPOINTS[Math.min(step, 3)].x,
              opacity: step >= 4 ? 0 : 1
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />

          {WAYPOINTS.map((waypoint, index) => {
            const reached = step >= index;
            const current = step === index;

            return (
              <span
                key={waypoint.label}
                className={`timeline-stop${reached ? " reached" : ""}${current ? " current" : ""}`}
                style={{ left: waypoint.x, opacity: step >= 4 ? 0 : 1, transition: "opacity 0.5s ease" }}
                aria-hidden="true"
              >
                <i />
              </span>
            );
          })}

          <motion.div
            className="timeline-car-marker"
            initial={{ left: "0%", opacity: 0 }}
            animate={{
              left:
                step >= 4
                  ? "calc(100% + 50px)"
                  : WAYPOINTS[Math.min(step, 3)].x,
              opacity: step >= 4 ? 0 : 1,
            }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <img src="/car_avatar.png" alt="car" />
          </motion.div>

          <motion.div
            className="timeline-tooltip-card"
            initial={{ opacity: 1, left: WAYPOINTS[0].x, x: "-50%" }}
            animate={{
              left: WAYPOINTS[Math.min(step, 3)].x,
              x: "-50%",
              opacity: step >= 4 ? 0 : 1,
              y: step >= 4 ? -8 : 0,
            }}
            transition={{
              left: { type: "spring", stiffness: 58, damping: 19 },
              opacity: { duration: 0.28 },
              y: { duration: 0.28 },
            }}
          >
            <motion.div
              key={Math.min(step, 3)}
              initial={{ opacity: 0.65, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28 }}
              className="timeline-tooltip-content"
            >
                <strong>{WAYPOINTS[Math.min(step, 3)].label}</strong>
                <small>{WAYPOINTS[Math.min(step, 3)].sub}</small>
            </motion.div>
          </motion.div>

          <motion.div
            className="timeline-truck"
            initial={{ x: "70vw", y: "-50%", scaleX: 1, scale: 1 }}
            animate={{
              x: step < 5 ? "70vw" : step < 8 ? "-50%" : "70vw",
              scaleX: step < 6 ? 1 : -1,
              scale: 1,
              y: "-50%",
            }}
            transition={{
              x: {
                duration: step === 5 ? 2.5 : step === 8 ? 2.6 : 0.35,
                ease: [0.45, 0, 0.22, 1],
              },
              scaleX: {
                duration: step === 6 ? 0.75 : 0.2,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            <img src="/delivery_truck_transparent.png" alt="Delivery Truck" />
            <AnimatePresence>
              {step >= 7 && step < 9 && (
                <motion.span
                  className="timeline-truck-logo"
                  initial={{ opacity: 0, x: 0, scale: 0.7, scaleX: -1 }}
                  animate={{
                    opacity: [0, 1, 1, 1, 0],
                    x: [0, -18, -58, -118, -142],
                    scale: [0.72, 1, 1, 0.88, 0.7],
                    scaleX: -1,
                  }}
                  exit={{ opacity: 0, x: -142, scale: 0.7, scaleX: -1 }}
                  transition={{
                    duration: 1.9,
                    times: [0, 0.14, 0.48, 0.82, 1],
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  NEXT<span>CAR</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
